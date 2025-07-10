"use client";
import { useState } from "react";
import ChessboardUI from "@/components/ChessboardUI";
import { useChessGame } from "@/hooks/useChessGame";
import { ChessGameEndModal } from '@/components/ChessboardUI';

interface Move {
  from: string;
  to: string;
  promotion?: string;
}

export default function PlayWithFriendsPage() {
  const { gameState, makeMove, reset, goToPrevious, goToNext } = useChessGame();
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');
  const [gameId, setGameId] = useState('abc123'); // Placeholder game ID
  const [copied, setCopied] = useState(false);

  function handleMove(fen: string, move: Move) {
    makeMove(move.from, move.to, move.promotion);
  }

  function handleCopy() {
    navigator.clipboard.writeText(`${window.location.origin}/chess/play/friends/${gameId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleNewGame() {
    // Generate a new random game ID (simple example)
    const newId = Math.random().toString(36).substring(2, 8);
    setGameId(newId);
    reset();
  }

  // Determine if game ended and who won
  const isGameEnd = gameState.gameStatus !== 'playing';
  let winner: 'white' | 'black' | 'draw' | null = null;
  if (isGameEnd) {
    if (gameState.gameStatus === 'checkmate') {
      winner = gameState.turn === 'w' ? 'black' : 'white';
    } else if (gameState.gameStatus === 'stalemate' || gameState.gameStatus === 'draw') {
      winner = 'draw';
    }
  }

  function handleAnalyse() {
    // For now, just close modal. You can add navigation to analysis page here.
    // setShowModal(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black flex flex-col items-center w-full py-12 px-4">
      <div className="w-full max-w-4xl flex flex-col items-center gap-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Play Chess with a Friend</h1>
        <div className="flex flex-col md:flex-row gap-10 w-full items-center justify-center">
          <div className="bg-[#23272b] rounded-2xl p-6 shadow-xl border border-blue-900 flex flex-col items-center">
            <ChessboardUI
              fen={gameState.position}
              makeMove={handleMove}
              boardOrientation={orientation}
              boardWidth={420}
            />
            <ChessGameEndModal
              open={isGameEnd}
              winner={winner}
              reason={gameState.gameStatus}
              onNewGame={handleNewGame}
              onAnalyse={handleAnalyse}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={reset}
                className="px-4 py-2 rounded-lg bg-sky-500 text-white font-bold shadow hover:bg-sky-600 transition-all"
              >
                New Game
              </button>
              <button
                onClick={() => setOrientation(o => (o === 'white' ? 'black' : 'white'))}
                className="px-4 py-2 rounded-lg bg-gray-700 text-sky-200 font-bold shadow hover:bg-gray-900 transition-all"
              >
                Flip Board
              </button>
              <button
                onClick={goToPrevious}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-bold shadow hover:bg-gray-300 transition-all"
              >
                Undo
              </button>
              <button
                onClick={goToNext}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-bold shadow hover:bg-gray-300 transition-all"
              >
                Redo
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-6 items-center bg-[#181f2b] rounded-2xl p-8 shadow-lg border border-blue-900 w-full max-w-sm">
            <h2 className="text-xl font-bold text-white mb-2">Invite a Friend</h2>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-gray-300 text-base">Share this link with your friend:</span>
              <div className="flex gap-2 items-center w-full">
                <input
                  type="text"
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/chess/play/friends/${gameId}`}
                  readOnly
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white font-mono text-sm border border-gray-700"
                />
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 rounded-lg bg-sky-500 text-white font-semibold shadow hover:bg-sky-600 transition-all"
                >
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
            <button
              onClick={handleNewGame}
              className="mt-4 px-5 py-3 rounded-lg bg-blue-700 text-white font-bold shadow hover:bg-blue-800 transition-all w-full"
            >
              Start New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 