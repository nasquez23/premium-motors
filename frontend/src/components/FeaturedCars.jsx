import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Title from "./UI/Title";
import CarCard from "./CarCard.jsx";
import LoadingSpinner from "./UI/LoadingSpinner.jsx";
import { AuthContext } from '../context/auth-context.jsx';
import { getCars } from "../api/cars.js";
import { useQuery } from "@tanstack/react-query";

export default function FeaturedCars() {
  const auth = useContext(AuthContext);

  const { data: cars, isLoading } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  });

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
      <div className="mt-10">
        <LoadingSpinner />
      </div>
    </div>
  }

  if (cars?.length === 0 && !isLoading) {
    return <div>
      <Title title="Featured Cars" />
      <h2 className="text-gray-700 text-center text-2xl font-semibold mt-[10%]">No cars found.</h2>
    </div>
  }

  return (
    <section className="text-center mt-40">
      <Title title="Featured Cars" />
      <h2 className="text-3xl font-semibold text-gray-700 mb-14 lg:mb-28 xl:mb-28">
        Explore Our Inventory
      </h2>
      <div className="relative flex items-center justify-center">
        {cars && cars.length > 1 && <button
          onClick={handlePrevCar}
          className="absolute text-white bg-blue-500 p-3 rounded-full top-[35%] left-4 lg:left-[30%] xl:left-[30%] hover:bg-blue-700 transition duration-200">
          {"<"}
        </button>}
        {cars && cars.length > 1 && <button
          onClick={handleNextCar}
          className="absolute text-white bg-blue-500 p-3 rounded-full top-[35%] right-4 lg:right-[30%] xl:right-[30%] hover:bg-blue-700 transition duration-200"
        >
          {">"}
        </button>}
        <div className="w-3/4 lg:w-1/4 xl:w-1/4 h-full">
        {!isLoading && (!cars || cars.length === 0) && <h2 className="text-gray-700 text-center text-2xl font-semibold mt-[5%]">No cars found.</h2>}
          {cars && cars.length > 0 && <CarCard
            key={currentCar}
            car={cars[currentCar]}
            direction={switchDirection}
          />}
          {cars && cars.length > 0 && <div className="mt-14">
            <Link to="/cars" className="text-gray-600 font-semibold mt-16 h-12 w-[60%] border-gray-400 border rounded-lg p-4 hover:text-gray-800 hover:border-gray-600 hover:border-2 transition duration-300"
              onClick={() => window.scrollTo(0, 0)}>
              <span>Show All Vehicles</span>{" "}
              <span className="text-3xl">&rarr;</span>
            </Link>
          </div>}
          {auth.isLoggedIn && <div className="mt-8">
            <Link to="/cars/new" className="text-white px-5 py-4 font-semibold bg-blue-500 h-12 w-[60%] rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => window.scrollTo(0, 0)} >
              <span className="text-2xl">+</span> Add New Vehicle
            </Link>
          </div>}
        </div>
      </div>
    </section>
  );
}
