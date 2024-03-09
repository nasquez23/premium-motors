import PageHeader from "../components/UI/PageHeader";
import Title from "../components/UI/Title";
import { carsForSale, carsForRent } from "../data/cars";
import CarCard from "../components/CarCard";

export default function Cars() {
  return (
    <>
      <PageHeader title="Discover Your Dream Ride" />
      <div className="relative pt-6">
        <Title title="Cars For Sale" />
        <div className="w-3/4 mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-16 lg:gap-8 xl:gap-8 mt-20 mb-40">
          {carsForSale.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
        <Title title="Cars For Rent" />
        <div className="w-3/4 mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-20 mb-32">
          {carsForRent.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </>
  );
}
