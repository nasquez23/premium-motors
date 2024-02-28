import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex flex-row justify-between p-5 h-20 w-full text-black">
      <h1 className="text-2xl font-bold">Premium Motors</h1>
      <nav>
        <ul className="flex flex-row gap-8 mr-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/cars">Cars</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
