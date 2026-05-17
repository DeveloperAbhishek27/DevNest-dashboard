"use client";

import { motion } from "framer-motion";

import { useEffect, useState, useRef } from "react";

import { Trash2, LogOut, AlertTriangle, Mail, X } from "lucide-react";

const SettingsDropdown = ({
  showSettings,
  setShowSettings,
  collapsed,
  handleLogout,
  handleDeleteAccount,
}) => {
  const dropdownRef = useRef(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [email, setEmail] = useState("");

  // OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDeleteModal) return;

      // DROPDOWN KE BAHAR CLICK
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowSettings, showDeleteModal]);

  if (!showSettings) return null;

  return (
    <>
      {/* DROPDOWN */}
      <motion.div
        ref={dropdownRef}
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22 }}
        className={`
          absolute
          z-[999]

          ${
            collapsed
              ? "left-[70px] w-[260px] bottom-8"
              : "bottom-16 left-0 w-full"
          }

          rounded-2xl
          bg-homeBg
          border
          border-white/10
          dark:border-white/15
          overflow-visible
          py-3
          px-2
        `}
      >
        {/* SIGN OUT */}
        <button
          onClick={handleLogout}
          className="
            group
            relative
            mb-3
            flex
            items-center
            gap-4
            w-full
            rounded-2xl
            px-3
            py-2
            overflow-hidden
            transition-all
            duration-300
            hover:bg-white/30
            dark:bg-white/20
            bg-white/20
          "
        >
          <div
            className="
              relative
              z-10
              flex
              items-center
              justify-center
              w-12
              h-12
              rounded-2xl
              bg-[#18181b]
              border
              border-white/5
              shadow-[inset_-1px_-1px_1px_rgba(255,255,255,0.05),inset_1px_1px_2px_rgba(0,0,0,0.9),0_6px_14px_rgba(0,0,0,0.45)]
            "
          >
            <LogOut
              size={19}
              strokeWidth={2}
              className="
                text-brand
                transition-all
                duration-300
                group-hover:scale-110
              "
            />
          </div>

          <div className="relative z-10 flex flex-col text-left">
            <span
              className="
                text-[15px]
                font-semibold
                tracking-wide
                text-white
              "
            >
              Sign Out
            </span>
          </div>
        </button>

        {/* DELETE ACCOUNT */}
        <button
          onClick={() => setShowDeleteModal(true)}
          className="
            group
            relative
            flex
            items-center
            gap-4
            w-full
            rounded-2xl
            px-3
            py-2
            overflow-hidden
            transition-all
            duration-300
            hover:bg-white/30
            dark:bg-white/20
            bg-white/20
          "
        >
          <div
            className="
              relative
              z-10
              flex
              items-center
              justify-center
              w-12
              h-12
              rounded-2xl
              bg-[#18181b]
              border
              border-white/5
              shadow-[inset_-1px_-1px_1px_rgba(255,255,255,0.05),inset_1px_1px_2px_rgba(0,0,0,0.9),0_6px_14px_rgba(0,0,0,0.45)]
            "
          >
            <Trash2
              size={19}
              strokeWidth={2}
              className="
                text-brand
                transition-all
                duration-300
                group-hover:scale-110
              "
            />
          </div>

          <div className="relative z-10 flex flex-col text-left">
            <span
              className="
                text-[15px]
                font-semibold
                tracking-wide
                text-white
              "
            >
              Delete Account
            </span>
          </div>
        </button>
      </motion.div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/80
          "
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="
    relative
    w-[90%]
    max-w-md
    rounded-3xl
    bg-homeBg
    border
    border-brand/20
    p-6
    shadow-brand
    overflow-hidden
  "
          >
            {/* TOP ICON */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex gap-3 items-center">
                {" "}
                <div
                  className="
        w-14
        h-14
        rounded-2xl
        bg-red-500/10
        border
        border-red-500/20
        flex
        items-center
        justify-center
      "
                >
                  <Trash2 className="text-red-400 w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Delete Account
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setEmail("");
                }}
                className="
        w-10
        h-10
        rounded-xl
        bg-white/5
        hover:bg-white/10
        flex
        items-center
        justify-center
        transition-all
      "
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div
              className="
      mt-4
      rounded-2xl
      bg-red-500/10
      border
      border-red-500/20
      p-3
      flex
      gap-3 mb-6
    "
            >
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />

              <p className="text-xs text-red-200 leading-relaxed">
                Deleting your account will remove all your saved data, history,
                and access permanently.
              </p>
            </div>
            {/* INPUT */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
        w-full
        rounded-2xl
        bg-white/10
        border
        border-white/10
        pl-12
        pr-4
        py-3
        text-white
        placeholder:text-gray-500
        outline-none
        focus:border-red-400
        focus:bg-white/15
        transition-all
      "
              />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">
              {/* CANCEL */}
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setEmail("");
                }}
                className="
        flex-1
        rounded-2xl
        bg-white/10
        py-3
        text-white
        font-medium
        hover:bg-white/20
        transition-all
      "
              >
                Cancel
              </button>

              {/* DELETE */}
              <button
                onClick={() => {
                  handleDeleteAccount(email);

                  setShowDeleteModal(false);

                  setEmail("");
                }}
                className="
        flex-1
        rounded-2xl
        bg-red-600
        py-3
        text-white
        font-semibold
        flex
        items-center
        justify-center
        gap-2
        hover:bg-red-700
        transition-all
      "
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default SettingsDropdown;
