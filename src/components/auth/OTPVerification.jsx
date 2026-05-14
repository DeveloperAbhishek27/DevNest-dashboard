"use client";

import { motion } from "framer-motion";

import { useState, useEffect } from "react";

import api from "@/services/api";

import { errorToast, successToast } from "../alert/notify";

const OTPVerification = ({ otp: initialOTP, formData }) => {
  const [enteredOTP, setEnteredOTP] = useState("");

  const [loading, setLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState(60);
  const [otp, setOtp] = useState(initialOTP);

  const [resending, setResending] = useState(false);

  const handleResendOTP = async () => {
    try {
      setResending(true);

      const response = await api.post("/auth/send-otp", {
        email: formData.email,
        mobile: formData.mobile,
      });

      setOtp(response.data.otp);

      setTimeLeft(60);

      successToast("New OTP Sent");
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  // COUNTDOWN TIMER
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
      // EXPIRE CHECK
      if (timeLeft <= 0) {
        return errorToast("OTP Expired");
      }

      setLoading(true);

      const response = await api.post("/auth/verify-otp", {
        ...formData,
        otp: enteredOTP.toString(),
      });

      successToast(response.data.message || "Registration Successful");

      // REDIRECT TO LOGIN
      window.location.href = "/login";
    } catch (error) {
      console.log(error);

      errorToast(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          w-full
          max-w-sm

          bg-white/5
          border
          border-white/10

          rounded-2xl
          p-6

          backdrop-blur-xl
        "
      >
        {/* TITLE */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Verify OTP</h1>

          <p className="text-sm text-gray-400 mt-2">Enter the 6 digit code</p>
        </div>

        {/* DEMO OTP */}
        <div className="mt-6 text-center">
          <h2 className="text-4xl tracking-[10px] font-black text-brand">
            {otp}
          </h2>
        </div>

        {/* OTP INPUT */}
        <input
          type="text"
          maxLength={6}
          value={enteredOTP}
          onChange={(e) => setEnteredOTP(e.target.value.replace(/\D/g, ""))}
          placeholder="------"
          className="
            w-full
            h-14
            mt-6

            rounded-xl

            bg-white/5
            border
            border-white/10

            text-center
            text-2xl
            tracking-[8px]

            text-white

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

            rounded-xl

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
        <p className="text-center text-xs text-gray-300 mt-4">
          OTP expires in{" "}
          <span className="text-brand font-semibold">{timeLeft}s</span>
        </p>

        {/* RESEND BUTTON */}
        {timeLeft <= 0 && (
          <button
            onClick={handleResendOTP}
            className="
              w-full
              mt-5

              text-brand
              font-semibold

              hover:underline
            "
          >
            Resend OTP
          </button>
        )}
      </motion.div>
    </section>
  );
};

export default OTPVerification;
