import LebronJames from "../assets/lebron-james.jpg";
import DonaldTrump from "../assets/donald-trump.jpg";
import quotes from "../assets/quotes.jpg";
import TestemonialCard from "./TestemonialCard";
import Title from "./UI/Title";

export default function Testemonials() {
  return (
    <section className="text-center pb-32 relative bg-gradient-to-b from-white to-blue-50 mt-48">
      <div
        className="absolute top-0 left-0 w-full h-full opacity-15 z-0"
        style={{
          backgroundImage: `url(${quotes})`,
          backgroundRepeat: "repeat",
          backgroundSize: "50% 30%",
          backgroundPosition: 'center'
        }}
      ></div>
      <Title title="Testemonials" />
      <h2 className="text-3xl text-gray-700 font-semibold mt-4 mb-20 relative">
        What our customers say about us?
      </h2>
      <div className="flex flex-row justify-center gap-8 relative">
        <TestemonialCard
          image={LebronJames}
          stars="5.0"
          text="I feel very secure when using Premium Motors's services. Your customer care team is very enthusiastic and the driver is always on time."
          name="LeBron James"
          from="Akron, Ohio"
        />
        <TestemonialCard
          image={DonaldTrump}
          stars="4.5"
          text="Exceptional service and a wide selection of top-notch cars at Premium Motors. The team made the car-buying process smooth, and I couldn't be happier with my new ride. Highly recommended!"
          name="Donald Trump"
          from="New York, New York"
        />
      </div>
    </section>
  );
}
