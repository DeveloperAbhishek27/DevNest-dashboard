"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { errorToast, successToast } from "@/components/alert/notify";
import { fadeIn, fadeInUp } from "@/animations";

const EditNoteModal = ({ open, setOpen, note, updateNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
    }
  }, [note]);

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      errorToast("Title and Content cannot be empty");
      return;
    }

    try {
      await updateNote(note._id, { title, content });

      successToast("Note updated successfully");

      setOpen(false);
    } catch (error) {
      errorToast(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <AnimatePresence>
      {open && note && (
        <>
          {/* OVERLAY */}
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
                max-w-xl

                rounded-3xl

                bg-white
                dark:bg-[#0b0f1a]

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
                Edit Note
              </h2>

              <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                Update your note details
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

                      text-black
                      dark:text-white

                      outline-none

                      focus:border-brand
                    "
                  />
                </div>

                {/* CONTENT */}
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Content
                  </label>

                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
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

                      text-black
                      dark:text-white

                      outline-none

                      resize-none

                      focus:border-brand
                    "
                  />
                </div>

                {/* BUTTON */}
                <button
                  onClick={handleUpdate}
                  className="
                    w-full

                    rounded-2xl

                    bg-brand

                    py-3

                    font-semibold
                    text-white

                    hover:opacity-90

                    transition-all
                  "
                >
                  Update Note
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditNoteModal;
