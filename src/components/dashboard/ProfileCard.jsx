"use client";

import { useState } from "react";
import { User2, Eye, Mail, Phone, Globe, Pencil } from "lucide-react";
import ProfileImageModal from "./ProfileImageModal";
import EditProfileModal from "./EditProfileModal";
import { useAuth } from "@/context/AuthContext";

const ProfileCard = ({ setUser }) => {
  const { user } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  return (
    <>
      <div
        className="
          relative
          max-w-3xl
          w-full
          rounded-3xl
          border border-homeBg/10
          bg-gradient-to-br from-white/90 to-white/70
          dark:from-white/5 dark:to-white/0
          
          shadow-lg  dark:shadow-2xl dark:border-white/10
           p-6 sm:p-8
          transition-all
        "
      >
        {/* EDIT BUTTON */}
        <button
          onClick={() => setOpenEdit(true)}
          className="
            absolute
            -top-4 -right-4
            sm:top-6 sm:right-6
            w-14 h-14
            rounded-3xl
            bg-brand
            text-white
            flex items-center justify-center
            shadow-lg
            hover:scale-105
            active:scale-95
            transition-all
          "
        >
          <Pencil size={18} />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-5 sm:gap-10">
          <div className="relative">
            <div
              className="
      w-24 p-2 h-24
      sm:w-32 sm:h-32
      overflow-hidden
      rounded-full
      bg-gradient-to-br
      from-brand/20
      to-brand/5
      dark:bg-white/15
      flex border-4 border-brand/10
      items-center
      justify-center
      text-brand
      text-3xl
      font-black
      shadow-inner
    "
            >
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{user?.name?.charAt(0)?.toUpperCase()}</span>
              )}
            </div>

            {/* VIEW BUTTON */}
            {user?.profilePicture && (
              <button
                onClick={() => setOpenImage(true)}
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

        shadow-lg

        hover:scale-110
        active:scale-95

        transition-all
      "
              >
                <Eye size={16} />
              </button>
            )}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-black dark:text-white tracking-tight">
              {user?.name}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Active Developer Account
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />

        {/* DETAILS GRID */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition">
            <Mail className="text-brand" size={18} />
            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
              {user?.email}
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition">
            <Phone className="text-brand" size={18} />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {user?.mobile}
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition">
            <Globe className="text-brand" size={18} />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {user?.country}
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition">
            <User2 className="text-brand" size={18} />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              ID: {user?._id?.slice(0, 10)}...
            </span>
          </div>
        </div>
      </div>

      <EditProfileModal
        open={openEdit}
        setOpen={setOpenEdit}
        user={user}
        setUser={setUser}
      />
      <ProfileImageModal
        open={openImage}
        setOpen={setOpenImage}
        image={user?.profilePicture}
      />
    </>
  );
};

export default ProfileCard;
