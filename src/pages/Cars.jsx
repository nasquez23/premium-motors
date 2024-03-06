import PageHeader from "../components/UI/PageHeader";
import Title from "../components/UI/Title";
import FeaturedCars from "../components/FeaturedCars";

export default function Cars() {
  return (
    <>
      <PageHeader title="Discover Your Dream Ride" />
      <div className="mt-52">
        <FeaturedCars />
      </div>
    </>
  );
}
