import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import AudiA5 from "../assets/audi-a5.jpg";
import BMW5series from "../assets/bmw-5series.jpeg";
import MercedesCLS from "../assets/mercedes-cls.jpg";
import VolkswagenPassat from "../assets/vw-passat.jpg";
import PorschePanamera from "../assets/porsche-panamera.jpg";
import FordMustang from "../assets/ford-mustang.jpg";
import ChevroletCamaro from "../assets/chevrolet-camaro.jpg";
import DodgeChallenger from "../assets/dodge-challenger.jpg";
import RangeRoverVogue from "../assets/range-rover.jpg";
import VolvoXC90 from "../assets/volvo-xc90.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faWrench,
  faBolt,
  faGear,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./UI/Modal";
import LoadingSpinner from "./UI/LoadingSpinner";
import { Link } from "react-router-dom";

export default function CarCard({ car, direction }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const carImages = {
    "Audi A5": AudiA5,
    "BMW 5 series": BMW5series,
    "Mercedes CLS": MercedesCLS,
    "Volkswagen Passat": VolkswagenPassat,
    "Porsche Panamera": PorschePanamera,
    "Ford Mustang": FordMustang,
    "Chevrolet Camaro": ChevroletCamaro,
    "Dodge Challenger": DodgeChallenger,
    "Range Rover Vogue": RangeRoverVogue,
    "Volvo XC90": VolvoXC90,
  };

  const image = carImages[`${car.manufacturer} ${car.model}`];

  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.car = `${car.manufacturer} ${car.model}`;

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      setIsLoading(false);
      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <Modal closeModal={handleCloseModal}>
            <div className="flex flex-row justify-between px-5 bg-blue-500 h-14 w-full">
              <h2 className="uppercase font-semibold text-white text-2xl pt-3">
                Complete Reservation
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-white text-2xl font-bold"
              >
                X
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col lg:flex-row xl:flex-row border-b border-gray-500 mt-8">
                <div className="w-full lg:w-1/2 xl:w-1/2 px-6 pb-10">
                  <h2 className="uppercase text-blue-500 text-xl font-semibold">
                    Location & Date
                  </h2>
                  <div className="flex flex-col mt-4">
                    <label
                      htmlFor="location"
                      className="text-gray-900 font-semibold text-lg mb-2"
                    >
                      <FontAwesomeIcon className="mr-2" icon={faMapMarkerAlt} />
                      Pick-up Location
                    </label>
                    <input
                      className="bg-gray-200 h-10 p-4 mb-6 focus:outline-blue-500 rounded"
                      type="text"
                      id="location"
                      name="location"
                      placeholder="Location"
                      required
                    />
                    <label
                      htmlFor="date-time"
                      className="text-gray-900 font-semibold text-lg mb-2"
                    >
                      <FontAwesomeIcon className="mr-2" icon={faCalendar} />
                      Pick-up Date & Time
                    </label>
                    <input
                      className="bg-gray-200 h-10 p-4 focus:outline-blue-500 rounded"
                      type="datetime-local"
                      name="date"
                      id="date-time"
                      required
                    />
                  </div>
                </div>
                <div className="lg:w-1/2 xl:w-1/2 mb-10 lg:mb-0 xl:mb-0 flex flex-col mx-auto items-center text-left">
                  <h2 className="text-gray-900 font-bold text-lg mb-4 lg:mb-0 xl:mb-0">
                    Car -{" "}
                    <span className="text-blue-500">
                      {car.manufacturer} {car.model}
                    </span>
                  </h2>
                  <img src={carImage} className="size-[80%] object-contain" />
                </div>
              </div>
              <div className="w-full mx-auto px-6 mt-6">
                <h2 className="uppercase text-blue-500 text-xl font-semibold">
                  Personal Information
                </h2>
                <div className="mt-8 pb-10">
                  <div className="grid grid-cols-2 text-left gap-x-6">
                    <label
                      htmlFor="first-name"
                      className="text-gray-500 font-semibold text-lg mb-2"
                    >
                      First Name
                    </label>
                    <label
                      htmlFor="last-name"
                      className="text-gray-500 font-semibold text-lg mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      className="bg-gray-200 h-12 p-4 focus:outline-blue-500 mb-4 rounded"
                      id="first-name"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      required
                    />
                    <input
                      className="bg-gray-200 h-12 p-4 focus:outline-blue-500 mb-4 rounded"
                      id="last-name"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      required
                    />
                    <label
                      htmlFor="phone"
                      className="text-gray-500 font-semibold text-lg"
                    >
                      Phone Number
                    </label>
                    <label
                      htmlFor="age"
                      className="text-gray-500 font-semibold text-lg"
                    >
                      Age
                    </label>
                    <input
                      className="bg-gray-200 h-12 p-4 focus:outline-blue-500 mb-4 rounded"
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      required
                    />
                    <input
                      className="bg-gray-200 h-12 p-4 focus:outline-blue-500 rounded"
                      id="age"
                      name="age"
                      type="number"
                      min={18}
                      max={70}
                      placeholder="Age"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-gray-500 font-semibold text-lg text-left"
                    >
                      Email
                    </label>
                    <input
                      className="bg-gray-200 h-12 p-4 mb-4 focus:outline-blue-500 rounded"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      required
                    />

                    <label
                      htmlFor="address"
                      className="text-gray-500 font-semibold text-lg text-left"
                    >
                      Address
                    </label>
                    <input
                      className="bg-gray-200 h-12 p-4 mb-4 focus:outline-blue-500 rounded"
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Address"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 mb-6">
                    <label
                      htmlFor="city"
                      className="text-gray-500 font-semibold text-lg text-left"
                    >
                      City
                    </label>
                    <label
                      htmlFor="zip"
                      className="text-gray-500 font-semibold text-lg text-left"
                    >
                      Zip Code
                    </label>
                    <input
                      className="bg-gray-200 h-12 p-4 focus:outline-blue-500 rounded"
                      id="city"
                      name="city"
                      type="text"
                      placeholder="City"
                      required
                    />
                    <input
                      className="bg-gray-200 h-12 p-4 focus:outline-blue-500 rounded"
                      id="zip"
                      name="zip"
                      type="text"
                      placeholder="Zip Code"
                      required
                    />
                  </div>
                  {error && <p className="text-center text-red-500 mb-4">{error}</p>}
                  <div className="flex justify-center lg:justify-end xl:justify-end">
                    {isLoading ? <div className="mr-[48%] max-lg:mr-0 mt-10"><LoadingSpinner /></div> : <button className="h-16 bg-blue-500 text-white font-semibold rounded-md w-2/3 lg:w-1/3 xl:w-1/3 text-xl shadow-md shadow-gray-500 hover:bg-blue-700 transition duration-300">
                      Reserve
                    </button>}
                  </div>
                </div>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: direction === "right" ? 30 : -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full text-left rounded-lg shadow-lg shadow-gray-500"
      >
        <img
          src={car.image || image}
          className="h-[40%] w-full object-cover"
          alt={`${car.manufacturer} ${car.model}`}
        />
        <h3 className="text-gray-800 text-2xl font-semibold my-4 pl-6">
          {car.manufacturer} {car.model}
        </h3>
        <div className="text-gray-500 border-b-2 mx-4 pb-2 pl-2">
          <div className="flex gap-2 text-2xl pt-2 pb-6">
            <FontAwesomeIcon icon={faCalendar} className="h-6" />
            {car.year}
            <FontAwesomeIcon
              icon={faWrench}
              className="h-6 ml-28 lg:ml-16 xl:ml-16"
            />{" "}
            {car.engine}
          </div>
          <div className="flex gap-2 text-2xl pb-6">
            <FontAwesomeIcon icon={faBolt} className="h-6" />
            {car.power} hp
            <FontAwesomeIcon
              icon={faGear}
              className="h-6 ml-[88px] lg:ml-10 xl:ml-10"
            />
            {car.gearbox}
          </div>
        </div>
        <div className="flex justify-between mx-4 pt-4">
          <span className="text-gray-500 text-2xl font-semibold">Price</span>
          <span className="text-gray-700 text-2xl font-bold">
            {car.price ?? car.pricePerDay} €
            {!car.isForSale && (
              <span className="text-gray-500 font-semibold"> /day</span>
            )}
          </span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="text-white font-semibold text-xl h-12 w-[90%] lg:w-[85%] xl:w-[85%] mx-6 mt-5 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {car.isForSale ? "Book Test Drive" : "Rent Now"}
        </button>
        <Link onClick={() => window.scrollTo(400, 400)} to={`${car._id}`} className="text-black">Go to</Link>
      </motion.div>
    </>
  );
}
