import { Link } from "react-router-dom";

import Koenigsegg from "../assets/koenigsegg.jpg";

export default function Hero() {
  return (
    <section className="flex flex-row overflow-x-hidden mt-10 w-full">
      <div className="w-1/2 ml-20">
        <h2 className="text-6xl text-gray-900 font-semibold mt-10">
          Find Your Perfect Ride
        </h2>
        <p className="text-2xl text-gray-800 mt-6">
          Explore a wide range of high-quality cars at affordable prices. Your
          dream car awaits.
        </p>
        <button className="w-1/3 h-12 bg-blue-600 mt-10 text-white rounded font-semibold shadow-blue-900 shadow-md hover:bg-blue-800">
          <Link to="/cars">Browse Cars</Link>
        </button>
      </div>
      <img
        src={Koenigsegg}
        alt="Koenigsegg"
        className="h-2/3 w-2/3 -mr-24"
      />
    </section>
  );
}
