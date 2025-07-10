"use client";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import React from "react";

// Optionally import a move sound
// import moveSound from "@/public/move.mp3";

interface Move {
  from: string;
  to: string;
  promotion?: string;
}

// Helper to determine if it's the user's turn in multiplayer
function isPlayersTurn({ userId, player_white, player_black, turn }: {
  userId?: string;
  player_white?: string;
  player_black?: string;
  turn?: string;
}) {
  if (!userId || !player_white || !player_black || !turn) return false;
  if (turn === "w") return userId === player_white;
  if (turn === "b") return userId === player_black;
  return false;
}

type ChessboardUIProps = {
  fen?: string;
  turn?: string;
  makeMove?: (fen: string, move: Move, turn: string) => void;
  moves?: Move[];
  userId?: string;
  player_white?: string;
  player_black?: string;
  multiplayer?: boolean;
  showAnalysis?: boolean;
  boardWidth?: number;
  boardOrientation?: 'white' | 'black';
  customLightSquareStyle?: Record<string, string>;
  customDarkSquareStyle?: Record<string, string>;
  pieceTheme?: string;
};

type ChessGameEndModalProps = {
  open: boolean;
  winner: 'white' | 'black' | 'draw' | null;
  reason: string;
  onNewGame: () => void;
  onAnalyse: () => void;
};

function ChessGameEndModal({ open, winner, reason, onNewGame, onAnalyse }: ChessGameEndModalProps) {
  if (!open) return null;
  let title = '';
  let message = '';
  if (winner === 'white') {
    title = 'White Wins!';
    message = 'Congratulations! You played brilliantly.';
  } else if (winner === 'black') {
    title = 'Black Wins!';
    message = 'Congratulations! You played brilliantly.';
  } else if (winner === 'draw') {
    title = 'Draw!';
    message = "It's a stalemate or draw. Don't worry, try again!";
  }
  if (reason === 'checkmate' && winner !== 'draw') {
    message = winner === 'white' ? 'Congratulations! You checkmated your opponent.' : "Don't worry, try again!";
  } else if (reason === 'stalemate') {
    message = "It's a stalemate. Don't worry, try again!";
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gradient-to-br from-white to-sky-100 rounded-3xl shadow-2xl p-8 max-w-md w-full border-4 border-sky-300 relative animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-sky-500 mb-2 text-center drop-shadow">{title}</h2>
        <p className="text-lg text-gray-700 mb-6 text-center font-semibold">{message}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onAnalyse}
            className="px-6 py-2 rounded-lg bg-sky-500 text-white font-bold shadow hover:bg-sky-600 transition-all text-lg"
          >
            Analyse
          </button>
          <button
            onClick={onNewGame}
            className="px-6 py-2 rounded-lg bg-gray-700 text-sky-200 font-bold shadow hover:bg-gray-900 transition-all text-lg"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChessboardUI(props: ChessboardUIProps) {
  // Remove internal FEN/orientation state; use only props
  const [lastMoveSquares, setLastMoveSquares] = useState<{from: string, to: string} | null>(null);

  // Clear last move highlight when new game starts
  useEffect(() => {
    if (props.fen === "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
      setLastMoveSquares(null);
    }
  }, [props.fen]);

  // Play move sound (optional)
  // function playMoveSound() {
  //   const audio = new Audio(moveSound);
  //   audio.play();
  // }

  // Piece theme selection (future: add more sets)
  const customPieces = undefined;
  if (props.pieceTheme === 'alpha') {
    // customPieces = ... (future: implement alpha set)
  } else if (props.pieceTheme === 'fantasy') {
    // customPieces = ... (future: implement fantasy set)
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    // Multiplayer: only allow move if it's the user's turn
    if (props.multiplayer) {
      if (!isPlayersTurn({
        userId: props.userId,
        player_white: props.player_white,
        player_black: props.player_black,
        turn: props.turn,
      })) {
        return false;
      }
      const chess = new Chess(props.fen);
      const move = chess.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
      if (move) {
        setLastMoveSquares({ from: sourceSquare, to: targetSquare });
        // playMoveSound();
        if (props.makeMove) props.makeMove(chess.fen(), move, chess.turn());
        return true;
      }
      return false;
    } else {
      // Single-player: allow both sides to move
      const chess = new Chess(props.fen);
      const move = chess.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
      if (move) {
        setLastMoveSquares({ from: sourceSquare, to: targetSquare });
        // playMoveSound();
        if (props.makeMove) props.makeMove(chess.fen(), move, chess.turn());
        return true;
      }
      return false;
    }
  }

  // Highlight last move squares
  function customSquareStyles() {
    if (!lastMoveSquares) return {};
    return {
      [lastMoveSquares.from]: {
        background: "radial-gradient(circle, #ffe680 60%, transparent 100%)",
      },
      [lastMoveSquares.to]: {
        background: "radial-gradient(circle, #ffe680 60%, transparent 100%)",
      },
    };
  }

  return (
    <div>
      <div className="shadow-2xl border-4 border-[#b58863] rounded-2xl">
        <Chessboard
          position={props.fen}
          boardWidth={props.boardWidth || 320}
          customLightSquareStyle={props.customLightSquareStyle}
          customDarkSquareStyle={props.customDarkSquareStyle}
          arePiecesDraggable={props.multiplayer ? isPlayersTurn({
            userId: props.userId,
            player_white: props.player_white,
            player_black: props.player_black,
            turn: props.turn,
          }) : true}
          animationDuration={200}
          onPieceDrop={onDrop}
          boardOrientation={props.boardOrientation || 'white'}
          customSquareStyles={customSquareStyles()}
          customPieces={customPieces}
        />
      </div>
    </div>
  );
} 

export { ChessGameEndModal }; 