"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { supabase } from '@/utils/supabaseClient';
import { getUserStats } from '@/utils/gameUtils';

const TABS = [
  { label: 'Overview', key: 'overview' },
  { label: 'Games', key: 'games' },
  { label: 'Stats', key: 'stats' },
  { label: 'Friends', key: 'friends' },
  { label: 'Awards', key: 'awards' },
];

type UserType = {
  id: string;
  email?: string;
  user_metadata?: {
    username?: string;
    name?: string;
    phone?: string;
    country_code?: string;
    avatar_url?: string;
    bio?: string;
  };
  created_at?: string;
};

type FriendType = {
  id: string;
  user_username: string;
  friend_username: string;
  status: string;
  created_at?: string;
  updated_at?: string;
};

type GameType = {
  id: string;
  player_white: string;
  player_black: string;
  result?: string;
  winner_id?: string;
  loser_id?: string;
  created_at?: string;
};

type UserStatsType = {
  rapid_rating: number;
  blitz_rating: number;
  bullet_rating: number;
  puzzle_rating: number;
  games_played: number;
  games_won: number;
  games_lost: number;
  games_drawn: number;
  puzzles_solved: number;
  puzzles_failed: number;
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<UserType | null>(null);
  const [userStats, setUserStats] = useState<UserStatsType | null>(null);
  const [games, setGames] = useState<GameType[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [friends, setFriends] = useState<FriendType[]>([]);
  const [friendsLoading, setFriendsLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [friendRequests, setFriendRequests] = useState<FriendType[]>([]);
  const [searchUsername, setSearchUsername] = useState('');
  const [searchResults, setSearchResults] = useState<UserType[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    username: '',
    phone: '',
    country_code: '+1',
    bio: ''
  });

  // Country code to name mapping
  const countryCodeToName: Record<string, string> = {
    '+1': 'United States/Canada',
    '+44': 'United Kingdom',
    '+91': 'India',
    '+86': 'China',
    '+81': 'Japan',
    '+49': 'Germany',
    '+33': 'France',
    '+39': 'Italy',
    '+34': 'Spain',
    '+7': 'Russia',
    '+61': 'Australia',
    '+55': 'Brazil',
    '+52': 'Mexico',
    '+27': 'South Africa',
    '+971': 'UAE',
    '+966': 'Saudi Arabia',
    '+82': 'South Korea',
    '+31': 'Netherlands',
    '+46': 'Sweden',
    '+47': 'Norway'
  };

  const getCountryName = (code: string) => {
    return countryCodeToName[code] || code;
  };
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/chess');
      else setUser(data.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) router.push('/chess');
      else setUser(session.user);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [router]);

  // Fetch user stats
  useEffect(() => {
    if (!user) return;
    setStatsLoading(true);
    getUserStats(user.id).then((stats) => {
      setUserStats(stats || { 
        rapid_rating: 400, 
        blitz_rating: 400, 
        bullet_rating: 400, 
        puzzle_rating: 400, 
        games_played: 0, 
        games_won: 0, 
        games_lost: 0 
      });
      setStatsLoading(false);
    });
  }, [user]);

  // Fetch games
  useEffect(() => {
    if (!user) return;
    setGamesLoading(true);
    supabase
      .from('games')
      .select('*')
      .or(`player_white.eq.${user.id},player_black.eq.${user.id}`)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setGames(data || []);
        setGamesLoading(false);
      });
  }, [user]);

  // Fetch friends
  useEffect(() => {
    if (!user) return;
    setFriendsLoading(true);
    // Get accepted friends
    supabase
      .from('friends')
      .select(`
        *,
        friend:friends!inner(user_id, friend_id)
      `)
      .eq('user_id', user.id)
      .eq('status', 'accepted')
      .then(({ data: friendsData }) => {
        // Also get friends where user is the friend_id
        supabase
          .from('friends')
          .select(`
            *,
            user:friends!inner(user_id, friend_id)
          `)
          .eq('friend_id', user.id)
          .eq('status', 'accepted')
          .then(({ data: reverseFriendsData }) => {
            const allFriends = [...(friendsData || []), ...(reverseFriendsData || [])];
            setFriends(allFriends);
            setFriendsLoading(false);
          });
      });

    // Get pending friend requests
    supabase
      .from('friends')
      .select('*')
      .eq('friend_id', user.id)
      .eq('status', 'pending')
      .then(({ data: requests }) => {
        setFriendRequests(requests || []);
      });
  }, [user]);

  // Search for users to add as friends
  const searchUsers = async (username: string) => {
    if (!username.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      const response = await fetch(`/api/search-users?q=${encodeURIComponent(username)}`);
      const data = await response.json();
      setSearchResults(data.users || []);
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchResults([]);
    }
  };

  // Add friend
  const addFriend = async (friendUsername: string) => {
    if (friendUsername === user?.user_metadata?.username) {
      alert("You can't add yourself as a friend!");
      return;
    }
    try {
      const { error } = await supabase
        .from('friends')
        .insert([{ user_username: user?.user_metadata?.username, friend_username: friendUsername, status: 'pending' }]);
      if (error) {
        console.error('Error adding friend:', error);
        alert('Failed to send friend request. Please try again.');
      } else {
        alert('Friend request sent successfully!');
        setSearchResults([]);
        setSearchUsername('');
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      alert('Failed to send friend request. Please try again.');
    }
  };

  // Accept friend request
  const acceptFriend = async (requestId: string) => {
    const { error } = await supabase
      .from('friends')
      .update({ status: 'accepted' })
      .eq('id', requestId);
    if (!error) {
      window.location.reload();
    }
  };

  // Remove friend
  const removeFriend = async (friendUsername: string) => {
    const { error } = await supabase
      .from('friends')
      .delete()
      .or(`and(user_username.eq.${user?.user_metadata?.username},friend_username.eq.${friendUsername}),and(user_username.eq.${friendUsername},friend_username.eq.${user?.user_metadata?.username})`);
    if (!error) {
      window.location.reload();
    }
  };

  // Load user profile data for editing
  const loadProfileData = () => {
    setEditForm({
      full_name: user?.user_metadata?.name || '',
      username: user?.user_metadata?.username || '',
      phone: user?.user_metadata?.phone || '',
      country_code: user?.user_metadata?.country_code || '+1',
      bio: user?.user_metadata?.bio || ''
    });
  };

  // Helper to check if username is available
  async function isUsernameAvailable(username: string, currentUsername: string) {
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) return false;
    return !data.users.some(
      user => user.user_metadata?.username?.toLowerCase() === username.toLowerCase() && user.user_metadata?.username !== currentUsername
    );
  }

  // Save profile changes
  const saveProfile = async () => {
    setIsEditing(true);
    // Check for unique username
    const available = await isUsernameAvailable(editForm.username, user?.user_metadata?.username || '');
    if (!available) {
      alert('Username is already taken. Please choose another.');
      setIsEditing(false);
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name: editForm.full_name,
          username: editForm.username,
          phone: editForm.phone,
          country_code: editForm.country_code,
          bio: editForm.bio
        }
      });
      if (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      } else {
        alert('Profile updated successfully!');
        setShowEditModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsEditing(false);
    }
  };

  if (!user || !user.user_metadata) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white w-full">
      {/* Header */}
      <div className="relative w-full h-64 bg-gradient-to-r from-blue-900 via-black to-blue-700 flex items-end px-16 py-8">
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 flex items-end space-x-8 w-full">
          <img
            src={user.user_metadata?.avatar_url || "/logo1.png"}
            alt="Avatar"
            className="w-32 h-32 rounded-lg border-4 border-sky-400 object-cover shadow-lg bg-gray-800"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h1 className="text-4xl font-bold">{user.user_metadata?.name || user.user_metadata?.username || user.email}</h1>
              <span className="inline-block bg-sky-600 text-white text-xs px-2 py-1 rounded">IN</span>
              <button 
                onClick={() => {
                  loadProfileData();
                  setShowEditModal(true);
                }}
                className="ml-2 text-sky-400 hover:underline text-sm"
              >
                Edit Profile
              </button>
            </div>
            <div className="text-gray-300 mt-1 text-lg">
              <span className="text-sky-300 font-semibold">@{user.user_metadata?.username || user.email?.split('@')[0]}</span>
            </div>
            <div className="text-gray-300 mt-1 text-lg">
              {user.user_metadata?.name || "Real Name"} • 
              {getCountryName(user.user_metadata?.country_code || "+1")} • 
              Joined {user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}
            </div>
            <div className="text-gray-300 mt-1 text-sm">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(user.id);
                  alert('User ID copied to clipboard!');
                }}
                className="text-sky-400 hover:underline"
              >
                User ID: {user.id.substring(0, 8)}...
              </button>
            </div>
            <div className="mt-2 flex space-x-8 text-lg">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-sky-300">Friends</span>
                <span className="font-bold">{friends.length}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold text-sky-300">Games</span>
                <span className="font-bold">{userStats?.games_played ?? 0}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold text-sky-300">Win Rate</span>
                <span className="font-bold">{userStats && userStats.games_played > 0 ? Math.round(((userStats.games_won ?? 0) / (userStats.games_played ?? 1)) * 100) : 0}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="w-full flex justify-center bg-gray-900 border-b border-gray-800">
        <nav className="flex space-x-12 py-4 text-xl">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`font-semibold px-6 py-2 rounded-t transition-colors duration-200 ${activeTab === tab.key ? 'bg-sky-600 text-white' : 'text-gray-400 hover:text-sky-400'}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="w-full max-w-[1600px] mx-auto py-10">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-9 flex space-x-8">
              <div className="flex-1 bg-white/10 rounded-lg p-8 flex flex-col items-center shadow">
                <span className="text-2xl font-bold text-sky-300">Rapid</span>
                <span className="text-4xl font-bold text-white">{userStats?.rapid_rating ?? 400}</span>
                <span className="text-green-400 mt-1 text-lg">+{(userStats?.games_won ?? 0) * 10}</span>
              </div>
              <div className="flex-1 bg-white/10 rounded-lg p-8 flex flex-col items-center shadow">
                <span className="text-2xl font-bold text-yellow-300">Blitz</span>
                <span className="text-4xl font-bold text-white">{userStats?.blitz_rating ?? 400}</span>
                <span className="text-green-400 mt-1 text-lg">+0</span>
              </div>
              <div className="flex-1 bg-white/10 rounded-lg p-8 flex flex-col items-center shadow">
                <span className="text-2xl font-bold text-red-400">Bullet</span>
                <span className="text-4xl font-bold text-white">{userStats?.bullet_rating ?? 400}</span>
                <span className="text-green-400 mt-1 text-lg">+0</span>
              </div>
              <div className="flex-1 bg-white/10 rounded-lg p-8 flex flex-col items-center shadow">
                <span className="text-2xl font-bold text-orange-400">Puzzles</span>
                <span className="text-4xl font-bold text-white">{userStats?.puzzle_rating ?? 400}</span>
                <span className="text-green-400 mt-1 text-lg">+{(userStats?.puzzles_solved ?? 0) * 10}</span>
              </div>
            </div>
            <div className="col-span-3 flex flex-col space-y-8">
              <div className="bg-white/10 rounded-lg p-8 shadow flex flex-col items-center">
                <span className="text-xl font-bold text-sky-300">Games Played</span>
                <span className="text-3xl font-bold text-white">{userStats?.games_played ?? 0}</span>
                <span className="text-gray-400">Wins: {userStats?.games_won ?? 0}</span>
                <span className="text-gray-400">Losses: {userStats?.games_lost ?? 0}</span>
              </div>
              <div className="bg-white/10 rounded-lg p-8 shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-bold text-sky-300">Friends</span>
                  <button className="text-sky-400 hover:underline text-sm">See All</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {friendsLoading ? (
                    <span className="text-gray-400">Loading...</span>
                  ) : friends.length === 0 ? (
                    <span className="text-gray-400">No friends yet.</span>
                  ) : friends.slice(0, 8).map((friend, i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-gray-700 border-2 border-sky-400 flex items-center justify-center text-white text-lg font-bold">F</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'games' && (
          <div className="bg-white/10 rounded-lg shadow p-8">
            <h2 className="text-3xl font-bold mb-6 text-sky-300">Game History</h2>
            {gamesLoading ? (
              <div className="text-gray-400">Loading games...</div>
            ) : games.length === 0 ? (
              <div className="text-gray-400">No games found.</div>
            ) : (
              <table className="w-full text-left text-lg">
                <thead>
                  <tr className="text-gray-300 border-b border-gray-700">
                    <th className="py-2">Players</th>
                    <th className="py-2">User IDs</th>
                    <th className="py-2">Result</th>
                    <th className="py-2">Rating Change</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Review</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game, idx) => (
                    <tr key={game.id || idx} className="border-b border-gray-800 hover:bg-gray-800/40">
                      <td className="py-2">
                        <div className="flex flex-col">
                          <span className="text-white">{game.player_white || 'Unknown'} vs {game.player_black || 'Unknown'}</span>
                          <span className="text-gray-400 text-sm">@{game.player_white?.substring(0, 8) || 'unknown'} vs @{game.player_black?.substring(0, 8) || 'unknown'}</span>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex flex-col text-xs">
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(game.player_white || '');
                              alert('White player ID copied!');
                            }}
                            className="text-sky-400 hover:underline"
                          >
                            {game.player_white?.substring(0, 8) || 'Unknown'}...
                          </button>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(game.player_black || '');
                              alert('Black player ID copied!');
                            }}
                            className="text-sky-400 hover:underline"
                          >
                            {game.player_black?.substring(0, 8) || 'Unknown'}...
                          </button>
                        </div>
                      </td>
                      <td className="py-2 text-green-400 font-bold">{game.result || '-'}</td>
                      <td className="py-2">{game.winner_id === user.id ? '+10' : game.loser_id === user.id ? '-9' : '-'}</td>
                      <td className="py-2">{game.created_at ? new Date(game.created_at).toLocaleDateString() : '-'}</td>
                      <td className="py-2">
                        <button className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700">Analyze</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {activeTab === 'stats' && (
          <div className="bg-white/10 rounded-lg shadow p-8 text-sky-300">
            <h2 className="text-3xl font-bold mb-6">Detailed Stats</h2>
            {statsLoading ? (
              <div className="text-gray-400">Loading stats...</div>
            ) : (
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Game Statistics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Games Played:</span>
                      <span className="text-white">{userStats?.games_played ?? 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wins:</span>
                      <span className="text-green-400">{userStats?.games_won ?? 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Losses:</span>
                      <span className="text-red-400">{userStats?.games_lost ?? 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Win Rate:</span>
                      <span className="text-white">{userStats && userStats.games_played > 0 ? Math.round(((userStats.games_won ?? 0) / (userStats.games_played ?? 1)) * 100) : 0}%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Puzzle Statistics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Puzzles Solved:</span>
                      <span className="text-green-400">{userStats?.puzzles_solved ?? 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Puzzles Failed:</span>
                      <span className="text-red-400">{userStats?.puzzles_failed ?? 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span className="text-white">
                        {userStats && (userStats.puzzles_solved ?? 0) + (userStats.puzzles_failed ?? 0) > 0 
                          ? Math.round(((userStats.puzzles_solved ?? 0) / ((userStats.puzzles_solved ?? 0) + (userStats.puzzles_failed ?? 0))) * 100) 
                          : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'friends' && (
          <div className="bg-white/10 rounded-lg shadow p-8">
            <h2 className="text-3xl font-bold mb-6 text-sky-300">Friends</h2>
            
            {/* Friend Requests */}
            {friendRequests.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-sky-300">Friend Requests</h3>
                <div className="space-y-2">
                  {friendRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between bg-gray-800 p-4 rounded">
                      <span className="text-white">{request.user_username}</span>
                      <button 
                        onClick={() => acceptFriend(request.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Accept
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Friends */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-sky-300">Add Friends</h3>
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Search by username..."
                  value={searchUsername}
                  onChange={(e) => {
                    setSearchUsername(e.target.value);
                    searchUsers(e.target.value);
                  }}
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded border border-gray-700"
                />
                {searchUsername.trim().length >= 2 && (
                  <button 
                    onClick={() => addFriend(searchUsername.trim())}
                    className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 font-semibold"
                  >
                    Add Friend
                  </button>
                )}
              </div>
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  {searchResults.map((result) => (
                    <div key={result.id} className="flex items-center justify-between bg-gray-800 p-4 rounded">
                      <div className="flex flex-col">
                        <span className="text-white font-semibold">{result.user_metadata?.name || result.user_metadata?.username || 'Unknown User'}</span>
                        <span className="text-gray-400 text-sm">
                          @{result.user_metadata?.username} • {getCountryName(result.user_metadata?.country_code || '+1')} • {result.user_metadata?.phone || 'No phone'}
                        </span>
                      </div>
                      <button 
                        onClick={() => addFriend(result.user_metadata?.username || '')}
                        className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
                      >
                        Add Friend
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {searchUsername.trim().length >= 2 && searchResults.length === 0 && (
                <div className="text-gray-400 text-center py-4">
                  No users found with username "{searchUsername}". Try a different search.
                </div>
              )}
            </div>

            {/* Friends List */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-sky-300">Your Friends</h3>
              {friendsLoading ? (
                <div className="text-gray-400">Loading friends...</div>
              ) : friends.length === 0 ? (
                <div className="text-gray-400">No friends yet. Search for users to add them!</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {friends.map((friend, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-800 p-4 rounded">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-700 border-2 border-sky-400 flex items-center justify-center text-white text-lg font-bold">
                          {(friend.friend_username || friend.user_username || 'F').charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white font-semibold">
                            {friend.friend_username === user?.user_metadata?.username ? friend.user_username : friend.friend_username}
                          </span>
                          <span className="text-gray-400 text-sm">
                            @{friend.friend_username === user?.user_metadata?.username ? friend.user_username : friend.friend_username} • Online
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700 text-sm">
                          Play
                        </button>
                        <button 
                          onClick={() => removeFriend(friend.friend_username === user?.user_metadata?.username ? friend.user_username : friend.friend_username)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === 'awards' && (
          <div className="bg-white/10 rounded-lg shadow p-8">
            <h2 className="text-3xl font-bold mb-6 text-sky-300">Awards</h2>
            <div className="flex gap-10">
              {[1,2,3].map((award) => (
                <div key={award} className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-2">🏅</div>
                  <span className="text-lg text-gray-200">Award {award}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({...editForm, full_name: e.target.value})}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-sky-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-sky-500 focus:outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Country Code</label>
                                     <select
                     value={editForm.country_code}
                     onChange={(e) => setEditForm({...editForm, country_code: e.target.value})}
                     className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-sky-500 focus:outline-none"
                   >
                     <option value="+1">+1 (United States/Canada)</option>
                     <option value="+44">+44 (United Kingdom)</option>
                     <option value="+91">+91 (India)</option>
                     <option value="+86">+86 (China)</option>
                     <option value="+81">+81 (Japan)</option>
                     <option value="+49">+49 (Germany)</option>
                     <option value="+33">+33 (France)</option>
                     <option value="+39">+39 (Italy)</option>
                     <option value="+34">+34 (Spain)</option>
                     <option value="+7">+7 (Russia)</option>
                     <option value="+61">+61 (Australia)</option>
                     <option value="+55">+55 (Brazil)</option>
                     <option value="+52">+52 (Mexico)</option>
                     <option value="+27">+27 (South Africa)</option>
                     <option value="+971">+971 (UAE)</option>
                     <option value="+966">+966 (Saudi Arabia)</option>
                     <option value="+82">+82 (South Korea)</option>
                     <option value="+31">+31 (Netherlands)</option>
                     <option value="+46">+46 (Sweden)</option>
                     <option value="+47">+47 (Norway)</option>
                   </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  rows={3}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-sky-500 focus:outline-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={saveProfile}
                disabled={isEditing}
                className="flex-1 bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 disabled:opacity-50"
              >
                {isEditing ? 'Saving...' : 'Save Profile'}
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage; 