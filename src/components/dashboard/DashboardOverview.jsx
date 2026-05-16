"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  FileText,
  Loader,
  ArrowUpRight,
  Layers3,
  CheckCircle2,
  LayoutDashboard,
  NotebookPen,
  User,
  Bot,
  Gamepad2,
  Sparkles,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import useNotes from "@/hooks/useNotes";

const DashboardOverview = () => {
  const { user } = useAuth();

  const { notes, loading } = useNotes();

  const quickLinks = [
    {
      title: "Profile",
      icon: (
        <User
          size={20}
          strokeWidth={3}
          className="text-blue-500 dark:text-blue-400"
        />
      ),
      href: "/profile",
      color: "from-blue-500/20 to-blue-500/5",
    },

    {
      title: "Notes",
      icon: (
        <NotebookPen
          size={20}
          strokeWidth={3}
          className="text-yellow-500 dark:text-yellow-400"
        />
      ),
      href: "/notes",
      color: "from-yellow-500/20 to-yellow-500/5",
    },

    {
      title: "Mini Games",

      icon: (
        <Gamepad2
          strokeWidth={3}
          size={20}
          className="text-pink-500 dark:text-pink-400"
        />
      ),
      href: "/games",
      color: "from-pink-500/20 to-pink-500/5",
    },

    {
      title: "Dev AI",
      icon: (
        <Bot
          size={20}
          strokeWidth={3}
          className="text-green-500 dark:text-green-400"
        />
      ),
      href: "/dev-ai",
      color: "from-green-500/20 to-green-500/5",
    },
  ];

  return (
    <section className="relative pb-10">
      {/* TOP BLUR */}
      <div
        className="
          absolute
          -top-10
          right-0

          w-52
          h-52

          bg-brand/10

          blur-[120px]
          rounded-full

          pointer-events-none
        "
      />

      {/* HEADER */}
      <div className="pb-10 pt-5 relative z-10">
        <div>
          <h1
            className="
             text-5xl
              sm:flex
              gap-6
              fade-in-up
              flex-row
              lg:items-center
              lg:justify-start
              font-black
              text-black
              dark:text-white
            "
          >
            Welcome Back,
            <span className="block mt-1 text-brand sm:text-4xl text-6xl font-black uppercase">
              {user?.name}
            </span>
          </h1>

          <p
            className="
              mt-4
              max-w-2xl
              text-sm
              sm:text-base
              leading-7
              text-gray-600
              dark:text-gray-400
              fade-in-up
            "
          >
            Track your notes, manage your workflow, and access your developer
            dashboard in one place.
          </p>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="mb-10 fade-in-up">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="text-brand" size={20} />

          <h2 className="text-lg font-bold text-black dark:text-white">
            Quick Access
          </h2>
        </div>

        <div
          className="
            grid
            grid-cols-4
            sm:grid-cols-4
            lg:grid-cols-4
            gap-2
            sm:gap-4
          "
        >
          {quickLinks.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className=" fade-in-up "
            >
              <Link
                href={item.href}
                className="
        relative
        overflow-hidden

        flex
        items-center
        gap-2

        rounded-2xl

        border
        border-black/10
        dark:border-white/10

        bg-white
        dark:bg-white/5

        py-2 px-2
        sm:py-3 sm:px-4

        shadow-md

      "
              >
                <div
                  className={`
          absolute
          inset-0
          opacity-40
          bg-gradient-to-br ${item.color}
        `}
                />
                <div
                  className="
          relative
          z-10

          w-14
          h-14
         

          rounded-xl

          bg-black/5
          dark:bg-white/10

          flex
          items-center
          justify-center

          text-brand

          backdrop-blur-[1px]
          shrink-0
        "
                >
                  {item.icon}
                </div>

                {/* TEXT */}
                <div className="relative hidden sm:block z-10">
                  <h3 className="text-xs sm:text-sm font-semibold text-black dark:text-white">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-5
          mt-12
        "
      >
        {/* NOTES CARD */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25 }}
          className="
            relative
            fade-in-up
            overflow-hidden
            rounded-3xl
            border
            border-black/10
            dark:border-white/10
            bg-white
            dark:bg-white/5
            p-6
            shadow-lg
          "
        >
          <div
            className="
              absolute
              -top-10
              -right-10
              w-32
              h-32
              bg-brand/10
              blur-3xl
              rounded-full
            "
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-14
                  h-14
                  rounded-2xl
                  bg-brand/10
                  text-brand
                "
              >
                <FileText size={26} />
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-1
                  text-sm
                  font-medium
                  text-green-500
                "
              >
                <ArrowUpRight size={16} />
                Live
              </div>
            </div>

            <div className="mt-8">
              <h2
                className="
                  text-5xl
                  font-black
                  text-black
                  dark:text-white
                "
              >
                {loading ? (
                  <Loader className="animate-spin" size={32} />
                ) : (
                  notes?.length || 0
                )}
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  font-medium
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Total Notes Created
              </p>
            </div>
          </div>
        </motion.div>

        {/* PROJECTS */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25 }}
          className="
            rounded-3xl
            fade-in-up
            border
            border-black/10
            dark:border-white/10
            bg-white
            dark:bg-white/5
            p-6
            shadow-lg
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              w-14
              h-14
              rounded-2xl
              bg-blue-500/10
              text-blue-500
            "
          >
            <Layers3 size={26} />
          </div>

          <div className="mt-8">
            <h2
              className="
                text-4xl
                font-black
                text-gray-300
                dark:text-gray-500
              "
            >
              —
            </h2>

            <p
              className="
                mt-2
                text-sm
                font-medium
                text-gray-500
                dark:text-gray-400
              "
            >
              Projects Module Coming Soon
            </p>
          </div>
        </motion.div>

        {/* TASKS */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25 }}
          className="
            rounded-3xl
            fade-in-up
            border
            border-black/10
            dark:border-white/10
            bg-white
            dark:bg-white/5
            p-6
            shadow-lg
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              w-14
              h-14
              rounded-2xl
              bg-green-500/10
              text-green-500
            "
          >
            <CheckCircle2 size={26} />
          </div>

          <div className="mt-8">
            <h2
              className="
                text-4xl
                font-black
                text-gray-300
                dark:text-gray-500
              "
            >
              —
            </h2>

            <p
              className="
                mt-2
                text-sm
                font-medium
                text-gray-500
                dark:text-gray-400
              "
            >
              Task Management Coming Soon
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardOverview;
