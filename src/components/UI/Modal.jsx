import { useEffect } from "react";

import { motion } from "framer-motion";

export default function Modal({ children, closeModal }) {
  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  useEffect(() => {
    disableScroll();

    return enableScroll;
  }, []);

  return (
    <>
      <div
        onClick={closeModal}
        className="fixed top-0 left-0 w-full h-full z-20 bg-black opacity-50"
      />
      <motion.dialog
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0, y: -30 }}
        open
        className="fixed z-50 w-[80%] lg:w-1/2 xl:w-1/2 mx-auto bg-white overflow-y-scroll h-[42rem] top-6 left-0"
      >
        {children}
      </motion.dialog>
    </>
  );
}
