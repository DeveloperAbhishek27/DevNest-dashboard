"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { X, Mail, ShieldCheck } from "lucide-react";

import api from "@/services/api";

import { errorToast, successToast } from "../alert/notify";

import ForgotPasswordOTP from "./ForgotPasswordOTP";
import { fadeIn, fadeInUp } from "@/animations";

const ForgotPasswordModal = ({ open, setOpen }) => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [showOTP, setShowOTP] = useState(false);

  const [otp, setOtp] = useState("");

  // SEND OTP
  const handleSendOTP = async () => {
    try {
      // EMPTY CHECK
      if (!email) {
        return errorToast("Email is required");
      }

      setLoading(true);

      const response = await api.post("/auth/forgot-password-otp", {
        email,
      });

      setOtp(response.data.otp);

      successToast(response.data.message);

      setShowOTP(true);
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // OTP MODAL
  if (showOTP) {
    return (
      <ForgotPasswordOTP
        email={email}
        otp={otp}
        open={showOTP}
        setOpen={setShowOTP}
      />
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setOpen(false)}
            className="
              fixed
              inset-0
              z-50

              bg-black/80
           
            "
          />

          <div
            className="
              fixed
              inset-0
              z-50

              flex
              items-center
              justify-center

              px-4
            "
          >
            <motion.div
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

                shadow-2xl

                p-7
              "
            >
              {/* CLOSE BUTTON */}
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
                <ShieldCheck size={32} className="text-brand" />
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
                  Forgot Password
                </h2>

                <p
                  className="
                    mt-2
                    text-sm

                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Enter your registered email address
                </p>
              </div>

              {/* INPUT */}
              <div className="relative mt-7">
                <Mail
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2

                    text-gray-400
                  "
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full
                    h-14

                    rounded-2xl

                    border
                    border-black/10
                    dark:border-white/10

                    bg-transparent

                    pl-12
                    pr-4

                    text-black
                    dark:text-white

                    outline-none

                    focus:border-brand

                    transition-all
                  "
                />
              </div>

              {/* BUTTON */}
              <button
                onClick={handleSendOTP}
                disabled={loading}
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
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ForgotPasswordModal;
