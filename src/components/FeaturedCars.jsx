import Title from "./UI/Title";
import { carsForSale, carsForRent } from "../data/cars.js";
import CarCard from "./CarCard.jsx";

export default function FeaturedCars() {
  return (
    <section className="text-center mt-40">
      <Title title="Featured Cars" />
      <h2 className="text-3xl font-semibold text-gray-700">Cars For Sale</h2>
      <div className="flex flex-row gap-4 px-6 my-16">
        {carsForSale.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
      <h2 className="text-3xl font-semibold text-gray-700 mt-24">Cars For Rent</h2>
      <div className="flex flex-row gap-4 px-6 my-16">
        {carsForRent.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </section>
  );
}
