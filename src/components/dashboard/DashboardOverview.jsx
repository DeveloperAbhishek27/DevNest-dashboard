"use client";

import { motion } from "framer-motion";

import {
  FileText,
  Loader,
  ArrowUpRight,
  Layers3,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import useNotes from "@/hooks/useNotes";

const DashboardOverview = () => {
  const { user } = useAuth();

  const { notes, loading } = useNotes();

  return (
    <section className="relative">
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
      <div className="py-10">
        {/* LEFT */}
        <div>
          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
               sm:flex gap-6 fade-in-up
flex-row
          
          lg:items-center
          lg:justify-start
              font-black

             

              text-black
              dark:text-white
            "
          >
            Welcome Back,
            <span className="block mt-1 text-brand  text-4xl font-extrabold uppercase">
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
              dark:text-gray-400 fade-in-up
            "
          >
            Track your notes, manage your workflow, and access your developer
            dashboard in one place.
          </p>
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
            relative fade-in-up

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
          {/* BG EFFECT */}
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
            rounded-3xl fade-in-up

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
            rounded-3xl fade-in-up

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
