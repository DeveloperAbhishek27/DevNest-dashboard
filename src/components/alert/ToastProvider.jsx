"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider({ children }) {
  return (
    <>
      {children}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastStyle={{
          maxWidth: "280px",
          minHeight: "auto",
          padding: 0,
        }}
      />
    </>
  );
}
