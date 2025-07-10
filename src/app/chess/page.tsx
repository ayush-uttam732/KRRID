"use client";
import { useState, useEffect, useRef } from "react";
import ChessboardUI from "@/components/ChessboardUI";
import { useChessGame } from "@/hooks/useChessGame";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from '@/utils/supabaseClient';
import { FaGoogle } from "react-icons/fa";

// For country codes
const countryCodes = [
  { code: "+1", name: "United States" },
  { code: "+91", name: "India" },
  { code: "+44", name: "United Kingdom" },
  { code: "+61", name: "Australia" },
  { code: "+81", name: "Japan" },
  { code: "+49", name: "Germany" },
  { code: "+33", name: "France" },
  { code: "+86", name: "China" },
  { code: "+7", name: "Russia" },
  { code: "+39", name: "Italy" },
  { code: "+34", name: "Spain" },
  { code: "+55", name: "Brazil" },
  { code: "+27", name: "South Africa" },
  { code: "+82", name: "South Korea" },
  { code: "+62", name: "Indonesia" },
  { code: "+234", name: "Nigeria" },
  { code: "+63", name: "Philippines" },
  { code: "+20", name: "Egypt" },
  { code: "+966", name: "Saudi Arabia" },
  // ... (add more as needed)
];

export default function ChessMainPage() {
  const router = useRouter();
  const { gameState } = useChessGame();
  const [orientation] = useState<'white' | 'black'>('white');
  const [user, setUser] = useState(null);
  const [analysisMode, setAnalysisMode] = useState(false);
  const moveListRef = useRef<HTMLDivElement>(null);
  const [showLogin, setShowLogin] = useState(false);
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

  // On mount, check for user session
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  // Move to a specific move in history (for analysis)
  function handleGoToMove(idx: number) {
    if (analysisMode) {
      gameState.goToMove(idx);
    }
  }

  // Enable analysis mode after game ends
  function handleAnalyse() {
    setAnalysisMode(true);
    gameState.goToEnd();
    setTimeout(() => {
      moveListRef.current?.scrollTo({ left: 9999, behavior: "smooth" });
    }, 100);
  }

  // Exit analysis mode and start new game
  function handleNewGame() {
    setAnalysisMode(false);
    gameState.reset();
  }

  // Download PGN
  function handleDownloadPGN() {
    const pgn = gameState.getPgn();
    const blob = new Blob([pgn], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "krrid-chess-game.pgn";
    a.click();
    URL.revokeObjectURL(url);
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

  return (
    <>
      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto gap-8 py-2 px-2">
        {/* Chessboard Section */}
        <div className="flex flex-col items-center bg-[#23272b] rounded-2xl p-1 shadow-xl border border-blue-900">
          <ChessboardUI
            fen={gameState.position}
            turn={gameState.turn}
            makeMove={(fen, move, turn) => {
              if (!analysisMode) {
                gameState.makeMove(fen, move, turn);
              }
            }}
            boardOrientation={orientation}
            boardWidth={480}
          />
        </div>
        {/* Right Panel */}
        <div className="flex-1 flex flex-col gap-8 justify-center items-center md:items-start mt-8 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Play Chess Online<br/>on the <span className="text-blue-400">#1 Site!</span></h1>
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <div className="flex items-center gap-4 bg-sky-600/90 rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-105 transition-transform border-2 border-sky-700" onClick={() => user ? router.push("/chess/multiplayer") : setShowLogin(true)}> 
              <Image src="/play-online.png" alt="Play Online" width={56} height={56} />
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-white">Play Online</span>
                <span className="text-white text-base font-medium mt-1">Play with someone at your level</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-800/90 rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-105 transition-transform border-2 border-gray-700" onClick={() => router.push("/chess/play")}> 
              <Image src="/play-computer.png" alt="Play Computer" width={56} height={56} />
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-white">Play Computer</span>
                <span className="text-gray-200 text-base font-medium mt-1">Play vs customizable training bots</span>
              </div>
            </div>
          </div>
          <div className="mt-10 w-full">
            <h2 className="text-2xl font-bold text-white mb-3">Solve Chess Puzzles</h2>
            <div className="bg-blue-900/80 rounded-xl p-4 flex items-center gap-4 shadow-lg cursor-pointer hover:scale-105 transition-transform border-2 border-blue-700" onClick={() => router.push("/chess/puzzles")}> 
              <Image src="/chessboard.svg" alt="Puzzles" width={60} height={60} />
              <span className="text-lg text-white font-semibold">Sharpen your skills with fun puzzles!</span>
            </div>
          </div>
        </div>
      </div>
      {/* Login/Signup Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-[#181a1b] rounded-2xl shadow-2xl p-8 max-w-md w-full relative border-4 border-blue-900 text-white">
            <button
              className="absolute top-2 right-2 text-blue-400 hover:text-blue-700 focus:outline-none text-3xl"
              onClick={() => setShowLogin(false)}
              aria-label="Close login dialog"
            >
              &times;
            </button>
            <div className="flex mb-6">
              <button
                className={`flex-1 py-2 font-bold rounded-l-lg ${authMode === 'login' ? 'bg-sky-600 text-white' : 'bg-gray-800 text-blue-300'}`}
                onClick={() => setAuthMode('login')}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 font-bold rounded-r-lg ${authMode === 'signup' ? 'bg-sky-600 text-white' : 'bg-gray-800 text-blue-300'}`}
                onClick={() => setAuthMode('signup')}
              >
                Sign Up
              </button>
            </div>
            {/* Google Auth at the top */}
            <button
              type="button"
              className="w-full py-3 rounded-lg bg-red-600 text-white font-bold shadow hover:bg-red-700 flex items-center justify-center gap-2 mb-6"
              onClick={handleGoogleAuth}
              disabled={authLoading}
            >
              <FaGoogle /> Continue with Google
            </button>
            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  type="email"
                  className="border border-gray-700 bg-[#23272b] rounded-lg px-4 py-2 text-white placeholder-gray-400"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="border border-gray-700 bg-[#23272b] rounded-lg px-4 py-2 text-white placeholder-gray-400"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-sky-600 text-white font-bold shadow hover:bg-sky-700 mt-2"
                  disabled={authLoading}
                >
                  {authLoading ? "Logging in..." : "Login"}
                </button>
                {authError && <div className="text-red-400 text-center font-semibold mt-2">{authError}</div>}
              </form>
            ) : (
              <form onSubmit={handleSignup} className="flex flex-col gap-3">
                <input
                  type="text"
                  className="border border-gray-700 bg-[#23272b] rounded-lg px-4 py-2 text-white placeholder-gray-400"
                  placeholder="Full Name"
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="border border-gray-700 bg-[#23272b] rounded-lg px-4 py-2 text-white placeholder-gray-400"
                  placeholder="Username"
                  value={signupUsername}
                  onChange={e => setSignupUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="border border-gray-700 bg-[#23272b] rounded-lg px-4 py-2 text-white placeholder-gray-400"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  required
                />
                <div className="flex gap-2">
                  <select
                    className="border border-gray-700 bg-[#23272b] rounded-lg px-2 py-2 w-32 text-white"
                    value={signupCountry}
                    onChange={e => setSignupCountry(e.target.value)}
                  >
                    {countryCodes.map(c => (
                      <option key={c.code} value={c.code}>{c.code} ({c.name})</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    className="border border-gray-700 bg-[#23272b] rounded-lg px-4 py-2 flex-1 text-white placeholder-gray-400"
                    placeholder="Phone Number"
                    value={signupPhone}
                    onChange={e => setSignupPhone(e.target.value)}
                    required
                  />
                </div>
                <input
                  type="password"
                  className="border border-gray-700 bg-[#23272b] rounded-lg px-4 py-2 text-white placeholder-gray-400"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="border border-gray-700 bg-[#23272b] rounded-lg px-4 py-2 text-white placeholder-gray-400"
                  placeholder="Confirm Password"
                  value={signupConfirm}
                  onChange={e => setSignupConfirm(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-sky-600 text-white font-bold shadow hover:bg-sky-700 mt-2"
                  disabled={authLoading}
                >
                  {authLoading ? "Signing up..." : "Sign Up"}
                </button>
                {authError && <div className="text-red-400 text-center font-semibold mt-2">{authError}</div>}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
} 