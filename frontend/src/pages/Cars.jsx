import { useEffect, useState } from "react";

import PageHeader from "../components/UI/PageHeader";
import Title from "../components/UI/Title";
import CarCard from "../components/CarCard";
import LoadingSpinner from "../components/UI/LoadingSpinner";

export default function Cars() {
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

  const carsForSale = cars.filter(car => car.isForSale === true);
  const carsForRent = cars.filter(car => car.isForSale === false);

  if (isLoading) {
    return <div className="flex flex-col items-center gap-y-8 justify-center mb-16">
      <Title title="Cars For Sale" />
      <LoadingSpinner />
      <Title title="Cars For Rent" />
      <LoadingSpinner />
    </div>
  }

  return (
    <>
      <PageHeader title="Discover Your Dream Ride" />
      <div className="relative pt-6">
        <Title title="Cars For Sale" />
        {carsForSale.length === 0 && <h2 className="text-gray-700 text-center text-2xl font-semibold mt-[10%] ml-[0%]">No cars found.</h2>}
        <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-16 lg:gap-8 xl:gap-8 mt-20 mb-40">
          {carsForSale.length > 0 && carsForSale.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
        <Title title="Cars For Rent" />
        {carsForRent.length === 0 && <h2 className="text-gray-700 text-center text-2xl font-semibold mt-[10%] ml-[0%]">No cars found.</h2>}
        <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-20 mb-32">
          {carsForRent.length > 0 && carsForRent.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </>
  );
}
