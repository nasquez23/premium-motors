import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Newsletter from '../components/Newsletter'
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Newsletter />
      <WhyChooseUs />
    </div>
  );
}
