import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faWrench,
  faBolt,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ReservationModal from "./ReservationModal";

export default function CarCard({ car, direction }) {
  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      <AnimatePresence>
        {showModal && <ReservationModal car={car} handleCloseModal={handleCloseModal} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: direction === "right" ? 30 : -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full text-left rounded-lg shadow-lg shadow-gray-500 overflow-hidden"
      >
        <div className="h-[200px]">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/${car.image}`}
            className="size-full object-cover"
            alt={`${car.manufacturer} ${car.model}`}
          />
        </div>
        <h3 className="text-gray-800 text-2xl font-semibold my-4 pl-6">
          {car.manufacturer} {car.model}
        </h3>
        <div className="text-gray-600 border-b-2 mx-4 pb-2 pl-2">
          <div className="flex gap-2 text-2xl pt-2 pb-6">
            <FontAwesomeIcon icon={faCalendar} className="h-6" />
            {car.year}
            <FontAwesomeIcon
              icon={faWrench}
              className="h-6 ml-[18%] max-lg:ml-16"
            />{" "}
            {car.engine}
          </div>
          <div className="flex gap-2 text-2xl pb-6">
            <FontAwesomeIcon icon={faBolt} className="h-6" />
            {car.power} hp
            <FontAwesomeIcon
              icon={faGear}
              className="h-6 ml-[10%] max-lg:ml-8"
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
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="text-white font-semibold text-xl h-12 w-[90%] lg:w-[85%] xl:w-[85%] mx-6 mt-5 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {car.isForSale ? "Book Test Drive" : "Rent Now"}
          </button>
          <Link onClick={() => window.scrollTo(400, 400)} to={`/cars/${car._id}`} className="block w-[85%] max-lg:w-[90%] text-gray-600 rounded-lg mx-6 my-4 h-12 text-center text-xl font-semibold border-2 p-2 hover:border-black transition duration-300">View Details</Link>
        </div>
      </motion.div>
    </>
  );
}
