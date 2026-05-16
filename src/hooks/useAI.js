"use client";

import api from "@/services/api";
import { useEffect, useState } from "react";

const useAI = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH HISTORY
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/ai/history");

      setMessages(res.data.chats);
    } catch (error) {
      console.log(error);
    }
  };

  // ASK AI
  const askAI = async (prompt) => {
    if (!prompt.trim()) return;

    setLoading(true);

    // USER MESSAGE
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: prompt,
      },
    ]);

    try {
      const res = await api.post("/ai/ask", {
        prompt,
      });

      const aiText = res.data.result;

      // AI MESSAGE
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: aiText,
        },
      ]);
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "AI error occurred",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // CLEAR CHAT
  const clearMessages = async () => {
    try {
      await api.delete("/ai/clear");

      setMessages([]);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    messages,
    loading,
    askAI,
    clearMessages,
  };
};

export default useAI;
