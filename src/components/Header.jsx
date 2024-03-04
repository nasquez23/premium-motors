import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center px-5 mt-auto mx-12 h-30 relative z-10">
      <Link to="/">
        <img src={logo} alt="Premium Motors Logo" className="h-28" />
      </Link>
      <nav>
        <ul className="flex flex-row gap-8 mr-4 text-xl text-gray-700 font-semibold">
          <li>
            <Link to="/" className="hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-500">
              About
            </Link>
          </li>
          <li>
            <Link to="/cars" className="hover:text-blue-500">
              Cars
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-500">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
