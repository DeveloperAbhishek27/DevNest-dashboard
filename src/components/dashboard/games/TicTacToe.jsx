"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import useAI from "@/hooks/useAI";
import GameResultModal from "./GameResultModal";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const { askAI } = useAI();
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (b, p) =>
    winPatterns.some((pattern) => pattern.every((i) => b[i] === p));

  // 🔥 POPUP + RESET HANDLER
  const endGame = (message) => {
    setResult(message);

    setTimeout(() => {
      setBoard(Array(9).fill(""));
      setResult(null);
    }, 9000);
  };

  const handleClick = async (index) => {
    if (board[index] || loading) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    // 👤 USER WIN
    if (checkWinner(newBoard, "X")) {
      endGame("🎉 You Win!");
      return;
    }

    setLoading(true);

    // 🤖 AI PROMPT
    const prompt = `
You are a Tic Tac Toe AI.

Return ONLY one number (0-8).
No explanation.

Board:
${newBoard.map((v) => v || "-").join(" ")}
`;

    try {
      const res = await askAI(prompt);

      console.log("AI RESPONSE:", res);

      const aiMove = parseInt(String(res).match(/\d+/)?.[0]);

      const updated = [...newBoard];

      if (!isNaN(aiMove) && aiMove >= 0 && aiMove <= 8 && !updated[aiMove]) {
        updated[aiMove] = "O";
      } else {
        const empty = updated
          .map((v, i) => (v === "" ? i : null))
          .filter((v) => v !== null);

        const random = empty[Math.floor(Math.random() * empty.length)];

        if (random !== undefined) {
          updated[random] = "O";
        }
      }

      setBoard(updated);

      // 🤖 AI WIN
      if (checkWinner(updated, "O")) {
        endGame("🤖 AI Wins!");
      }
    } catch (err) {
      console.log("AI ERROR:", err);
    }

    setLoading(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
  };

  return (
    <div className="text-center text-white relative pt-32 sm:pt-6 flex flex-col items-center justify-center">
      <div
        className=" absolute  right-8 top-4
      flex items-center justify-center  group
      w-14 h-14
      rounded-2xl 

      bg-homeBg/45
      dark:bg-white/15

      border border-white/[0.03]

      dark:shadow-[inset_-1px_-1px_1px_rgba(255,255,255,0.05),inset_1px_1px_2px_rgba(0,0,0,0.9),0_6px_14px_rgba(0,0,0,0.45)]

      transition-all duration-300

      group-hover:scale-110
      group-hover:text-brand
    "
      >
        <button
          onClick={resetGame}
          className="
        
        w-12 h-12
        flex items-center justify-center
        rounded-2xl
        bg-white/20
        hover:bg-white/20
        transition
        active:scale-95 border-2 border-white/15
      "
        >
          <RefreshCw
            strokeWidth={3}
            className="w-7 h-7 group-hover:rotate-90 text-white dark:group-hover:text-brand  group-hover:text-homeBg transition-all duration-300"
          />
        </button>
      </div>

      <div
        className="grid grid-cols-3 gap-4 w-[340px] p-5 rounded-3xl 
bg-gradient-to-br from-homeBg/10 to-white/15 
dark:from-white/5 dark:to-white/[0.02]
border-2 border-homeBg/20 dark:border-white/10 
 shadow"
      >
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="
        group
        relative

        w-20 h-20

        flex items-center justify-center

        rounded-2xl

        bg-gradient-to-br from-homeBg/20 to-homeBg
        dark:from-white/10 dark:to-white/[0.03]

        border border-white/20

        dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_20px_-10px_rgba(0,0,0,0.7)]

        transition-all duration-300

      
   
        hover:shadow-lg

        active:scale-95
      "
          >
            {/* INNER GLOW LAYER */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-brand/20 to-transparent" />

            {/* TEXT */}
            <span
              className="
          relative z-10
          text-3xl font-extrabold
          text-white
          drop-shadow-lg
          transition-all duration-300
          group-hover:scale-110
        "
            >
              {cell}
            </span>
          </button>
        ))}
      </div>

      {/* AI THINKING (NOW BELOW BOARD) */}
      {loading && (
        <div className="mt-4 flex items-center gap-2  text-homeBg dark:text-gray-300 text-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          AI is thinking...
        </div>
      )}

      {/* MODAL */}
      <GameResultModal
        open={!!result}
        message={result}
        onClose={() => setResult(null)}
      />
    </div>
  );
}
