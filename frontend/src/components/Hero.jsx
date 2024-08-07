import { Link } from "react-router-dom";

import Koenigsegg from "../assets/koenigsegg.jpg";

export default function Hero() {
  return (
    <section className="flex flex-row lg:overflow-x-hidden mt-10 w-full sm:w-full md:w-full h-[65vh] lg:h-auto xl:h-auto">
      <div className="w-full ml-0 sm:ml-0 lg:ml-20 sm:w-full md:w-full lg:w-1/2 text-center sm:text-center md:text-center lg:text-left">
        <h2 className="text-6xl text-gray-900 font-semibold mt-20 lg:mt-10 xl:mt-10">
          Find Your <span className="text-blue-600">Perfect</span> Ride
        </h2>
        <p className="text-2xl text-gray-800 mt-10 xl:mt-6 lg:mt-6 max-lg:w-[90%] max-lg:mx-auto">
          Explore a wide range of high-quality cars at affordable prices. Your
          dream car awaits.
        </p>
        <Link
          to="/cars"
          className="block w-1/3 h-12 bg-blue-600 mt-24 lg:mt-10 xl:mt-10 text-white rounded font-semibold shadow-blue-900 shadow-md hover:bg-blue-800 transition duration-300 hover:shadow-blue-600 text-center pt-3 max-lg:mx-auto"
        >
          Browse Cars
        </Link>
      </div>
      <img
        src={Koenigsegg}
        alt="Koenigsegg"
        className="hidden lg:block h-2/3 w-2/3 -mr-32"
      />
    </section>
  );
}
