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
      <img src={logo} alt="Lamborghini" className="w-2/3 h-2/3 -ml-52" />
      <div className="w-1/2 ml-20 mt-10">
        <Title title="Why choose us" textLeft />
        <h1 className="text-4xl w-3/4 mb-8 text-gray-700 font-semibold">
          We offer the best experience with our deals
        </h1>
        <div className="mb-10 flex flex-row">
          <div className="w-12 h-12 text-center mr-4 mt-4 pt-3 bg-blue-100 rounded-lg">
            <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-700">
              Quality Products
            </h3>
            <p className="w-3/4 text-gray-600">
              Our products are crafted with precision and attention to detail,
              ensuring top-notch quality.
            </p>
          </div>
        </div>
        <div className="mb-10 flex flex-row">
          <div className="w-12 h-12 text-center mr-4 mt-4 pt-3 bg-blue-100 rounded-lg">
            <FontAwesomeIcon icon={faHandshake} className=" text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-700">
              Exceptional Service
            </h3>
            <p className="w-3/4 text-gray-600">
              We pride ourselves on providing exceptional customer service,
              always putting your needs first.
            </p>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-12 h-12 text-center mr-4 mt-4 pt-3 bg-blue-100 rounded-lg">
            <FontAwesomeIcon icon={faTag} className=" text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-700">
              Affordable Pricing
            </h3>
            <p className="w-3/4 text-gray-600">
              Enjoy high-quality products and services at affordable prices that
              fit your budget.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
