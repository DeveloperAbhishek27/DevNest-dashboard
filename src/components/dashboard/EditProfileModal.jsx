"use client";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { X, Pencil } from "lucide-react";

import { fadeIn, fadeInUp } from "@/animations";

import { errorToast, successToast } from "../alert/notify";

import { useAuth } from "@/context/AuthContext";

import { useUpdateProfile } from "@/hooks/useUpdateProfile";

const EditProfileModal = ({ open, setOpen }) => {
  const { user, setUser } = useAuth();

  const { updateProfile, loading } = useUpdateProfile();

  const [name, setName] = useState("");

  const [mobile, setMobile] = useState("");

  const [imageFile, setImageFile] = useState(null);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");

      setMobile(user.mobile || "");

      setPreview(user.profilePicture || "");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updateProfile({
        name,
        mobile,
        imageFile,
      });

      setUser(response.user);

      successToast(response.message);

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

              {/* PROFILE IMAGE */}
              <div className="flex flex-col justify-center gap-4 items-center">
                {/* PROFILE IMAGE */}
                <div className="relative">
                  <div
                    className="
        w-24
        h-24
        sm:w-28
        sm:h-28
        rounded-full
        overflow-hidden
        border-2
        border-brand/55
        border-dotted
        bg-homeBg/10
        dark:bg-white/15
      "
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="
            w-full
            h-full
            flex
            items-center
            justify-center
            bg-black/10
            dark:bg-white/10
            text-2xl
            font-bold
            text-black
            dark:text-white
          "
                      >
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* EDIT ICON */}
                  <label
                    className="
        absolute
        bottom-1
        right-1

        w-8
        h-8

        rounded-full

        bg-brand
        text-white

        flex
        items-center
        justify-center

        cursor-pointer

        shadow-lg

        hover:scale-105
        active:scale-95

        transition-all
      "
                  >
                    <Pencil size={14} />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

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
                  disabled={loading}
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
                  {loading ? "Updating..." : "Update Profile"}
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
