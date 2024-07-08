import { lazy, Suspense } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const FeaturedCars = lazy(() => import("../components/FeaturedCars"));
const Hero = lazy(() => import("../components/Hero"));
const HowItWorks = lazy(() => import("../components/HowItWorks"));
const Newsletter = lazy(() => import("../components/Newsletter"));
const Testemonials = lazy(() => import("../components/Testemonials"));
const WhyChooseUs = lazy(() => import("../components/WhyChooseUs"));

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className="flex justify-center my-[10%]"><LoadingSpinner /></div>}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div className="flex justify-center my-[10%]"><LoadingSpinner /></div>}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<div className="flex justify-center my-[10%]"><LoadingSpinner /></div>}>
        <Newsletter />
      </Suspense>
      <Suspense fallback={<div className="flex justify-center my-[10%]"><LoadingSpinner /></div>}>
        <WhyChooseUs />
      </Suspense>
      <Suspense fallback={<div className="flex justify-center my-[10%]"><LoadingSpinner /></div>}>
        <FeaturedCars />
      </Suspense>
      <Suspense fallback={<div className="flex justify-center my-[10%]"><LoadingSpinner /></div>}>
        <Testemonials />
      </Suspense>
    </main>
  );
}
