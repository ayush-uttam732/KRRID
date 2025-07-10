"use client";
import { useState, useEffect } from "react";
import ChessboardUI from "@/components/ChessboardUI";
import { useChessGame } from "@/hooks/useChessGame";
import { ChessGameEndModal } from '@/components/ChessboardUI';

interface Move {
  from: string;
  to: string;
  promotion?: string;
}

export default function PlayChessPage() {
  const { gameState, makeMove, reset, goToPrevious, goToNext, getPgn, loadPgn } = useChessGame();
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');
  const [aiLevel, setAiLevel] = useState(4); // Default AI difficulty
  const [isAITurn, setIsAITurn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playAs, setPlayAs] = useState<'white' | 'black'>('white');
  const [gameStarted, setGameStarted] = useState(false);

  // LocalStorage persistence
  const LOCAL_KEY = 'krrid-chess-last-game';
  // On mount, restore game from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      try {
        const { pgn } = JSON.parse(saved);
        if (pgn) loadPgn(pgn);
      } catch {}
    }
  }, [loadPgn]);
  // After each move, save to localStorage
  useEffect(() => {
    if (gameState.history.length > 0) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify({ pgn: getPgn() }));
    }
  }, [gameState.history, getPgn]);

  // PGN Download
  function handleDownloadPGN() {
    const pgn = getPgn();
    const blob = new Blob([pgn], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'krrid-chess-game.pgn';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  // On new game, reset playAs and gameStarted
  function handleNewGame() {
    reset();
    setIsAITurn(false);
    setLoading(false);
    setGameStarted(false);
    setPlayAs('white');
  }

  // When game starts and user chose black, AI makes first move
  useEffect(() => {
    if (gameStarted && playAs === 'black' && gameState.turn === 'w' && gameState.gameStatus === 'playing') {
      setIsAITurn(true);
      setLoading(true);
      fetch('/api/ai-move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen: gameState.position, aiLevel }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.move) {
            makeMove(data.move.from, data.move.to, data.move.promotion);
          }
        })
        .finally(() => {
          setIsAITurn(false);
          setLoading(false);
        });
    }
  }, [gameStarted, playAs, gameState.turn, gameState.position, gameState.gameStatus, aiLevel, makeMove]);

  // AI move after user move
  useEffect(() => {
    if (!gameStarted) return;
    if (gameState.turn === (playAs === 'white' ? 'b' : 'w') && gameState.gameStatus === 'playing') {
      setIsAITurn(true);
      setLoading(true);
      fetch('/api/ai-move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen: gameState.position, aiLevel }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.move) {
            makeMove(data.move.from, data.move.to, data.move.promotion);
          }
        })
        .finally(() => {
          setIsAITurn(false);
          setLoading(false);
        });
    }
  }, [gameStarted, playAs, gameState.turn, gameState.position, gameState.gameStatus, aiLevel, makeMove]);

  function handleMove(fen: string, move: Move) {
    if (!gameStarted || isAITurn || gameState.turn !== playAs[0] || gameState.gameStatus !== 'playing') return;
    makeMove(move.from, move.to, move.promotion);
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
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex flex-col items-center">
          <ChessboardUI
            fen={gameState.position}
            makeMove={handleMove}
            boardOrientation={playAs}
            boardWidth={420}
            isDraggable={gameStarted && !isAITurn && gameState.turn === playAs[0] && gameState.gameStatus === 'playing'}
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
              onClick={handleNewGame}
              className="px-4 py-2 rounded-lg bg-sky-500 text-white font-bold shadow hover:bg-sky-600 transition-all"
              disabled={loading}
            >
              New Game
            </button>
            <button
              onClick={() => setOrientation(o => (o === 'white' ? 'black' : 'white'))}
              className="px-4 py-2 rounded-lg bg-gray-700 text-sky-200 font-bold shadow hover:bg-gray-900 transition-all"
              disabled={loading || !gameStarted}
            >
              Flip Board
            </button>
            <button
              onClick={goToPrevious}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-bold shadow hover:bg-gray-300 transition-all"
              disabled={loading || !gameStarted}
            >
              Undo
            </button>
            <button
              onClick={goToNext}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-bold shadow hover:bg-gray-300 transition-all"
              disabled={loading || !gameStarted}
            >
              Redo
            </button>
            <button
              onClick={handleDownloadPGN}
              className="px-4 py-2 rounded-lg bg-green-500 text-white font-bold shadow hover:bg-green-600 transition-all"
              disabled={gameState.history.length === 0}
            >
              Download PGN
            </button>
          </div>
          <div className="w-full mt-2" id="move-history-analysis"></div>
        </div>
        <div className="max-w-md mt-8 md:mt-0 text-white w-full md:w-[320px]">
          <div className="bg-[#181f2b] rounded-2xl p-6 shadow-lg border border-blue-900 flex flex-col gap-6 items-center">
            <div className="flex flex-col gap-4 items-center w-full">
              <label className="text-sky-400 font-bold text-lg mb-2">Play as:</label>
              <div className="flex gap-4 mb-2">
                <button
                  className={`px-4 py-2 rounded-lg font-bold shadow transition-all text-lg ${playAs === 'white' ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setPlayAs('white')}
                  disabled={loading || gameStarted}
                >
                  White
                </button>
                <button
                  className={`px-4 py-2 rounded-lg font-bold shadow transition-all text-lg ${playAs === 'black' ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setPlayAs('black')}
                  disabled={loading || gameStarted}
                >
                  Black
                </button>
              </div>
              <button
                className="px-6 py-2 rounded-lg bg-sky-600 text-white font-bold shadow hover:bg-sky-700 transition-all text-lg"
                onClick={() => setGameStarted(true)}
                disabled={loading || gameStarted}
              >
                Start Game
              </button>
            </div>
            <div className="flex flex-col gap-2 items-center w-full mt-4">
              <label htmlFor="ai-level" className="text-sky-400 font-bold text-lg">AI Difficulty:</label>
              <select
                id="ai-level"
                value={aiLevel}
                onChange={e => setAiLevel(Number(e.target.value))}
                className="rounded px-2 py-1 border border-sky-400 text-black font-semibold w-full"
                disabled={isAITurn || loading || !gameStarted}
              >
                {[1,2,3,4,5,6,7,8].map(level => (
                  <option key={level} value={level}>Level {level}</option>
                ))}
              </select>
              {loading && <span className="ml-2 text-xs text-gray-500 animate-pulse">AI thinking...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 