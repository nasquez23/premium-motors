import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Title from "./UI/Title";
import CarCard from "./CarCard.jsx";
import LoadingSpinner from "./UI/LoadingSpinner.jsx";

export default function FeaturedCars() {
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/api/cars");
        const resData = await response.json();
        setCars(resData);
        setIsLoading(false);
      } catch (error) { }
    }

    fetchCars();
  }, []);

  const [currentCar, setCurrentCar] = useState(0);
  const [switchDirection, setSwitchDirection] = useState("");

  function handleNextCar() {
    setCurrentCar((prevState) =>
      prevState === cars.length - 1 ? 0 : prevState + 1
    );
    setSwitchDirection("right");
  }

  function handlePrevCar() {
    setCurrentCar((prevState) =>
      prevState === 0 ? cars.length - 1 : prevState - 1
    );
    setSwitchDirection("left");
  }

  if (isLoading) {
    return <div className="flex flex-col items-center justify-center">
      <Title title="Featured Cars" />
      <LoadingSpinner />
    </div>
  }

  if (cars.length === 0 && !isLoading) {
    return <div>
      <Title title="Featured Cars" />
      <h2 className="text-gray-700 text-center text-2xl font-semibold mt-[10%]">No cars found.</h2>
    </div>
  }

  return (
    <section className="text-center mt-40 pb-[20%] max-lg:pb-[60%]">
      <Title title="Featured Cars" />
      <h2 className="text-3xl font-semibold text-gray-700 mb-14 lg:mb-28 xl:mb-28">
        Explore Our Inventory
      </h2>
      <div className="relative flex items-center justify-center h-96">
        {cars.length > 1 && <button
          onClick={handlePrevCar}
          className="absolute text-white bg-blue-500 p-3 rounded-full top-[60%] left-4 lg:left-[30%] xl:left-[30%] hover:bg-blue-700 transition duration-200">
          {"<"}
        </button>}
        {cars.length > 1 && <button
          onClick={handleNextCar}
          className="absolute text-white bg-blue-500 p-3 rounded-full top-[60%] right-4 lg:right-[30%] xl:right-[30%] hover:bg-blue-700 transition duration-200"
        >
          {">"}
        </button>}
        <div className="w-3/4 lg:w-1/4 xl:w-1/4 h-full">
          <CarCard
            key={currentCar}
            car={cars[currentCar]}
            direction={switchDirection}
          />
          <div className="mt-14">
            <Link to="/cars" className="text-gray-600 font-semibold mt-16 h-12 w-[60%] border-gray-400 border rounded-lg p-4 hover:text-gray-800 hover:border-gray-600 hover:border-2 transition duration-300"
              onClick={() => window.scrollTo(0, 0)}>
              <span>Show All Vehicles</span>{" "}
              <span className="text-3xl">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
