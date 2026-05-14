"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { errorToast, successToast } from "@/components/alert/notify";
import { fadeIn, fadeInUp } from "@/animations";

const DeleteNoteModal = ({ open, setOpen, note, deleteNote }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteNote(note._id);

      successToast("Note deleted successfully");

      setOpen(false);
    } catch (error) {
      errorToast(error.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
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

          {/* MODAL */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="
                w-full max-w-md
                bg-white dark:bg-[#0b0f1a]
                border border-black/10 dark:border-white/10
                rounded-3xl p-6
                shadow-2xl
                relative
              "
            >
              {/* CLOSE */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>

              {/* ICON HEADER */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-red-500/10">
                  <AlertTriangle className="text-red-500" size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-black dark:text-white">
                    Delete Note
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              {/* NOTE PREVIEW */}
              <div className="p-3 rounded-xl bg-gray-100 dark:bg-white/5">
                <p className="font-semibold text-black dark:text-white truncate">
                  {note?.title}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-6">
                {/* CANCEL */}
                <button
                  onClick={() => setOpen(false)}
                  className="
                    flex-1
                    py-3
                    rounded-2xl
                    border
                    border-gray-300 dark:border-white/10
                    text-black dark:text-white
                    hover:bg-gray-100 dark:hover:bg-white/5
                    transition
                  "
                >
                  Cancel
                </button>

                {/* DELETE */}
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="
                    flex-1
                    py-3
                    rounded-2xl
                    bg-red-500
                    text-white
                    font-semibold
                    hover:bg-red-600
                    transition
                    flex items-center justify-center gap-2
                    disabled:opacity-60
                  "
                >
                  <Trash2 size={18} />
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeleteNoteModal;
