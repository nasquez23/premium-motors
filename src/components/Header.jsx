import { useState } from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";

export default function Header() {
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
      {openNav && (
        <div className="top-0 left-0 w-full h-full bg-white z-50 fixed lg:hidden xl:hidden">
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
                className="hover:text-blue-500 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li className="py-4">
              <Link
                to="/about"
                onClick={toggleNavigaton}
                className="hover:text-blue-500 transition duration-300"
              >
                About
              </Link>
            </li>
            <li className="py-4">
              <Link
                to="/cars"
                onClick={toggleNavigaton}
                className="hover:text-blue-500 transition duration-300"
              >
                Cars
              </Link>
            </li>
            <li className="py-4">
              <Link
                to="/contact"
                onClick={toggleNavigaton}
                className="hover:text-blue-500 transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}

      <nav className="hidden xl:block lg:block">
        <ul className="flex flex-row gap-8 mr-4 text-xl text-gray-700 font-semibold">
          <li>
            <Link
              to="/"
              className="hover:text-blue-500 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-blue-500 transition duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/cars"
              className="hover:text-blue-500 transition duration-300"
            >
              Cars
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-blue-500 transition duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
