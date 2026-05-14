"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import useNotes from "@/hooks/useNotes";
import { errorToast, successToast } from "@/components/alert/notify";
import { fadeIn, fadeInUp } from "@/animations";

const CreateNoteModal = ({ open, setOpen, createNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      errorToast("Title and Content cannot be empty");
      return;
    }

    try {
      await createNote({ title, content });

      successToast("Note created successfully");

      setOpen(false);
      setTitle("");
      setContent("");
    } catch (error) {
      errorToast(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/70 z-50"
          />

          {/* MODAL WRAPPER */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="
                relative
                w-full
                max-w-lg

                rounded-3xl

                bg-white
                dark:bg-[#161616]

                border
                border-black/10
                dark:border-white/10

                p-6

                shadow-2xl
              "
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setOpen(false)}
                className="
                  absolute
                  top-4
                  right-4

                  text-gray-500
                  hover:text-red-500

                  transition-all
                "
              >
                <X size={20} />
              </button>

              {/* TITLE */}
              <h2 className="text-2xl font-bold text-black dark:text-white">
                Create Note
              </h2>

              <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                Write something meaningful
              </p>

              {/* FORM */}
              <div className="mt-6 space-y-5">
                {/* TITLE INPUT */}
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Title
                  </label>

                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    className="
                      w-full
                      mt-2

                      rounded-2xl

                      border
                      border-black/10
                      dark:border-white/10

                      bg-transparent

                      px-4
                      py-3

                      outline-none

                      text-black
                      dark:text-white

                      focus:border-brand
                      transition-all
                    "
                  />
                </div>

                {/* CONTENT INPUT */}
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Content
                  </label>

                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your note..."
                    className="
                      w-full
                      mt-2

                      h-32

                      rounded-2xl

                      border
                      border-black/10
                      dark:border-white/10

                      bg-transparent

                      px-4
                      py-3

                      outline-none

                      text-black
                      dark:text-white

                      focus:border-brand
                      transition-all

                      resize-none
                    "
                  />
                </div>

                {/* SAVE BUTTON */}
                <button
                  onClick={handleSave}
                  className="
                    w-full

                    mt-2

                    rounded-2xl

                    bg-brand

                    py-3

                    font-semibold
                    text-white

                    hover:opacity-90
                    active:scale-[0.98]

                    transition-all
                  "
                >
                  Save Note
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateNoteModal;
