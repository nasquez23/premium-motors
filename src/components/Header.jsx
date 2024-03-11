import { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";

export default function Header() {
  const location = useLocation();

  const [openNav, setOpenNav] = useState(false);

  if (openNav) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  const toggleNavigaton = () => {
    setOpenNav((prevState) => !prevState);
  };

  return (
    <header className="flex flex-row justify-between items-center px-0 lg:px-5 xl:px-5 mt-auto lg:mx-12 xl:mx-12 h-30 relative z-10">
      <Link to="/">
        <img src={logo} alt="Premium Motors Logo" className="h-28" />
      </Link>
      <button
        onClick={toggleNavigaton}
        className="block xl:hidden lg:hidden text-gray-800 pr-10 hover:text-blue-500"
      >
        <FontAwesomeIcon icon={faBars} className="w-full h-8" />
      </button>
      <AnimatePresence>
        {openNav && (
          <motion.div
            initial={{ x: -800 }}
            animate={{ x: 0 }}
            exit={{ x: -800, transition: { duration: 1 } }}
            transition={{ duration: 0.8 }}
            className="top-0 left-0 w-full h-full bg-white z-50 fixed lg:hidden xl:hidden"
          >
            <div className="flex justify-end mx-10 mt-10">
              <button
                onClick={toggleNavigaton}
                className="text-black text-4xl font-semibold hover:text-blue-500 transition duration-300"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <ul className="text-center text-3xl text-gray-800 font-semibold mt-28">
              <li className="py-4">
                <Link
                  to="/"
                  onClick={toggleNavigaton}
                  className={
                    location.pathname === "/"
                      ? "text-blue-500 hover:text-blue-600 transition duration-300"
                      : "hover:text-blue-500 transition duration-300"
                  }
                >
                  Home
                </Link>
              </li>
              <li className="py-4">
                <Link
                  to="/about"
                  onClick={toggleNavigaton}
                  className={
                    location.pathname === "/about"
                      ? "text-blue-500 hover:text-blue-600 transition duration-300"
                      : "hover:text-blue-500 transition duration-300"
                  }
                >
                  About
                </Link>
              </li>
              <li className="py-4">
                <Link
                  to="/cars"
                  onClick={toggleNavigaton}
                  className={
                    location.pathname === "/cars"
                      ? "text-blue-500 hover:text-blue-600 transition duration-300"
                      : "hover:text-blue-500 transition duration-300"
                  }
                >
                  Cars
                </Link>
              </li>
              <li className="py-4">
                <Link
                  to="/contact"
                  onClick={toggleNavigaton}
                  className={
                    location.pathname === "/contact"
                      ? "text-blue-500 hover:text-blue-600 transition duration-300"
                      : "hover:text-blue-500 transition duration-300"
                  }
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="hidden xl:block lg:block">
        <ul className="flex flex-row gap-8 mr-4 text-xl text-gray-700 font-semibold">
          <li>
            <Link
              to="/"
              className={
                location.pathname === "/"
                  ? "text-blue-500 hover:text-blue-600 transition duration-300"
                  : "hover:text-blue-500 transition duration-300"
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={
                location.pathname === "/about"
                  ? "text-blue-500 hover:text-blue-600 transition duration-300"
                  : "hover:text-blue-500 transition duration-300"
              }
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/cars"
              className={
                location.pathname === "/cars"
                  ? "text-blue-500 hover:text-blue-600 transition duration-300"
                  : "hover:text-blue-500 transition duration-300"
              }
            >
              Cars
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={
                location.pathname === "/contact"
                  ? "text-blue-500 hover:text-blue-600 transition duration-300"
                  : "hover:text-blue-500 transition duration-300"
              }
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
