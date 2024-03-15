import PageHeader from "../components/UI/PageHeader";
import Title from "../components/UI/Title";

export default function About() {
  return (
    <>
      <PageHeader title="About Premium Motors" />
      <div className="pt-6 w-2/3 mx-auto mb-32">
        <Title title="About Us" />
        <div className="text-gray-600 text-xl font-semibold text-left md:text-center lg:text-left">
          <p className="my-10">
            Welcome to Premium Motors – Your Trusted Partner in Exceptional Cars
          </p>
          <p>
            At Premium Motors, we pride ourselves on delivering a premium
            automotive experience. With a passion for quality, style, and
            performance, we curate a collection of exceptional cars that
            redefine driving.
          </p>
        </div>
        <div className="text-gray-700 mt-12 text-left md:text-center lg:text-left">
          <h2 className="font-bold text-2xl mb-6">Our Mission</h2>
          <p className="text-xl">
            Our mission is to provide our customers with access to top-tier
            vehicles, whether you're in search of a luxury sedan, a powerful
            SUV, or a sleek sports car. We believe in delivering not just cars,
            but an unparalleled driving experience that goes beyond the
            ordinary.
          </p>
        </div>
        <div className="text-gray-700 mt-12 text-left md:text-center lg:text-left">
          <h2 className="font-bold text-2xl mb-6">Commitment to Excellence</h2>
          <p className="text-xl">
            What sets us apart is our unwavering commitment to excellence. From
            the moment you step into our showroom to the day you drive away in
            your dream car, we are dedicated to ensuring your satisfaction. Our
            knowledgeable and friendly team is here to assist you at every step,
            helping you find the perfect vehicle that aligns with your
            preferences and lifestyle.
          </p>
        </div>
        <div className="text-gray-700 mt-12 text-left md:text-center lg:text-left">
          <h2 className="font-bold text-2xl mb-6">Quality Assurance</h2>
          <p className="text-xl">
            Each car in our collection undergoes rigorous inspection and
            maintenance, ensuring that you receive a vehicle of the highest
            quality. We stand by the integrity of our cars, providing
            transparency and peace of mind to every customer.
          </p>
        </div>
        <div className="text-gray-700 mt-12 text-left md:text-center lg:text-left">
          <h2 className="font-bold text-2xl mb-6">Visit Us</h2>
          <p className="text-xl">
            Experience the difference at Premium Motors. Visit our showroom to
            explore our curated selection of premium cars and discover why we
            are a trusted name in the automotive industry. Thank you for
            choosing Premium Motors – Where Excellence Meets the Road.
          </p>
        </div>
      </div>
    </>
  );
}
