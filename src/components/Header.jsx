import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center px-0 lg:px-5 xl:px-5 mt-auto lg:mx-12 xl:mx-12 h-30 relative z-10">
      <Link to="/">
        <img src={logo} alt="Premium Motors Logo" className="h-28" />
      </Link>
      <button className="block xl:hidden lg:hidden text-black pr-10 hover:text-blue-500">
        <FontAwesomeIcon icon={faBars} className="w-full h-8" />
      </button>
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
