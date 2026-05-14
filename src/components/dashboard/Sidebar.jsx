"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  User,
  NotebookPen,
  LogOut,
  Menu,
  PanelLeftClose,
} from "lucide-react";

import { useState } from "react";

import { fadeInUp, staggerContainer } from "@/animations";
import { useAuth } from "@/context/AuthContext";

const DashboardSidebar = ({ handleLogout, collapsed, setCollapsed }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
  ];

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-50 w-11 h-11 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white"
      >
        <Menu size={22} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <motion.aside
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 z-50 h-screen bg-white
dark:bg-homeBg border-r border-homeBg/20 dark:border-white/10 backdrop-blur-2xl p-6 flex flex-col justify-between overflow-hidden

transition-[width,transform]
duration-150
ease-out
will-change-transform

${collapsed ? "w-[85px]" : "w-[280px]"}

${open ? "translate-x-0" : "-translate-x-full"}

lg:translate-x-0
`}
      >
        {/* TOP */}
        <div className="relative z-10">
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!collapsed && (
              <div className=" relative ">
                <div
                  className="
      absolute inset-0
      bg-cover -left-24 -z-20 -top-56 bg-center h-[400px] w-[300px] bg-no-repeat
      opacity-30
      
      pointer-events-none
    "
                  style={{
                    backgroundImage: "url('/Blob/blob-shape.svg')",
                  }}
                />
                <h1 className="text-2xl   z-20 font-black text-brand dark:text-white tracking-wide">
                  {user?.name}
                </h1>

                <p className="text-xs mt-1 text-gray-700 font-semibold dark:text-gray-400">
                  Welcome back
                </p>
              </div>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex p-3 rounded-xl bg-homeBg dark:bg-white/10 border border-white/10 items-center justify-center text-white dark-hover:bg-brand/20 "
            >
              <PanelLeftClose size={18} />
            </button>
          </div>

          {/* NAVIGATION */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-20 space-y-4"
          >
            {navLinks.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={item.href}
                  className={`group relative flex items-center  transition-all duration-300

        ${collapsed ? "justify-center mx-auto w-14 h-14 pr-4  " : "gap-4 dark:bg-white/15 bg-homeBg/10 px-3 rounded-3xl py-3  "}
        ${
          pathname === item.href ? "text-brand" : "text-black dark:text-white"
        } `}
                >
                  {/* ICON */}
                  <div
                    className={`relative z-10 flex items-center justify-center
  transition-all duration-300

  ${collapsed ? "p-3" : "w-11 h-11"}

  rounded-2xl

  bg-homeBg dark:bg-[#18181b]

  border border-white/[0.03]

  dark:shadow-[inset_-1px_-1px_1px_rgba(255,255,255,0.05),inset_1px_1px_2px_rgba(0,0,0,0.9),0_6px_14px_rgba(0,0,0,0.45),0_-2px_6px_rgba(255,255,255,0.03)]

  
  `}
                  >
                    {/* ICON */}
                    <div
                      className={`
    relative
    z-10
    flex
    items-center
    justify-center

    transition-all
    duration-300

    ${collapsed ? "p-1" : "w-11 h-11"}

    rounded-2xl

    bg-homeBg
    dark:bg-[#18181b]
  `}
                    >
                      <div
                        className={`
      transition-all
      duration-300

      ${pathname === item.href ? "text-brand" : "text-white dark:text-white"}

      group-hover:text-brand
      group-hover:scale-110
    `}
                      >
                        {item.icon}
                      </div>
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

    ${pathname === item.href ? "text-brand" : "text-black dark:text-white"}
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

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className={`relative z-10 flex items-center rounded-2xl bg-homeBg dark:bg-brand/30 hover:bg-brand  border border-red-500/20 text-white font-medium

          ${collapsed ? "justify-center py-4" : "justify-center gap-3 py-3"}
          `}
        >
          <LogOut size={20} />

          {!collapsed && <span>Logout</span>}
        </motion.button>
      </motion.aside>
    </>
  );
};

export default DashboardSidebar;
