"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LockKeyhole, X } from "lucide-react";

import api from "@/services/api";
import { errorToast, successToast } from "../alert/notify";
import { fadeIn, fadeInUp } from "@/animations";

const ResetPasswordModal = ({ email, setOpen }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      if (!password || !confirmPassword) {
        return errorToast("All fields are required");
      }

      if (password !== confirmPassword) {
        return errorToast("Passwords do not match");
      }

      const response = await api.post("/auth/reset-password", {
        email,
        password,
      });

      successToast(response.data.message);

      window.location.href = "/login";
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed");
    }
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/80 
        px-4
      "
    >
      {/* CLICK OUTSIDE CLOSE */}
      <div onClick={() => setOpen(false)} className="absolute inset-0" />

      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={fadeInUp}
        className="
          relative
          w-full max-w-sm

          rounded-[28px]

          bg-white
          dark:bg-[#161616]

          border border-black/10
          dark:border-white/10

          p-6

          shadow-2xl
        "
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          className="
            absolute top-4 right-4

            w-9 h-9
            rounded-full

            bg-black/5
            dark:bg-white/5

            flex items-center justify-center

            text-gray-500
            hover:text-red-500
            transition
          "
        >
          <X size={18} />
        </button>

        {/* ICON */}
        <div className="flex justify-center">
          <div
            className="
              w-14 h-14
              rounded-2xl

              bg-brand/10

              flex items-center justify-center
            "
          >
            <LockKeyhole className="text-brand" size={28} />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-center text-2xl font-bold mt-4 text-black dark:text-white">
          Reset Password
        </h2>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
          Create a new secure password
        </p>

        {/* INPUTS */}
        <div className="mt-6 space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full h-12

              px-4

              rounded-2xl

              bg-transparent

              border border-black/10
              dark:border-white/10

              text-black dark:text-white

              outline-none

              focus:border-brand
            "
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="
              w-full h-12

              px-4

              rounded-2xl

              bg-transparent

              border border-black/10
              dark:border-white/10

              text-black dark:text-white

              outline-none

              focus:border-brand
            "
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleResetPassword}
          className="
            w-full h-12

            mt-6

            rounded-2xl

            bg-brand

            text-white
            font-semibold

            hover:opacity-90
            transition-all
          "
        >
          Update Password
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ResetPasswordModal;
