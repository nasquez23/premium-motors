import logo from "../assets/lamborghini.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faHandshake,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import Title from "./UI/Title";

export default function WhyChooseUs() {
  return (
    <section className="flex flex-row my-10">
      <img
        src={logo}
        alt="Lamborghini"
        className="w-2/3 h-2/3 -ml-52 hidden lg:block xl:block"
      />
      <div className="w-full lg:w-1/2 xl:w-1/2 lg:ml-20 xl:ml-20 mt-10">
        <Title title="Why choose us" textLeft />
        <h1 className="text-4xl w-[90%] text-center ml-4 xl:ml-0 lg:ml-0 lg:text-left xl:text-left lg:w-3/4 xl:w-3/4 mb-8 text-gray-700 font-semibold">
          We offer the best experience with our deals
        </h1>
        <div className="mb-20 lg:mb-10 xl:mb-10 flex flex-col lg:flex-row xl:flex-row">
          <div className="w-[60px] max-lg:w-20 h-14 max-lg:h-20 text-3xl lg:text-base xl:text-base text-center mr-4 ml-60 xl:ml-0 lg:ml-0 mt-4 mb-8 xl:mb-0 lg:mb-0 pt-3 bg-blue-100 rounded-lg">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-blue-600 pt-3 xl:pt-1 lg:pt-1 lg:h-5 xl:h-5"
            />
          </div>
          <div className="text-center lg:text-left xl:text-left">
            <h3 className="text-xl mb-4 lg:mb-1 xl:mb-1 font-bold text-gray-700">
              Quality Products
            </h3>
            <p className="w-2/3 lg:w-3/4 xl:w-3/4 text-gray-600 mx-auto lg:mx-0 xl:mx-0">
              Our products are crafted with precision and attention to detail,
              ensuring top-notch quality.
            </p>
          </div>
        </div>
        <div className="mb-20 lg:mb-10 xl:mb-10 flex flex-col lg:flex-row xl:flex-row">
          <div className="w-16 max-lg:w-20 h-14 max-lg:h-20 text-3xl lg:text-base xl:text-base text-center mr-4 ml-60 xl:ml-0 lg:ml-0 mt-4 mb-8 xl:mb-0 lg:mb-0 pt-3 bg-blue-100 rounded-lg">
            <FontAwesomeIcon
              icon={faHandshake}
              className="text-blue-600 pt-3 xl:pt-[6px] lg:pt-[6px] lg:h-5 xl:h-5"
            />
          </div>
          <div className="text-center lg:text-left xl:text-left">
            <h3 className="text-xl mb-4 lg:mb-1 xl:mb-1 font-bold text-gray-700">
              Exceptional Service
            </h3>
            <p className="w-2/3 lg:w-[80%] xl:w-[80%] text-gray-600 mx-auto lg:mx-0 xl:mx-0">
              We pride ourselves on providing exceptional customer service,
              always putting your needs first.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row xl:flex-row">
          <div className="w-14 max-lg:w-20 h-14 max-lg:h-20 text-3xl lg:text-base xl:text-base text-center mr-4 ml-60 xl:ml-0 lg:ml-0 mt-4 mb-8 xl:mb-0 lg:mb-0 pt-3 bg-blue-100 rounded-lg">
            <FontAwesomeIcon
              icon={faTag}
              className="text-blue-600 pt-3 xl:pt-[6px] lg:pt-[6px] lg:h-5 xl:h-5"
            />
          </div>
          <div className="text-center lg:text-left xl:text-left">
            <h3 className="text-xl mb-4 lg:mb-1 xl:mb-1 font-bold text-gray-700">
              Affordable Pricing
            </h3>
            <p className="w-2/3 lg:w-3/4 xl:w-3/4 text-gray-600 mx-auto lg:mx-0 xl:mx-0">
              Enjoy high-quality products and services at affordable prices that
              fit your budget.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
