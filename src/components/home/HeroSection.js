import Link from "next/link";

import { ArrowRight, ShieldCheck, LayoutDashboard } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="
        min-h-screen
        relative
        flex
        items-center
        overflow-hidden
        px-6
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
      {/* BLUR EFFECTS */}
      <div
        className="
          absolute
          top-[-150px]
          right-[-120px]
          w-[450px]
          h-[450px]
          rounded-full
          bg-brand/20
          dark:bg-brand/30
          blur-[120px]
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          max-w-6xl
          mx-auto
          w-full
          pt-24
          lg:pt-10

          grid
          lg:grid-cols-2
          gap-16
          items-center
        "
      >
        {/* LEFT SIDE */}
        <div>
          {/* HEADING */}
          <h1
            className="
              mt-8
              text-5xl
              lg:text-7xl
              font-black
              leading-tight
              tracking-tight
            "
          >
            Your Developer
            <span className="block text-brand">Dashboard.</span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-7
              max-w-2xl
              text-lg
              leading-9

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
              mt-10
              flex
              flex-col
              sm:flex-row
              gap-5
            "
          >
            <Link
              href="/register"
              className="
                flex
                items-center
                justify-center
                gap-2

                px-8
                py-4

                rounded-2xl

                bg-brand
                text-white

                font-semibold

                shadow-lg

                hover:opacity-90
                hover:scale-105

                transition-all
                duration-300
              "
            >
              Create Account
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/login"
              className="
                px-8
                py-4

                rounded-2xl

                text-center
                font-semibold

                border-2
                border-black/10
                dark:border-white/10 dark:border-brand dark:text-brand

                bg-black/5
                dark:bg-white/5

                hover:bg-black/10
                dark:hover:bg-white/10

                backdrop-blur-xl

                transition-all
                duration-300
              "
            >
              Login
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:flex justify-center">
          <div
            className="
              w-full
              max-w-md

              p-7

              rounded-[32px]

              bg-white/60
              dark:bg-white/5

              border
              border-black/10
              dark:border-white/10

              backdrop-blur-2xl

              shadow-2xl

              transition-all
              duration-300
            "
          >
            {/* FEATURE CARDS */}
            <div
              className="
                grid
                grid-cols-2
                gap-5
                mt-8
              "
            >
              {/* CARD */}
              <div
                className="
                  p-5
                  rounded-2xl

                  bg-white/70
                  dark:bg-homeBg

                  border
                  border-black/10
                  dark:border-white/10

                  transition-all
                  duration-300
                "
              >
                <LayoutDashboard size={28} className="text-brand" />

                <h3 className="mt-4 font-bold text-lg">Dashboard</h3>

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
                  rounded-2xl

                  bg-white/70
                  dark:bg-homeBg

                  border
                  border-black/10
                  dark:border-white/10

               

                  transition-all
                  duration-300
                "
              >
                <ShieldCheck size={28} className="text-brand" />

                <h3 className="mt-4 font-bold text-lg">Secure Auth</h3>

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
            <Link
              href="/login"
              className="
                w-full
                mt-7
                py-4

                flex
                items-center
                justify-center

                rounded-2xl

                bg-brand
                text-white

                font-semibold

                shadow-lg transition-all
                duration-300
              "
            >
              Go To Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
