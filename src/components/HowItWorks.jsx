import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faCalendarAlt,
  faClipboardCheck,
  faCarSide,
  faCalendarPlus,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import Title from "./UI/Title";

export default function HowItWorks() {
  return (
    <>
      <section className="mt-32">
      <Title title="How It Works" />
        <h3 className="text-gray-700 text-3xl text-center font-semibold mb-16">
          Buy a Car
        </h3>
        <div className="flex flex-col lg:flex-row w-2/3 sm:w-full md:w-full lg:w-2/3 lg:justify-between m-auto gap-20 lg:gap-40 xl:gap-40 text-gray-700">
          <article className="w-full lg:w-3/4 text-center">
            <div className="w-20 h-20 bg-blue-100 text-center items-center rounded-lg text-3xl pt-6 mb-8 lg:ml-[72px] mx-auto">
              <FontAwesomeIcon icon={faCar} className="text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">
              Explore Our Inventory
            </h3>
            <p className="w-full text-gray-600">
              Discover a diverse range of high-quality cars in our inventory.
            </p>
          </article>
          <article className="w-full lg:w-3/4 text-center">
            <div className="w-20 h-20 bg-blue-100 text-center rounded-lg text-3xl pt-6 mb-8 mx-auto lg:ml-16">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-12">
              Schedule a Test Drive
            </h3>
            <p className="w-full text-gray-600">
              Choose your favorite car and schedule a test drive at your
              convenience.
            </p>
          </article>
          <article className="w-full lg:w-3/4 text-center">
            <div className="w-20 h-20 bg-blue-100 text-center items-center rounded-lg text-3xl pt-6 mb-8 mx-auto lg:ml-[72px]">
              <FontAwesomeIcon
                icon={faClipboardCheck}
                className="text-blue-600"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4">
              Finalize Your Purchase
            </h3>
            <p className="w-full text-gray-600">
              Work with our team to finalize the purchase and complete the
              necessary paperwork.
            </p>
          </article>
        </div>
      </section>
      <section className="mt-32 lg:mt-16">
        <h3 className="text-gray-700 text-3xl text-center font-semibold mb-16">
          Rent a Car
        </h3>
        <div className="flex flex-col sm:flex-col lg:flex-row w-2/3 sm:w-full lg:w-2/3 justify-between m-auto gap-20 lg:gap-40 xl:gap-40 text-gray-700">
          <article className="w-full lg:w-3/4 text-center">
            <div className="w-20 h-20 bg-blue-100 text-center items-center rounded-lg text-3xl pt-6 mb-8 mx-auto lg:ml-[72px]">
              <FontAwesomeIcon icon={faCarSide} className="text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Choose Your Car</h3>
            <p className="w-full text-gray-600">
              Browse our collection of cars and choose the one that suits your
              needs.
            </p>
          </article>
          <article className="w-full lg:w-3/4 text-center">
            <div className="w-20 h-20 bg-blue-100 text-center rounded-lg text-3xl pt-6 mb-8 mx-auto lg:ml-16">
              <FontAwesomeIcon
                icon={faCalendarPlus}
                className="text-blue-600"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Reserve Online</h3>
            <p className="w-full text-gray-600">
              Reserve your chosen car online by providing your details and
              preferred rental dates.
            </p>
          </article>
          <article className="w-full lg:w-3/4 text-center">
            <div className="w-20 h-20 bg-blue-100 text-center items-center rounded-lg text-3xl pt-6 mb-8 mx-auto lg:ml-[72px]">
              <FontAwesomeIcon
                icon={faUserAlt}
                className="text-blue-600"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Pick Up Your Car</h3>
            <p className="w-full text-gray-600">
              Visit our location on the scheduled date to pick up your reserved
              car.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
