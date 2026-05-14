"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        relative
        w-16
        h-9

        rounded-full

        bg-black/5
        dark:bg-white/10

        border
        border-black/10
        dark:border-white/10

        backdrop-blur-xl

        p-1

        transition-all duration-300
      "
    >
      <motion.div
        animate={{
          x: isDark ? 0 : 28,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="
          w-7
          h-7

          rounded-full

          bg-brand

          flex
          items-center
          justify-center

          shadow-lg
        "
      >
        {isDark ? (
          <Moon size={15} className="text-white" />
        ) : (
          <Sun size={15} className="text-white" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
