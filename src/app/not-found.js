"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import { TriangleAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section
      className="
        min-h-screen

        flex
        items-center
        justify-center

        px-6

        bg-[#f8fafc]
        dark:bg-homeBg

        transition-all
        duration-300

        overflow-hidden
        relative
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          top-[-120px]
          right-[-120px]

          w-[300px]
          h-[300px]

          rounded-full

          bg-brand/10

          blur-[120px]
        "
      />

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          relative
          z-10

          w-full
          max-w-lg

          rounded-[32px]

          border
          border-black/5
          dark:border-white/10

          bg-white/80
          dark:bg-white/[0.03]

          backdrop-blur-2xl

          shadow-xl

          p-8
          md:p-10

          text-center
        "
      >
        {/* ICON */}
        <div
          className="
            mx-auto

            w-20
            h-20

            rounded-2xl

            bg-brand/10

            border
            border-brand/20

            flex
            items-center
            justify-center
          "
        >
          <TriangleAlert size={38} className="text-brand" />
        </div>

        {/* 404 */}
        <h1
          className="
            mt-6

            text-6xl
            md:text-7xl

            font-black

            tracking-tight

            text-black
            dark:text-white
          "
        >
          404
        </h1>

        {/* TITLE */}
        <h2
          className="
            mt-3

            text-2xl
            md:text-3xl

            font-bold

            text-black
            dark:text-white
          "
        >
          Page Not Found
        </h2>

        {/* TEXT */}
        <p
          className="
            mt-4

            text-sm
            md:text-base

            leading-7

            text-gray-600
            dark:text-gray-400
          "
        >
          The page you are trying to access does not exist or has been moved.
        </p>

        {/* BUTTON */}
        <Link
          href="/"
          className="
            mt-8

            inline-flex
            items-center
            gap-2

            rounded-2xl

            bg-brand

            px-6
            py-3

            text-sm
            font-semibold
            text-white

            shadow-lg
            shadow-brand/20

            hover:scale-105

            transition-all
            duration-300
          "
        >
          <ArrowLeft size={18} />
          Back To Home
        </Link>
      </motion.div>
    </section>
  );
}
