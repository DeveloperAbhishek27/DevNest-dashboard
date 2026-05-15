"use client";

import { motion } from "framer-motion";

import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import ThemeToggle from "../ui/ThemeToggle";

import { useAuth } from "@/context/AuthContext";

const DashboardHeader = ({
  handleLogout,
  collapsed,
  setCollapsed,
  open,
  setOpen,
}) => {
  const { user } = useAuth();

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header
      className="
        sticky
        top-6
        z-20

        w-full
        h-20

        px-4
        sm:px-6

        rounded-3xl

        border
        border-black/10
        dark:border-white/10

        bg-white/80
        dark:bg-white/5

        backdrop-blur-[6px]

        flex
        items-center
        justify-between

        shadow-lg
      "
    >
      {/* BACKGROUND BLUR */}
      <div
        className="
          absolute
          bottom-0
          left-1/2
          -translate-x-1/2

          w-40
          h-40

          bg-purple-500/10

          blur-[100px]
          rounded-full

          pointer-events-none
        "
      />

      <div className="relative z-10 flex items-center gap-3">
        {/* DESKTOP COLLAPSE BUTTON */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            flex

            w-11
            h-11

            rounded-xl

            bg-black/5
            dark:bg-white/10

            border
            border-black/10
            dark:border-white/10

            items-center
            justify-center

            text-black
            dark:text-white

            transition-all
            duration-300
          "
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>

        {/* USER AVATAR */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
            w-12
            h-12

            rounded-full

            border-2
            border-dotted
            border-brand sm:hidden 

            bg-black/5
            dark:bg-white/10

            backdrop-blur-xl

            flex
            items-center
            justify-center

            text-base
            font-bold

            text-black
            dark:text-white

            shadow-lg
          "
        >
          {initial}
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative z-10 flex items-center gap-4">
        {/* THEME TOGGLE */}
        <ThemeToggle />

        {/* LOGOUT BUTTON */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleLogout}
          className="
            hidden
            md:flex

            items-center
            gap-2

            px-5
            py-2.5

            rounded-xl

            bg-brand
            text-white

            text-sm
            font-medium

            shadow-lg

            hover:opacity-90

            transition-all
            duration-300
          "
        >
          <LogOut size={18} />

          <span>Logout</span>
        </motion.button>
      </div>
    </header>
  );
};

export default DashboardHeader;
