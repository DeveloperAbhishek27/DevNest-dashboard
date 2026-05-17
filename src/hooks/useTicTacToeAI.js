"use client";

import api from "@/services/api";

const useGameAI = () => {
  const askGameAI = async (prompt) => {
    try {
      const res = await api.post("/ai/ask", {
        prompt,
      });

      return res.data.result || "";
    } catch (err) {
      console.log(err);
      return "";
    }
  };

  return { askGameAI };
};

export default useGameAI;
