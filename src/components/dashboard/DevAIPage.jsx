"use client";

import { useEffect, useRef, useState } from "react";

import { Bot, SendHorizonal, Trash2, User } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import useAI from "@/hooks/useAI";

export default function DevAIPage() {
  const [input, setInput] = useState("");

  const { messages, askAI, loading, clearMessages } = useAI();

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
    <div className="h-[calc(100vh-120px)] flex justify-center fade-in">
      <div className="w-full max-w-5xl flex flex-col bg-white dark:bg-homeBg rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden shadow-xl scale-in">
        {/* HEADER */}
        <div className="px-5 py-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between ">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-brand/10 flex items-center justify-center">
              <Bot className="text-brand" size={24} />
            </div>

            <div>
              <h1 className="text-lg font-bold flex items-center gap-2">
                DevNext AI
              </h1>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Fix bugs, generate code & ask dev questions
              </p>
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2">
            {/* CLEAR */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearMessages}
              className="h-10 px-4 rounded-xl bg-brand text-white hover:bg-brand/80 transition flex items-center gap-2 text-sm"
            >
              <Trash2 size={16} />
              Clear
            </motion.button>
          </div>
        </div>

        {/* CHAT AREA */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-4 py-5 space-y-4"
        >
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end fade-in-up-soft"
                    : "justify-start fade-in-up"
                }`}
              >
                <div
                  className={`flex items-end gap-2 sm:max-w-[75%] max-w-[95%] ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* ICON */}
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0
                    ${
                      msg.role === "user"
                        ? "bg-brand text-white"
                        : "bg-black/5 dark:bg-white/10 text-brand"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={18} />
                    ) : (
                      <Bot size={18} />
                    )}
                  </div>

                  {/* MESSAGE */}
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md whitespace-pre-wrap
                    ${
                      msg.role === "user"
                        ? "bg-brand text-white rounded-br-sm"
                        : "bg-black/5 dark:bg-white/10 text-black dark:text-white rounded-bl-sm border border-black/5 dark:border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* THINKING */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start fade-in"
            >
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/5 dark:bg-white/10 text-sm shadow-md border border-black/5 dark:border-white/5">
                <Bot size={18} className="text-brand animate-bounce" />

                <div className="flex items-center gap-1">
                  <span className="animate-pulse">Thinking</span>

                  <span className="animate-bounce">.</span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  >
                    .
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  >
                    .
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* INPUT AREA */}
        <div className="p-4 border-t border-black/10 dark:border-white/10 bg-white/70 dark:bg-homeBg/70 ">
          <div className="flex items-center gap-3 bg-black/5 dark:bg-white/10 rounded-2xl p-2 border border-black/5 dark:border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask Dev AI anything..."
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-gray-500"
            />

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.92,
              }}
              onClick={handleSend}
              disabled={loading}
              className="h-11 w-11 rounded-xl bg-brand text-white flex items-center justify-center shadow-lg hover:opacity-90 transition disabled:opacity-50"
            >
              <SendHorizonal size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
