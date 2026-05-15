"use client";

import Link from "next/link";

import ThemeToggle from "../ui/ThemeToggle";

import { Code2, Menu, X, House, UserPlus, LogIn } from "lucide-react";

import { useState } from "react";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <House size={18} />,
    },
    {
      name: "Register",
      path: "/register",
      icon: <UserPlus size={18} />,
    },
    {
      name: "Login",
      path: "/login",
      icon: <LogIn size={18} />,
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
          <div className="flex gap-3 pr-4 items-center">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.path;

              return (
                <Link
                  key={index}
                  href={link.path}
                  className={`
                    relative

                    flex
                    items-center
                    gap-2

                    px-4
                    py-2

                    rounded-xl

                    font-medium

                    transition-all
                    duration-300

                    ${
                      isActive
                        ? `
                          bg-brand
                          text-white
                          shadow-lg
                        `
                        : `
                          text-black
                          dark:text-white

                          hover:bg-black/5
                          dark:hover:bg-white/10

                          hover:text-brand
                        `
                    }
                  `}
                >
                  {link.icon}

                  <span>{link.name}</span>
                </Link>
              );
            })}
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
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.path;

              return (
                <Link
                  key={index}
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className={`
                    flex
                    items-center
                    gap-3

                    px-4
                    py-3

                    rounded-2xl

                    font-medium

                    transition-all
                    duration-300

                    ${
                      isActive
                        ? `
                          bg-brand
                          text-white
                        `
                        : `
                          text-black
                          dark:text-white

                          hover:bg-black/5
                          dark:hover:bg-white/10

                          hover:text-brand
                        `
                    }
                  `}
                >
                  {link.icon}

                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
