"use client";

import { motion } from "framer-motion";
import { Trophy, Bot, X } from "lucide-react";

export default function GameResultModal({ open, message, onClose }) {
  if (!open) return null;

  const isAI = message?.includes("AI");

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="
          w-[90%]
          max-w-md
          rounded-3xl
          bg-homeBg
          border border-white/10
          p-6
          text-center
          shadow-2xl
          relative
        "
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center"
        >
          <X size={16} />
        </button>

        {/* ICON */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-brand/10">
          {isAI ? (
            <Bot className="text-brand w-8 h-8" />
          ) : (
            <Trophy className="text-yellow-400 w-8 h-8" />
          )}
        </div>

        {/* MESSAGE */}
        <h2 className="text-2xl font-bold text-white">{message}</h2>

        <p className="text-gray-400 text-sm mt-2">
          Game will restart automatically...
        </p>
      </motion.div>
    </div>
  );
}
