"use client";
import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { X } from "lucide-react";

import { fadeIn, fadeInUp } from "@/animations";
import api from "@/services/api";
import { errorToast, successToast } from "../alert/notify";
import { useAuth } from "@/context/AuthContext";

const EditProfileModal = ({ open, setOpen }) => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState("");

  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");

      setMobile(user.mobile || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.put(
        "/auth/update-profile",
        {
          name,
          mobile,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // INSTANT UI UPDATE
      setUser(response.data.user);

      // SUCCESS TOAST
      successToast(response.data.message);

      // CLOSE MODAL
      setOpen(false);
    } catch (error) {
      errorToast(error.response?.data?.message || "Update Failed");
    }
  };
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

              bg-black/70
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

      rounded-3xl

      bg-white
      dark:bg-[#161616]

      border
      border-black/10
      dark:border-white/10

      p-6

      shadow-2xl
    "
            >
              {/* CLOSE */}
              <button
                onClick={() => setOpen(false)}
                className="
        absolute
        top-4
        right-4

        text-gray-500
        hover:text-red-500

        transition-all
      "
              >
                <X size={20} />
              </button>

              {/* TITLE */}
              <h2 className="text-2xl font-bold text-black dark:text-white">
                Edit Profile
              </h2>

              <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                Update your personal information
              </p>

              {/* FORM */}
              <div className="mt-6 space-y-5">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
            w-full
            mt-2

            rounded-2xl

            border
            border-black/10
            dark:border-white/10

            bg-transparent

            px-4
            py-3

            outline-none

            text-black
            dark:text-white

            focus:border-brand
          "
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Mobile Number
                  </label>

                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    className="
            w-full
            mt-2

            rounded-2xl

            border
            border-black/10
            dark:border-white/10

            bg-transparent

            px-4
            py-3

            outline-none

            text-black
            dark:text-white

            focus:border-brand
          "
                  />
                </div>

                <button
                  onClick={handleUpdate}
                  className="
          w-full

          mt-3

          rounded-2xl

          bg-brand

          py-3

          font-semibold
          text-white

          hover:opacity-90

          transition-all
        "
                >
                  Update Profile
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
