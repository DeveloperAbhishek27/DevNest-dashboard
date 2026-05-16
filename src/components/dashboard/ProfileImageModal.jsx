"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, fadeInUp } from "@/animations";

const ProfileImageModal = ({ open, setOpen, image }) => {
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
            className="fixed inset-0 bg-black/80 z-50"
          />

          {/* MODAL */}
          <div className="fixed inset-0 z-50  flex items-center justify-center px-4">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="
                relative
                rounded-3xl
                overflow-hidden
                border-2 border-white/20
                bg-white dark:bg-homeBg
                shadow-2xl
                p-3
              "
            >
              {/* CLOSE BTN */}
              <button
                onClick={() => setOpen(false)}
                className="
                  absolute
                  top-3
                  right-3
                  z-10
                  w-10
                  h-10
                  rounded-xl
                  bg-black/40
                  dark:bg-brand
                  backdrop-blur-md
                  text-white
                  flex
                  items-center
                  justify-center
                  hover:scale-105
                  transition
                "
              >
                <X size={18} />
              </button>

              {/* IMAGE */}
              <img
                src={image}
                alt="profile"
                className="
                  max-w-[90vw]
                  max-h-[80vh]
                  object-cover
                  rounded-2xl
                "
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileImageModal;
