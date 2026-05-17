"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  User,
  NotebookPen,
  Gamepad2,
  Bot,
  Settings,
  X,
} from "lucide-react";

import { useState } from "react";
import { fadeInUp, staggerContainer } from "@/animations";

import { useAuth } from "@/context/AuthContext";
import SettingsDropdown from "./SettingsDropdown";

const DashboardSidebar = ({
  handleLogout,
  setCollapsed,
  collapsed,
  handleDeleteAccount,
  open,
  setOpen,
}) => {
  const { user } = useAuth();

  const pathname = usePathname();
  const [showSettings, setShowSettings] = useState(false);
  const navLinks = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/dashboard",
    },

    {
      title: "Profile",
      icon: <User size={20} />,
      href: "/profile",
    },

    {
      title: "Keep Notes",
      icon: <NotebookPen size={20} />,
      href: "/notes",
    },
    {
      title: "Mini Games",
      icon: <Gamepad2 size={20} />,
      href: "/games/tic-tac-toe",
    },
    {
      title: "Dev AI",
      icon: <Bot size={20} />,
      href: "/dev-ai",
    },
  ];

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            bg-black/50
            backdrop-blur-sm
            z-40
            lg:hidden
          "
        />
      )}

      {/* SIDEBAR */}
      <motion.aside
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className={`
          fixed
          top-0
          left-0
          z-50

          h-screen

          bg-white
          dark:bg-homeBg

          border-r
          border-homeBg/20
          dark:border-white/10

          flex
          flex-col
          justify-between
            overflow-visible

       

          ${collapsed ? " hidden sm:flex lg:w-[75px] px-3 py-5" : "w-[280px] px-5 py-6"}

          ${open ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >
        {/* TOP */}
        <div className="relative z-10">
          <div
            className={`
    flex
    items-center
    transition-all
    duration-300

    ${collapsed ? "justify-center" : "gap-3"}
  `}
          >
            {/* PROFILE IMAGE */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`
      overflow-hidden
      border-2
      border-dotted
      border-brand/70 bg-white/70
     dark:bg-white/10 shadow-2xl
      rounded-full
      flex-shrink-0

      ${collapsed ? "w-12 h-12" : "w-20 h-20"}
    `}
            >
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="profile"
                  className="
          w-full
          h-full
          object-cover
        "
                />
              ) : (
                <div
                  className="
          w-full
          h-full
          bg-black/5
          dark:bg-white/10
          flex
          items-center
          justify-center
          text-black
          dark:text-white
          font-bold
          text-xl
        "
                >
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </motion.div>

            {/* USER INFO */}
            {!collapsed && (
              <div>
                <h1 className=" text-2xl font-extrabold sm:text-xl  text-brand dark:text-white tracking-wide">
                  {user?.name}
                </h1>

                <p className="text-sm mt-1 text-gray-700 dark:text-gray-400 font-medium">
                  Welcome back
                </p>
              </div>
            )}
          </div>
          {/* HEADER */}
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!collapsed && (
              <div className="relative w-full">
                {/* BG BLOB */}
                <div
                  className="
                    absolute
                    inset-0

                    bg-cover
                    bg-center
                    bg-no-repeat

                    -left-24
                    -top-56
                    -z-20

                    h-[400px]
                    w-[300px]

                    opacity-30

                    pointer-events-none
                  "
                  style={{
                    backgroundImage: "url('/Blob/blob-shape.svg')",
                  }}
                />

                <div className="flex relative items-center justify-between gap-3">
                  {/* CLOSE BUTTON */}
                  <button
                    onClick={() => {
                      setOpen(false);
                      setCollapsed(true);
                    }}
                    className={` 
                      lg:hidden
                      flex 
                      items-center
                      justify-center absolute -top-16 -right-2
                      w-10
                      h-10
                      rounded-xl
                      bg-black/5
                      dark:bg-white/10
                      border
                      border-black/10
                      dark:border-white/10
                      text-black
                      dark:text-white
                    `}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* NAVIGATION */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className=" sm:mt-8 mt-14 space-y-4"
          >
            {navLinks.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={item.href}
                  onClick={() => {
                    setOpen(false);

                    if (window.innerWidth < 1024) {
                      setCollapsed(true);
                    }
                  }}
                  className={`
                    group
                    relative

                    flex
                    items-center

                    transition-all
                    duration-300

                    ${
                      collapsed
                        ? "justify-center mx-auto w-14 h-14"
                        : "gap-4 px-3 py-2 rounded-xl bg-homeBg/10 dark:bg-white/10"
                    }

                    ${
                      pathname === item.href
                        ? "text-brand"
                        : "text-black dark:text-white"
                    }
                  `}
                >
                  {/* ICON */}
                  <div
                    className="
                      relative
                      z-10

                      flex
                      items-center
                      justify-center

                      w-11
                      h-11

                      rounded-xl

                      bg-homeBg
                      dark:bg-[#18181b]

                      border
                      border-white/[0.03]

                      dark:shadow-[inset_-1px_-1px_1px_rgba(255,255,255,0.05),inset_1px_1px_2px_rgba(0,0,0,0.9),0_6px_14px_rgba(0,0,0,0.45)]
                    "
                  >
                    <div
                      className={`
                        transition-all
                        duration-300

                        ${
                          pathname === item.href
                            ? "text-brand"
                            : "text-white dark:text-white"
                        }

                        group-hover:text-brand
                        group-hover:scale-110
                      `}
                    >
                      {item.icon}
                    </div>
                  </div>

                  {/* TEXT */}
                  {!collapsed && (
                    <div className="relative z-10 flex flex-col">
                      <span
                        className={`
                          text-sm
                          font-semibold
                          tracking-wide

                          ${
                            pathname === item.href
                              ? "text-brand"
                              : "text-black dark:text-white"
                          }
                        `}
                      >
                        {item.title}
                      </span>
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="relative">
          {/* SETTINGS BUTTON */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setShowSettings((prev) => !prev);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
      flex
      items-center
      justify-center

      rounded-2xl

      bg-homeBg
      dark:bg-white/10

      hover:bg-brand

      border
      border-white/10

      text-white
      font-medium

      transition-all
      duration-300

      backdrop-blur-xl

      ${collapsed ? "w-12 h-12 mx-auto" : "w-full gap-3 py-3 px-4"}
    `}
          >
            <Settings size={20} />

            {!collapsed && <span>Settings</span>}
          </motion.button>

          {showSettings && (
            <SettingsDropdown
              setShowSettings={setShowSettings}
              showSettings={showSettings}
              handleDeleteAccount={handleDeleteAccount}
              collapsed={collapsed}
              handleLogout={handleLogout}
            />
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default DashboardSidebar;
