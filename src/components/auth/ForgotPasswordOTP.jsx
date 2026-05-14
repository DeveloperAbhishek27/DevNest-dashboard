"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { ShieldCheck, RotateCcw, X } from "lucide-react";

import api from "@/services/api";

import { errorToast, successToast } from "../alert/notify";

import ResetPasswordModal from "./ResetPasswordModal";
import { fadeIn, fadeInUp } from "@/animations";

const ForgotPasswordOTP = ({ email, otp: initialOTP, setOpen }) => {
  const [otp, setOtp] = useState(initialOTP);

  const [enteredOTP, setEnteredOTP] = useState("");

  const [timeLeft, setTimeLeft] = useState(60);

  const [loading, setLoading] = useState(false);

  const [resending, setResending] = useState(false);

  const [showReset, setShowReset] = useState(false);

  // TIMER
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // VERIFY OTP
  const handleVerifyOTP = async () => {
    try {
      if (!enteredOTP) {
        return errorToast("Please enter OTP");
      }

      if (timeLeft <= 0) {
        return errorToast("OTP Expired");
      }

      setLoading(true);

      const response = await api.post("/auth/verify-forgot-otp", {
        email,
        otp: enteredOTP,
      });

      successToast(response.data.message);

      setShowReset(true);
    } catch (error) {
      errorToast(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP
  const handleResendOTP = async () => {
    try {
      setResending(true);

      const response = await api.post("/auth/forgot-password-otp", {
        email,
      });

      setOtp(response.data.otp);

      setEnteredOTP("");

      setTimeLeft(60);

      successToast("New OTP Generated");
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  // RESET PASSWORD SCREEN
  if (showReset) {
    return <ResetPasswordModal email={email} setOpen={setShowReset} />;
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="
    fixed
    inset-0
    z-50

    flex
    items-center
    justify-center

    px-4

    bg-black/80
  "
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="
        relative

        w-full
        max-w-md

        rounded-[30px]

        bg-white
        dark:bg-[#161616]

        border
        border-black/10
        dark:border-white/10

        p-7

        shadow-2xl
      "
      >
        {/* CLOSE */}
        <button
          onClick={() => setOpen(false)}
          className="
          absolute
          top-5
          right-5

          w-9
          h-9

          rounded-full

          bg-black/5
          dark:bg-white/5

          flex
          items-center
          justify-center

          text-gray-500
          hover:text-red-500

          transition-all
        "
        >
          <X size={18} />
        </button>

        {/* ICON */}
        <div
          className="
          w-16
          h-16

          rounded-2xl

          bg-brand/10

          flex
          items-center
          justify-center

          mx-auto
        "
        >
          <ShieldCheck size={30} className="text-brand" />
        </div>

        {/* TITLE */}
        <div className="text-center mt-5">
          <h2
            className="
            text-3xl
            font-black

            text-black
            dark:text-white
          "
          >
            Verify OTP
          </h2>

          <p
            className="
            mt-2
            text-sm

            text-gray-500
            dark:text-gray-400
          "
          >
            Enter the 6 digit OTP
          </p>
        </div>

        {/* DEMO OTP */}
        <div className="mt-6 text-center">
          <h1
            className="
            text-5xl
            font-black
            tracking-[10px]

            text-brand
          "
          >
            {otp}
          </h1>
        </div>

        {/* INPUT */}
        <input
          type="text"
          maxLength={6}
          value={enteredOTP}
          onChange={(e) => setEnteredOTP(e.target.value.replace(/\D/g, ""))}
          placeholder="------"
          className="
          w-full
          h-14

          mt-7

          rounded-2xl

          border
          border-black/10
          dark:border-white/10

          bg-transparent

          text-center
          text-2xl
          tracking-[8px]

          text-black
          dark:text-white

          outline-none

          focus:border-brand
        "
        />

        {/* VERIFY BUTTON */}
        <button
          onClick={handleVerifyOTP}
          disabled={loading || timeLeft <= 0}
          className="
          w-full
          h-14

          mt-6

          rounded-2xl

          bg-brand

          text-white
          font-semibold

          hover:opacity-90

          transition-all

          disabled:opacity-50
          disabled:cursor-not-allowed
        "
        >
          {loading
            ? "Verifying..."
            : timeLeft <= 0
              ? "OTP Expired"
              : "Verify OTP"}
        </button>

        {/* TIMER */}
        <p
          className="
          text-center
          mt-5
          text-sm

          text-gray-500
          dark:text-gray-400
        "
        >
          OTP expires in{" "}
          <span className="text-brand font-bold">{timeLeft}s</span>
        </p>

        {/* RESEND */}
        {timeLeft <= 0 && (
          <button
            onClick={handleResendOTP}
            disabled={resending}
            className="
            w-full

            mt-5

            flex
            items-center
            justify-center
            gap-2

            text-brand
            font-semibold

            hover:underline
          "
          >
            <RotateCcw size={16} />

            {resending ? "Generating..." : "Regenerate OTP"}
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ForgotPasswordOTP;
