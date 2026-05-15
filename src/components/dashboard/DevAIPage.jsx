"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useAI from "@/hooks/useAI";

export default function DevAIPage() {
  const [input, setInput] = useState("");

  const { messages, askAI, loading } = useAI();

  const chatRef = useRef(null);

  // AUTO SCROLL
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    await askAI(input);
    setInput("");
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col bg-white dark:bg-homeBg rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
      {/* HEADER */}
      <div className="p-4 border-b border-black/10 dark:border-white/10">
        <h1 className="text-xl font-bold">Dev AI Assistant 🤖</h1>
        <p className="text-xs text-gray-500">
          Ask code questions, fix bugs, or generate snippets
        </p>
      </div>

      {/* CHAT AREA */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap shadow
              ${
                msg.role === "user"
                  ? "bg-brand text-white rounded-br-none"
                  : "bg-black/5 dark:bg-white/10 text-black dark:text-white rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {/* TYPING INDICATOR */}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl bg-black/5 dark:bg-white/10 text-sm animate-pulse">
              🤖 Thinking...
            </div>
          </div>
        )}
      </div>

      {/* INPUT AREA */}
      <div className="p-4 border-t border-black/10 dark:border-white/10 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask Dev AI anything..."
          className="flex-1 px-4 py-3 rounded-xl bg-black/5 dark:bg-white/10 outline-none"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="px-5 py-3 bg-brand text-white rounded-xl hover:opacity-90 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
