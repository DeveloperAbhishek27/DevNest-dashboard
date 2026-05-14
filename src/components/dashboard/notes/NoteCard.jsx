"use client";

import { fadeInUp } from "@/animations";
import { motion } from "framer-motion";
import { Eye, Pencil, Trash2 } from "lucide-react";

const NoteCard = ({ note, onView, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="relative p-5 rounded-3xl bg-white dark:bg-[#0b0f1a]
  border border-black/5 dark:border-white/10 shadow-sm dark:shadow-2xl
  flex flex-col justify-between min-h-[180px] overflow-hidden"
    >
      <div className="absolute pointer-events-none -top-10 -right-10 w-40 h-40 bg-[#ff6912]/10 blur-3xl rounded-full" />

      {/* TITLE */}
      <h2 className="text-lg font-semibold text-black dark:text-white truncate relative z-10">
        {note.title}
      </h2>

      {/* CONTENT */}
      <p className="text-sm mt-2 line-clamp-3 text-gray-600 dark:text-gray-300 relative z-10 leading-relaxed">
        {note.content}
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-6 relative z-10">
        {/* DATE */}
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          {/* VIEW */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={onView}
            className="text-blue-500 dark:text-blue-400 transition"
          >
            <Eye size={18} />
          </motion.button>

          {/* EDIT */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={onEdit}
            className="text-yellow-500 dark:text-yellow-400 transition"
          >
            <Pencil size={18} />
          </motion.button>

          {/* DELETE */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={onDelete}
            className="text-red-500 dark:text-red-400 transition"
          >
            <Trash2 size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;
