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
} from "@fortawesome/free-solid-svg-icons";

export default function CarCard({ car }) {
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

  const carImage = carImages[`${car.manufacturer} ${car.model}`];

  return (
    <div className="w-1/4 h-96 text-left rounded-lg overflow-hidden shadow-lg shadow-gray-500">
      <img src={carImage} className="h-[40%] w-full object-cover" />
      <h3 className="text-gray-800 text-xl font-semibold my-4 ml-4">
        {car.manufacturer} {car.model}
      </h3>
      <div className="text-gray-500 border-b-2 mx-4">
        <div className="flex gap-2 text-xl pt-2 pb-4">
          <FontAwesomeIcon icon={faCalendar} className="h-6" />
          {car.year}
          <FontAwesomeIcon icon={faWrench} className="h-6 ml-8" /> {car.engine}
        </div>
        <div className="flex gap-2 text-xl pb-6">
          <FontAwesomeIcon icon={faBolt} className="h-6" />
          {car.power}
          <FontAwesomeIcon icon={faGear} className="h-6 ml-5" />
          {car.gearbox}
        </div>
      </div>
      <div className="flex justify-between mx-4 pt-6">
        <span className="text-gray-500 text-xl font-semibold">Price</span>
        <span className="text-gray-700 text-xl font-bold">
          {car.price ?? car.pricePerDay}
          {car.pricePerDay && (
            <span className="text-gray-500 font-semibold"> /day</span>
          )}
        </span>
      </div>
    </div>
  );
}
