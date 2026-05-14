"use client";

import { toast } from "react-toastify";

const baseStyle = {
  borderRadius: "12px",
  padding: "14px 16px",
  fontSize: "14px",
  fontWeight: "500",
  color: "#fff",
  backdropFilter: "blur(10px)",
  width: "100%",
  wordBreak: "break-word",
};

export const successToast = (msg) => {
  toast.success(msg, {
    style: {
      ...baseStyle,
      background: "rgba(34, 197, 94, 0.15)",
      border: "1px solid #22c55e",
    },
  });
};

export const errorToast = (msg) => {
  toast.error(msg, {
    style: {
      ...baseStyle,
      background: "rgba(239, 68, 68, 0.15)",
      border: "1px solid #ef4444",
    },
  });
};

export const infoToast = (msg) => {
  toast.info(msg, {
    style: {
      ...baseStyle,
      background: "rgba(59, 130, 246, 0.15)",
      border: "1px solid #3b82f6",
    },
  });
};
