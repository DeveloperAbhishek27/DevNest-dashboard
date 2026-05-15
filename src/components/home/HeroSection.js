"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import { ArrowRight, ShieldCheck, LayoutDashboard } from "lucide-react";

const MotionLink = motion(Link);

const HeroSection = () => {
  return (
    <section
      className="
        relative
        min-h-screen

        flex
        items-center

        overflow-hidden

        px-4
        sm:px-6
        lg:px-16

        transition-all
        duration-300

        bg-gradient-to-br
        from-[#f8fafc]
        via-white
        to-[#fde4c9]

        dark:from-homeBg
        dark:via-homeBg
        dark:to-shadowblue

        text-black
        dark:text-white
      "
    >
      {/* BLUR EFFECT */}
      <div
        className="
          absolute
          top-[-120px]
          right-[-100px]

          w-[280px]
          h-[280px]

          sm:w-[380px]
          sm:h-[380px]

          lg:w-[450px]
          lg:h-[450px]

          rounded-full

          bg-brand/20
          dark:bg-brand/30

          blur-[100px]
          sm:blur-[120px]
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10

          w-full
          max-w-6xl

          mx-auto

          
          pb-16

          pt-28
        
          lg:pb-0

          grid
          grid-cols-1
          lg:grid-cols-2

          gap-14
          lg:gap-16

          items-center
        "
      >
        {/* LEFT */}
        <div className="text-center sm:mt-0 mt-6 lg:text-left">
          {/* HEADING */}
          <h1
            className="
              mt-4

              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl

              font-black

              leading-tight
              tracking-tight

              fade-in-up
            "
          >
            Your Developer
            <span className="block text-brand">Dashboard.</span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-6

              max-w-2xl
              mx-auto
              lg:mx-0

              text-base
              sm:text-lg

              leading-8
              sm:leading-9

              fade-in-up-soft

              text-gray-600
              dark:text-gray-400
            "
          >
            Register your account, login securely, and access your personal
            developer dashboard inside CodeSphere.
          </p>

          {/* BUTTONS */}
          <div
            className="
              mt-9

              flex
              flex-col
              sm:flex-row

              items-center sm:justify-start justify-center
              lg:items-start

              gap-4
              sm:gap-5
            "
          >
            <MotionLink
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.05 }}
              href="/register"
              className="
                w-full
                sm:w-auto

                flex
                items-center
                justify-center
                gap-2

                px-7
                sm:px-8

                py-3.5
                sm:py-4

                rounded-3xl

                bg-brand
                text-white

                text-sm
                sm:text-base

                font-semibold

                shadow-lg

                transition-all
                duration-300
              "
            >
              Create Account
              <ArrowRight size={20} />
            </MotionLink>

            <MotionLink
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.05 }}
              href="/login"
              className="
                w-full
                sm:w-auto

                px-7
                sm:px-8

                py-3.5
                sm:py-4

                rounded-3xl

                text-center

                text-sm
                sm:text-base

                font-semibold

                border-2
                border-brand

                bg-black/5
                dark:bg-white/5

                hover:bg-black/10
                dark:hover:bg-white/10

                text-brand
                dark:text-brand

                transition-all
                duration-300
              "
            >
              Login
            </MotionLink>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <div
            className="
              w-full
              max-w-md

              p-5
              sm:p-7

              rounded-3xl

              fade-in-up

              bg-white/60
              dark:bg-white/10

              border
              border-black/10
              dark:border-white/10

              shadow-2xl
            "
          >
            {/* FEATURE CARDS */}
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2

                gap-4
                sm:gap-5
              "
            >
              {/* CARD */}
              <div
                className="
                  p-5

                  rounded-3xl

                  bg-white/70
                  dark:bg-homeBg

                  border
                  border-black/10
                  dark:border-white/10
                "
              >
                <LayoutDashboard size={28} className="text-brand" />

                <h3
                  className="
                    mt-4

                    text-lg
                    font-bold
                  "
                >
                  Dashboard
                </h3>

                <p
                  className="
                    mt-2

                    text-sm
                    leading-6

                    text-gray-600
                    dark:text-gray-400
                  "
                >
                  Access your secure profile dashboard.
                </p>
              </div>

              {/* CARD */}
              <div
                className="
                  p-5

                  rounded-3xl

                  bg-white/70
                  dark:bg-homeBg

                  border
                  border-black/10
                  dark:border-white/10
                "
              >
                <ShieldCheck size={28} className="text-brand" />

                <h3
                  className="
                    mt-4

                    text-lg
                    font-bold
                  "
                >
                  Secure Auth
                </h3>

                <p
                  className="
                    mt-2

                    text-sm
                    leading-6

                    text-gray-600
                    dark:text-gray-400
                  "
                >
                  OTP verification and protected routes.
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <MotionLink
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.03 }}
              href="/login"
              className="
                w-full

                mt-6
                sm:mt-7

                py-3.5
                sm:py-4

                flex
                items-center
                justify-center

                rounded-3xl

                bg-brand
                text-white

                text-sm
                sm:text-base

                font-semibold

                shadow-lg

                transition-all
                duration-300
              "
            >
              Go To Dashboard
            </MotionLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
