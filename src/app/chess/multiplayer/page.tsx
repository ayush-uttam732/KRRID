"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import ChessboardUI from "@/components/ChessboardUI";
import { FaUser, FaCog, FaPlay, FaUserFriends, FaHistory, FaPlus, FaGoogle } from "react-icons/fa";

interface User {
  id: string;
  email?: string;
}

export default function ChessMultiplayerPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [friendStep, setFriendStep] = useState<'menu' | 'create' | 'join' | 'created' | 'joining'>('menu');
  const [gameCode, setGameCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [user, setUser] = useState<User | null>(null);

  // Placeholder for chessboard state
  const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [orientation] = useState<'white' | 'black'>('white');

  // Timer logic
  const DEFAULT_TIME = 10 * 60; // 10 minutes in seconds
  const [whiteTime, setWhiteTime] = useState(DEFAULT_TIME);
  const [blackTime, setBlackTime] = useState(DEFAULT_TIME);
  const [activeColor, setActiveColor] = useState<'white' | 'black'>('white');
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Modal state for login/signup
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  // Signup fields
  const [signupName, setSignupName] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupCountry, setSignupCountry] = useState("+91");
  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  // Start/pause timer logic
  useEffect(() => {
    if (!gameStarted || gameOver) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      if (activeColor === 'white') {
        setWhiteTime(t => (t > 0 ? t - 1 : 0));
      } else {
        setBlackTime(t => (t > 0 ? t - 1 : 0));
      }
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStarted, activeColor, gameOver]);

  // Pause game if timer runs out
  useEffect(() => {
    if (whiteTime === 0 || blackTime === 0) {
      setGameOver(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [whiteTime, blackTime]);

  function handlePlayFriend() {
    if (!user) setShowLogin(true);
    else {
      setShowFriendModal(true);
      setFriendStep('menu');
    }
  }

  async function handleCreateGame() {
    // Generate a random code (simulate game creation)
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGameCode(code);
    setFriendStep('created');
    // In real app: create game in DB and wait for friend to join
  }

  function handleJoinGame() {
    if (inputCode.trim().length < 4) return;
    setFriendStep('joining');
    // In real app: validate code, join game, then redirect
    setTimeout(() => {
      router.push(`/chess/multiplayer/${inputCode.trim()}`);
    }, 1000);
  }

  function handleCopyCode() {
    navigator.clipboard.writeText(gameCode);
  }

  // Reset timers on new game
  function handleNewGame() {
    setFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    setWhiteTime(DEFAULT_TIME);
    setBlackTime(DEFAULT_TIME);
    setActiveColor('white');
    setGameStarted(false);
    setGameOver(false);
  }

  // Format timer display
  function formatTime(secs: number) {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // On move, switch active color
  function handleMove(fenAfter: string) {
    setFen(fenAfter);
    setActiveColor(c => (c === 'white' ? 'black' : 'white'));
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    setAuthLoading(false);
    if (error) setAuthError(error.message);
    else {
      setUser(data.user);
      setShowLogin(false);
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    if (!signupName || !signupUsername || !signupEmail || !signupPassword || !signupConfirm || !signupPhone || !signupCountry) {
      setAuthError("All fields are required");
      setAuthLoading(false);
      return;
    }
    if (signupPassword !== signupConfirm) {
      setAuthError("Passwords do not match");
      setAuthLoading(false);
      return;
    }
    const { error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        data: {
          name: signupName,
          username: signupUsername,
          phone: signupCountry + signupPhone,
        },
      },
    });
    setAuthLoading(false);
    if (error) setAuthError(error.message);
    else {
      setShowLogin(false);
      setAuthMode('login');
    }
  }

  async function handleGoogleAuth() {
    setAuthLoading(true);
    setAuthError(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    setAuthLoading(false);
    if (error) setAuthError(error.message);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-[#181a1b] flex-row-reverse">
      {/* Sidebar on the right */}
      <aside className="w-72 flex flex-col gap-4 py-10 px-8 bg-gradient-to-b from-black via-[#181a1b] to-[#23272b] border-l border-[#222] shadow-xl rounded-tl-3xl rounded-bl-3xl items-center">
        <div className="text-2xl font-extrabold text-sky-400 mb-10 tracking-tight">Play Online</div>
        <button
          className="flex items-center gap-3 px-5 py-3 rounded-xl bg-sky-500 text-white font-semibold text-lg shadow hover:bg-sky-600 transition-all mb-2 w-full justify-center"
          onClick={() => { setGameStarted(true); setGameOver(false); }}
          disabled={gameStarted}
        >
          <FaPlay /> Start Game
        </button>
        <button
          className="flex items-center gap-3 px-5 py-3 rounded-xl bg-sky-700 text-white font-semibold text-lg shadow hover:bg-sky-800 transition-all mb-2 w-full justify-center"
          onClick={handlePlayFriend}
        >
          <FaUserFriends /> Play with Friend
        </button>
        <button className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-800 text-sky-200 font-semibold text-lg shadow hover:bg-gray-900 transition-all mb-2 w-full justify-center"
          onClick={handleNewGame}
        >
          <FaPlus /> New Game
        </button>
        <button className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-800 text-sky-200 font-semibold text-lg shadow hover:bg-gray-900 transition-all w-full justify-center">
          <FaHistory /> Games
        </button>
      </aside>
      {/* Main area with chessboard on the left, settings button outside */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 relative">
        {/* Settings button outside the board, top right of main area */}
        <button
          className="fixed top-10 right-10 z-30 p-3 rounded-full bg-[#23272b] text-sky-300 shadow hover:bg-sky-900 hover:text-white focus:outline-none border border-sky-700"
          aria-label="Open settings"
          // onClick={openSettingsModal} // To be implemented
        >
          <FaCog size={26} />
        </button>
        <div className="flex flex-col items-center bg-[#23272b] rounded-2xl shadow-2xl p-6 border-4 border-[#4a6fa5] min-w-[480px] mx-auto" style={{ marginLeft: '-80px' }}>
          {/* Opponent info */}
          <div className="flex items-center justify-between w-full mb-2">
            <div className="flex items-center gap-2 text-white text-lg font-bold">
              <FaUser className="text-gray-400" size={28} /> Opponent
            </div>
            <div className={`flex items-center gap-2 text-2xl font-bold px-4 py-1 rounded-xl min-w-[90px] justify-center ${activeColor === 'black' && gameStarted && !gameOver ? 'bg-sky-700 text-white' : 'bg-black/40 text-gray-300'}`}>
              {formatTime(blackTime)}
            </div>
          </div>
          {/* Chessboard (inactive until game starts) */}
          <div className={`pointer-events-${gameStarted && !gameOver ? 'auto' : 'none'} opacity-${gameStarted && !gameOver ? '100' : '60'} transition-all duration-300`}>
            <ChessboardUI
              fen={fen}
              makeMove={gameStarted && !gameOver ? handleMove : undefined}
              boardOrientation={orientation}
              boardWidth={420}
            />
          </div>
          {/* Player info */}
          <div className="flex items-center justify-between w-full mt-2">
            <div className="flex items-center gap-2 text-white text-lg font-bold">
              <FaUser className="text-gray-400" size={28} /> You
            </div>
            <div className={`flex items-center gap-2 text-2xl font-bold px-4 py-1 rounded-xl min-w-[90px] justify-center ${activeColor === 'white' && gameStarted && !gameOver ? 'bg-sky-700 text-white' : 'bg-black/40 text-gray-300'}`}>
              {formatTime(whiteTime)}
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative border-4 border-blue-200">
            <button
              className="absolute top-2 right-2 text-blue-400 hover:text-blue-700 focus:outline-none text-3xl"
              onClick={() => setShowLogin(false)}
              aria-label="Close login dialog"
            >
              &times;
            </button>
            <div className="flex mb-6">
              <button
                className={`flex-1 py-2 font-bold rounded-l-lg ${authMode === 'login' ? 'bg-sky-500 text-white' : 'bg-gray-200 text-blue-700'}`}
                onClick={() => setAuthMode('login')}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 font-bold rounded-r-lg ${authMode === 'signup' ? 'bg-sky-500 text-white' : 'bg-gray-200 text-blue-700'}`}
                onClick={() => setAuthMode('signup')}
              >
                Sign Up
              </button>
            </div>
            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  type="email"
                  className="border border-blue-300 rounded-lg px-4 py-2"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="border border-blue-300 rounded-lg px-4 py-2"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-sky-500 text-white font-bold shadow hover:bg-sky-600 mt-2"
                  disabled={authLoading}
                >
                  {authLoading ? "Logging in..." : "Login"}
                </button>
                <button
                  type="button"
                  className="w-full py-3 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600 flex items-center justify-center gap-2"
                  onClick={handleGoogleAuth}
                  disabled={authLoading}
                >
                  <FaGoogle /> Continue with Google
                </button>
                {authError && <div className="text-red-600 text-center font-semibold mt-2">{authError}</div>}
              </form>
            ) : (
              <form onSubmit={handleSignup} className="flex flex-col gap-3">
                <input
                  type="text"
                  className="border border-blue-300 rounded-lg px-4 py-2"
                  placeholder="Full Name"
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="border border-blue-300 rounded-lg px-4 py-2"
                  placeholder="Username"
                  value={signupUsername}
                  onChange={e => setSignupUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="border border-blue-300 rounded-lg px-4 py-2"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  required
                />
                <div className="flex gap-2">
                  <select
                    className="border border-blue-300 rounded-lg px-2 py-2 w-24"
                    value={signupCountry}
                    onChange={e => setSignupCountry(e.target.value)}
                  >
                    <option value="+91">+91 (IN)</option>
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+61">+61 (AUS)</option>
                    <option value="+81">+81 (JP)</option>
                    {/* Add more as needed */}
                  </select>
                  <input
                    type="tel"
                    className="border border-blue-300 rounded-lg px-4 py-2 flex-1"
                    placeholder="Phone Number"
                    value={signupPhone}
                    onChange={e => setSignupPhone(e.target.value)}
                    required
                  />
                </div>
                <input
                  type="password"
                  className="border border-blue-300 rounded-lg px-4 py-2"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="border border-blue-300 rounded-lg px-4 py-2"
                  placeholder="Confirm Password"
                  value={signupConfirm}
                  onChange={e => setSignupConfirm(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-sky-500 text-white font-bold shadow hover:bg-sky-600 mt-2"
                  disabled={authLoading}
                >
                  {authLoading ? "Signing up..." : "Sign Up"}
                </button>
            <button
                  type="button"
                  className="w-full py-3 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600 flex items-center justify-center gap-2"
                  onClick={handleGoogleAuth}
                  disabled={authLoading}
            >
                  <FaGoogle /> Continue with Google
            </button>
                {authError && <div className="text-red-600 text-center font-semibold mt-2">{authError}</div>}
              </form>
            )}
          </div>
        </div>
      )}
      {showFriendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative border-4 border-blue-200">
            <button
              className="absolute top-2 right-2 text-blue-400 hover:text-blue-700 focus:outline-none text-3xl"
              onClick={() => setShowFriendModal(false)}
              aria-label="Close friend dialog"
            >
              &times;
            </button>
            {friendStep === 'menu' && (
              <>
                <h1 className="text-2xl font-bold mb-4 text-blue-800">Play a Friend</h1>
                <button
                  className="w-full py-3 rounded-lg bg-sky-500 text-white font-bold shadow hover:bg-sky-600 mb-4"
                  onClick={handleCreateGame}
                >
                  Create Game (Get Link/Code)
                </button>
                <button
                  className="w-full py-3 rounded-lg bg-gray-200 text-blue-700 font-bold shadow hover:bg-blue-100"
                  onClick={() => setFriendStep('join')}
                >
                  Join Game (Enter Link/Code)
                </button>
              </>
            )}
            {friendStep === 'create' && (
              <div>Creating game...</div>
            )}
            {friendStep === 'created' && (
              <>
                <h2 className="text-xl font-bold mb-2 text-blue-700">Share this code with your friend:</h2>
                <div className="bg-blue-100 text-blue-800 font-mono text-2xl rounded-lg px-6 py-3 mb-4 select-all text-center">{gameCode}</div>
                <button
                  className="w-full py-2 rounded-lg bg-blue-500 text-white font-bold shadow hover:bg-blue-600 mb-2"
                  onClick={handleCopyCode}
                >
                  Copy Code
                </button>
                <button
                  className="w-full py-2 rounded-lg bg-gray-200 text-blue-700 font-bold shadow hover:bg-blue-100"
                  onClick={() => router.push(`/chess/multiplayer/${gameCode}`)}
                >
                  Go to Game Room
                </button>
              </>
            )}
            {friendStep === 'join' && (
              <>
                <h2 className="text-xl font-bold mb-2 text-blue-700">Enter your friend&apos;s code:</h2>
                <input
                  className="w-full rounded-lg border border-blue-300 px-4 py-2 mb-4 text-lg"
                  value={inputCode}
                  onChange={e => setInputCode(e.target.value.toUpperCase())}
                  placeholder="Game Code"
                />
                <button
                  className="w-full py-2 rounded-lg bg-blue-500 text-white font-bold shadow hover:bg-blue-600 mb-2"
                  onClick={handleJoinGame}
                >
                  Join Game
                </button>
              </>
            )}
            {friendStep === 'joining' && (
              <div>Joining game...</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 