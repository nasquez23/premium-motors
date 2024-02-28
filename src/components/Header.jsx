import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center px-5 m-auto mt-5 max-w-[98%] bg-red-100 h-20 text-black">
      <h1 className="text-3xl font-bold">Premium Motors</h1>
      <nav>
        <ul className="flex flex-row gap-8 mr-4 text-xl">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/cars">Cars</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
