"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, fadeInUp } from "@/animations";

const ViewNoteModal = ({ note, setNote }) => {
  return (
    <AnimatePresence>
      {note && (
        <>
          {/* BACKDROP */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setNote(null)}
            className="fixed inset-0 bg-black/70 z-50 "
          />

          {/* CENTER WRAPPER */}
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="
                relative

                w-full
                max-w-2xl

                max-h-[85vh]
                overflow-y-auto

                rounded-3xl

                bg-white
                dark:bg-[#0b0f1a]

                border
                border-white/10

                shadow-[0_20px_60px_rgba(0,0,0,0.5)]

                p-6 sm:p-8
              "
            >
              {/* TOP BAR */}
              <div className="flex items-start justify-between gap-4">
                {/* TITLE */}
                <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white leading-tight">
                  {note.title}
                </h2>

                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setNote(null)}
                  className="
                    flex
                    items-center
                    justify-center

                    w-10
                    h-10

                    rounded-xl

                    bg-black/5
                    dark:bg-white/10

                    text-gray-500
                    hover:text-red-500

                    transition-all
                  "
                >
                  <X size={18} />
                </button>
              </div>

              {/* DATE */}
              <p className="mt-3 text-xs text-gray-400">
                {new Date(note.createdAt).toLocaleString()}
              </p>

              {/* DIVIDER */}
              <div className="my-5 h-px bg-black/10 dark:bg-white/10" />

              {/* CONTENT */}
              <div
                className="
  text-sm sm:text-base
  text-gray-700 dark:text-gray-300
  leading-relaxed

  whitespace-pre-wrap
  break-words
  break-all
"
              >
                {note.content}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ViewNoteModal;
