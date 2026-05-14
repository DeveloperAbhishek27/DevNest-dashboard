"use client";

import Link from "next/link";

import ThemeToggle from "../ui/ThemeToggle";

import { Code2, Menu, X } from "lucide-react";

import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Register",
      path: "/register",
    },
    {
      name: "Login",
      path: "/login",
    },
  ];

  return (
    <nav className="w-full fixed top-6 z-50 px-4">
      <div
        className="
          max-w-6xl
          mx-auto
          px-6
          h-[70px]

          rounded-3xl

          bg-white/90
          dark:bg-[#27282a]/90

          backdrop-blur-xl

          border border-black/10
          dark:border-white/10

          shadow-lg

          flex
          items-center
          justify-between

          transition-all duration-300
        "
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div
            className="
              w-10
              h-10

              rounded-xl

              bg-brand

              flex
              items-center
              justify-center

              shadow-lg
            "
          >
            <Code2 className="text-white" size={22} />
          </div>

          <h2
            className="
              text-xl
              font-black
              tracking-wide

              text-black
              dark:text-white
            "
          >
            DevNest
          </h2>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex gap-6 pr-4 items-center">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                className="
                  relative

                  text-black
                  dark:text-white

                  font-medium

                  hover:text-brand

                  transition-all
                  duration-300

                  after:absolute
                  after:left-0
                  after:-bottom-1

                  after:h-[1.5px]
                  after:w-0

                  after:bg-brand

                  after:transition-all
                  after:duration-300

                  hover:after:w-full
                "
              >
                {link.name}
              </Link>
            ))}
          </div>

          <ThemeToggle />
        </div>

        {/* MOBILE RIGHT */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />

          <button
            onClick={() => setOpen(!open)}
            className="
              text-black
              dark:text-white
            "
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div
          className="
            md:hidden

            mt-4

            max-w-6xl
            mx-auto

            rounded-3xl

            bg-white/90
            dark:bg-[#27282a]/95

            backdrop-blur-xl

            border border-black/10
            dark:border-white/10

            shadow-lg

            p-6
          "
        >
          <div className="flex flex-col gap-5">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                onClick={() => setOpen(false)}
                className="
                  text-black
                  dark:text-white

                  hover:text-brand

                  font-medium

                  transition-all
                  duration-300
                "
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
