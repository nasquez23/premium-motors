import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/UI/PageHeader";
import Title from "../components/UI/Title";
import CarCard from "../components/CarCard";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { AuthContext } from "../context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSync, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

export default function Cars() {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [saleOrRentOnly, setSaleOrRentOnly] = useState('');

  useEffect(() => {
    async function fetchCars() {
      try {
        setIsLoading(true);
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/cars");
        const resData = await response.json();
        setCars(resData);
        setFilteredCars(resData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCars();
  }, []);

  const modelsByManufacturer = new Map();
  cars.forEach(car => {
    if (!modelsByManufacturer.has(car.manufacturer))
      modelsByManufacturer.set(car.manufacturer, []);

    if (!modelsByManufacturer.get(car.manufacturer).includes(car.model))
      modelsByManufacturer.get(car.manufacturer).push(car.model);
  });

  const filterCars = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const filtersData = Object.fromEntries(formData.entries());
    setSaleOrRentOnly(filtersData.saleOrRentOnly);

    const filtered = cars.filter(car => {
      const carName = car.manufacturer + ' ' + car.model;
      const filterBySearchTerm = filtersData.searchTerm === '' || carName.toLowerCase().includes(filtersData.searchTerm.toLowerCase());
      const filterByManufacturer = filtersData.manufacturer === '' || car.manufacturer === filtersData.manufacturer;
      const filterByModel = !filtersData.model || car.model === filtersData.model;
      const filterByPriceFrom = filtersData.priceFrom === '' || car.price >= Number(filtersData.priceFrom);
      const filterByPriceTo = filtersData.priceTo === '' || car.price <= Number(filtersData.priceTo);
      const filterByYearFrom = filtersData.yearFrom === '' || car.year >= Number(filtersData.yearFrom);
      const filterByYearTo = filtersData.yearTo === '' || car.year <= Number(filtersData.yearTo);
      const filterByPowerFrom = filtersData.powerFrom === '' || car.power >= Number(filtersData.powerFrom);
      const filterByPowerTo = filtersData.powerTo === '' || car.power <= Number(filtersData.powerTo);
      const filterByGearbox = filtersData.gearbox === '' || car.gearbox === filtersData.gearbox;

      return filterBySearchTerm && filterByManufacturer && filterByModel && filterByPriceFrom && filterByPriceTo && filterByYearFrom && filterByYearTo && filterByPowerFrom && filterByPowerTo && filterByGearbox;
    });

    setFilteredCars(filtered);
  };

  const resetForm = (event) => {
    event.preventDefault();
    setSelectedManufacturer('');
    setSaleOrRentOnly('');
    setFilteredCars(cars);
    event.target.reset();
    document.getElementById('forSaleOnly').checked = false;
    document.getElementById('forRentOnly').checked = false;
    document.getElementById('searchTerm').value = '';
  };

  const carsForSale = filteredCars.filter(car => car.isForSale === true);
  const carsForRent = filteredCars.filter(car => car.isForSale === false);

  const priceOptions = [5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 200000];

  if (isLoading) {
    return <div className="flex flex-col items-center gap-y-8 justify-center mb-16">
      <Title title="Cars For Sale" />
      <LoadingSpinner />
      <Title title="Cars For Rent" />
      <LoadingSpinner />
    </div>
  }

  return (
    <>
      <PageHeader title="Discover Your Dream Ride" />
      <div className="relative pt-6">
        <form onSubmit={filterCars} onReset={resetForm} className="mb-[5%] max-lg:mb-[20%]">
          <div className="flex justify-center">
            <input id="searchTerm" name="searchTerm" type="search" placeholder="Search for cars" className="w-[50%] max-lg:w-3/4 text-gray-500 font-semibold h-12 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300" />
            <button className="text-white py-2 px-3 rounded-lg ml-2 text-2xl bg-blue-500 hover:bg-blue-700 transition duration-300"><FontAwesomeIcon icon={faSearch} /></button>
          </div>
          <div className="flex flex-row max-lg:flex-col max-lg:w-[85%] max-lg:mx-auto text-gray-600 justify-center mt-6 gap-x-5 font-semibold">
            <div className="flex flex-col gap-y-1">
              <select id="manufacturer" name="manufacturer" value={selectedManufacturer} className={`bg-gray-200 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent transition duration-300`} onChange={e => setSelectedManufacturer(e.target.value)}>
                <option value=''>Select Manufacturer</option>
                {Array.from(modelsByManufacturer.keys()).sort().map(manufacturer => <option key={manufacturer} value={manufacturer} className="text-gray-600 font-semibold">{manufacturer}</option>)}
              </select>
              <select id="model" name="model" className="bg-gray-200 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent transition duration-300 max-lg:mb-1" disabled={selectedManufacturer === ''}>
                <option value="">Select Model</option>
                {selectedManufacturer !== '' && modelsByManufacturer.get(selectedManufacturer).map(model => <option key={model} value={model} className="text-gray-600 font-semibold">{model}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-y-1">
              <select id="priceFrom" name="priceFrom" className="bg-gray-200 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent transition duration-300">
                <option value="">Select Price From</option>
                {priceOptions.map(price => <option value={price} key={price} className="text-gray-600 font-semibold">{price}</option>)}
              </select>
              <select id="priceTo" name="priceTo" className="bg-gray-200 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent transition duration-300 max-lg:mb-1">
                <option value="">Select Price To</option>
                {priceOptions.map(price => <option value={price} key={price} className="text-gray-600 font-semibold">{price}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-y-1">
              <select id="yearFrom" name="yearFrom" className="bg-gray-200 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent transition duration-300">
                <option value="">Select Year From</option>
                {Array.from(new Array(30), (x, i) => new Date().getFullYear() - i).map(year => <option key={year} value={year} className="text-gray-600 font-semibold">{year}</option>)}
              </select>
              <select id="yearTo" name="yearTo" className="bg-gray-200 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent transition duration-300 max-lg:mb-1">
                <option value="">Select Year To</option>
                {Array.from(new Array(30), (x, i) => new Date().getFullYear() - i).map(year => <option key={year} value={year} className="text-gray-600 font-semibold">{year}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-y-1">
              <select id="powerFrom" name="powerFrom" className="bg-gray-200 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent transition duration-300">
                <option value="">Select Power From</option>
                {Array.from(new Array(10), (x, i) => i * 50 + 50).map(power => <option key={power} value={power} className="text-gray-600 font-semibold">{power}</option>)}
              </select>
              <select id="powerTo" name="powerTo" className="bg-gray-200 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent transition duration-300">
                <option value="">Select Power To</option>
                {Array.from(new Array(10), (x, i) => i * 50 + 50).map(power => <option key={power} value={power} className="text-gray-600 font-semibold">{power}</option>)}
              </select>
            </div>
          </div>
          <div className="text-gray-600 font-semibold flex flex-row max-lg:flex-col max-lg:w-[85%] max-lg:mx-auto justify-center mt-3 max-lg:mt-1 gap-x-5">
            <select id="gearbox" name="gearbox" className="bg-gray-200 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent transition duration-300">
              <option value="">Select Gearbox</option>
              <option value="Manual" className="text-gray-600 font-semibold">Manual</option>
              <option value="Automatic" className="text-gray-600 font-semibold">Automatic</option>
            </select>
            <div className="pt-2 flex justify-center">
              <input className="ml-5" id="forSaleOnly" name="saleOrRentOnly" value="saleOnly" type="radio" /><label className="pt-[6px] max-lg:pt-[1px] ml-1">For Sale Only</label>
              <input className="ml-5" id="forRentOnly" name="saleOrRentOnly" value="rentOnly" type="radio" /><label className="pt-[6px] max-lg:pt-[1px] ml-1">For Rent Only</label>
            </div>
            <button type="reset" className="text-white max-lg:w-[40%] max-lg:mx-auto max-lg:py-3 max-lg:mt-5 rounded-lg px-5 bg-blue-500 hover:bg-blue-700 transition duration-300"><FontAwesomeIcon icon={faSyncAlt} /> Reset</button>
          </div>
        </form>
        {auth.isLoggedIn && <div className="text-center w-[25%] max-lg:w-[60%] mx-auto mt-10">
          <Link to="/cars/new" className="text-white px-5 py-4 font-semibold bg-blue-500 h-12 w-[60%] rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => window.scrollTo(0, 0)} >
            <span className="text-2xl">+</span> Add New Vehicle
          </Link>
        </div>}
        {saleOrRentOnly !== 'rentOnly' && (
          <>
            <Title title="Cars For Sale" />
            {carsForSale.length === 0 && <h2 className="text-gray-700 text-center text-2xl font-semibold mt-[10%] ml-[0%]">No cars found.</h2>}
            <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-16 lg:gap-8 xl:gap-8 mt-20 mb-40">
              {carsForSale.length > 0 && carsForSale.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
          </>
        )}
        {saleOrRentOnly !== 'saleOnly' && (
          <>
            <Title title="Cars For Rent" />
            {carsForRent.length === 0 && <h2 className="text-gray-700 text-center text-2xl font-semibold mt-[10%] ml-[0%]">No cars found.</h2>}
            <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-20 mb-32">
              {carsForRent.length > 0 && carsForRent.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
