"use client";

import React, { useState } from 'react';

const TABS = [
  { label: 'Overview', key: 'overview' },
  { label: 'Games', key: 'games' },
  { label: 'Stats', key: 'stats' },
  { label: 'Friends', key: 'friends' },
  { label: 'Awards', key: 'awards' },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white">
      {/* Header */}
      <div className="relative w-full h-64 bg-gradient-to-r from-blue-900 via-black to-blue-700 flex items-end p-8">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/60 z-0" />
        {/* Avatar */}
        <div className="relative z-10 flex items-end space-x-6">
          <img
            src="/public/logo1.png"
            alt="Avatar"
            className="w-32 h-32 rounded-lg border-4 border-sky-400 object-cover shadow-lg bg-gray-800"
          />
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold">Username</h1>
              <span className="inline-block bg-sky-600 text-white text-xs px-2 py-1 rounded">IN</span>
              <button className="ml-2 text-sky-400 hover:underline text-sm">Edit Profile</button>
            </div>
            <div className="text-gray-300 mt-1">Real Name • Kanpur • Joined Nov 12, 2019</div>
            <div className="mt-2 flex space-x-4">
              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold text-sky-300">Friends</span>
                <span className="font-bold">27</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold text-sky-300">Views</span>
                <span className="font-bold">170</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold text-sky-300">Online</span>
                <span className="font-bold">Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full flex justify-center bg-gray-900 border-b border-gray-800">
        <nav className="flex space-x-8 py-4">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`text-lg font-semibold px-4 py-2 rounded-t transition-colors duration-200 ${activeTab === tab.key ? 'bg-sky-600 text-white' : 'text-gray-400 hover:text-sky-400'}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-12 gap-8">
            {/* Stats Cards */}
            <div className="col-span-8 flex space-x-6">
              <div className="flex-1 bg-white/10 rounded-lg p-6 flex flex-col items-center shadow">
                <span className="text-xl font-bold text-sky-300">Rapid</span>
                <span className="text-3xl font-bold text-white">1508</span>
                <span className="text-green-400 mt-1">+22</span>
              </div>
              <div className="flex-1 bg-white/10 rounded-lg p-6 flex flex-col items-center shadow">
                <span className="text-xl font-bold text-yellow-300">Bullet</span>
                <span className="text-3xl font-bold text-white">1207</span>
                <span className="text-green-400 mt-1">+20</span>
              </div>
              <div className="flex-1 bg-white/10 rounded-lg p-6 flex flex-col items-center shadow">
                <span className="text-xl font-bold text-yellow-400">Blitz</span>
                <span className="text-3xl font-bold text-white">1023</span>
                <span className="text-green-400 mt-1">+69</span>
              </div>
              <div className="flex-1 bg-white/10 rounded-lg p-6 flex flex-col items-center shadow">
                <span className="text-xl font-bold text-orange-400">Puzzles</span>
                <span className="text-3xl font-bold text-white">2653</span>
                <span className="text-green-400 mt-1">+226</span>
              </div>
            </div>
            {/* League & Friends */}
            <div className="col-span-4 flex flex-col space-y-6">
              <div className="bg-white/10 rounded-lg p-6 shadow flex flex-col items-center">
                <span className="text-lg font-bold text-sky-300">Legend League</span>
                <span className="text-2xl font-bold text-white">#17</span>
                <span className="text-gray-400">Trophies: 39</span>
                <button className="mt-2 text-sky-400 hover:underline text-sm">See Your Division</button>
              </div>
              <div className="bg-white/10 rounded-lg p-6 shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-sky-300">Friends</span>
                  <button className="text-sky-400 hover:underline text-sm">See All</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-700 border-2 border-sky-400 flex items-center justify-center text-white text-lg font-bold">F</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Games Tab */}
        {activeTab === 'games' && (
          <div className="bg-white/10 rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-sky-300">Game History</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-300 border-b border-gray-700">
                  <th className="py-2">Players</th>
                  <th className="py-2">Result</th>
                  <th className="py-2">Accuracy</th>
                  <th className="py-2">Moves</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Review</th>
                </tr>
              </thead>
              <tbody>
                {[1,2,3,4,5].map((game) => (
                  <tr key={game} className="border-b border-gray-800 hover:bg-gray-800/40">
                    <td className="py-2">omgclash (680) vs you (744)</td>
                    <td className="py-2 text-green-400 font-bold">Win</td>
                    <td className="py-2">82.4</td>
                    <td className="py-2">51</td>
                    <td className="py-2">Jul 3, 2025</td>
                    <td className="py-2">
                      <button className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700">Analyze</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="bg-white/10 rounded-lg shadow p-6 text-sky-300">
            <h2 className="text-2xl font-bold mb-4">Stats (Coming Soon)</h2>
            <p>Detailed stats and rating graphs will be shown here.</p>
          </div>
        )}

        {/* Friends Tab */}
        {activeTab === 'friends' && (
          <div className="bg-white/10 rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-sky-300">Friends</h2>
            <div className="flex flex-wrap gap-4">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-20 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-700 border-2 border-sky-400 flex items-center justify-center text-white text-lg font-bold mb-1">F</div>
                  <span className="text-xs text-gray-200">Friend {i+1}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards Tab */}
        {activeTab === 'awards' && (
          <div className="bg-white/10 rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-sky-300">Awards</h2>
            <div className="flex gap-6">
              {[1,2,3].map((award) => (
                <div key={award} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-2">🏅</div>
                  <span className="text-gray-200">Award {award}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 