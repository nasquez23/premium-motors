import FeaturedCars from "../components/FeaturedCars";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Newsletter from "../components/Newsletter";
import Testemonials from "../components/Testemonials";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Newsletter />
      <WhyChooseUs />
      <FeaturedCars />
      <Testemonials />
    </main>
  );
}
