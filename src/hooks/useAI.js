"use client";

import api from "@/services/api";
import { useState } from "react";

const useAI = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askAI = async (prompt) => {
    setLoading(true);

    // user message
    setMessages((prev) => [...prev, { role: "user", text: prompt }]);

    try {
      const res = await api.post("/ai/ask", { prompt });

      const aiText = res.data.result;

      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "AI error occurred" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, askAI };
};

export default useAI;
