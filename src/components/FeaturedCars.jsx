import { useState } from "react";

import Title from "./UI/Title";
import { carsForSale, carsForRent } from "../data/cars.js";
import CarCard from "./CarCard.jsx";
import { Link } from "react-router-dom";

export default function FeaturedCars() {
  const allCars = carsForSale.concat(carsForRent);

  const [currentCar, setCurrentCar] = useState(0);

  function handleNextCar() {
    setCurrentCar((prevState) =>
      prevState === allCars.length - 1 ? 0 : prevState + 1
    );
  }

  function handlePrevCar() {
    setCurrentCar((prevState) =>
      prevState === 0 ? allCars.length - 1 : prevState - 1
    );
  }

  return (
    <section className="text-center mt-40 h-[50rem]">
      <Title title="Featured Cars" />
      <h2 className="text-3xl font-semibold text-gray-700 mb-28">
        Explore Our Inventory
      </h2>
      <div className="relative flex items-center justify-center h-96">
        <button
          onClick={handlePrevCar}
          className="absolute text-white bg-blue-500 p-3 rounded-full top-1/2 left-[30%] hover:bg-blue-700 transition duration-200"
        >
          {"<"}
        </button>
        <button
          onClick={handleNextCar}
          className="absolute text-white bg-blue-500 p-3 rounded-full top-1/2 right-[30%] hover:bg-blue-700 transition duration-200"
        >
          {">"}
        </button>
        <div className="w-1/4 h-full">
          <CarCard key={currentCar} car={allCars[currentCar]} />
          <button className="text-gray-600 font-semibold mt-16 h-12 w-[60%] border-gray-400 border rounded-lg pb-2 hover:text-gray-800 hover:border-gray-600">
            <Link to="/cars">
              <span>Show All Vehicles</span>{" "}
              <span className="text-3xl">&rarr;</span>
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
