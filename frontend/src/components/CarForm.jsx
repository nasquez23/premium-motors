import { useContext, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import LoadingSpinner from "./UI/LoadingSpinner";
import ErrorModal from "./UI/ErrorModal";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../context/auth-context";

export default function CarForm({ car }) {
    const auth = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [carData, setCarData] = useState(car || {
        manufacturer: '',
        model: '',
        year: '',
        engine: '',
        power: '',
        gearbox: '',
        price: '',
        image: '',
        isForSale: false
    });
    const { pathname } = useLocation();
    const navigate = useNavigate();

    function handleChange(event) {
        setCarData((prevCarData) => {
            return {
                ...prevCarData,
                [event.target.name]: event.target.checked || event.target.value
            };
        });
    }

    async function handleSubmit(event) {
        console.log(auth.token)
        event.preventDefault();
        const method = pathname.includes('edit') ? 'PATCH' : 'POST';
        const route = pathname.includes('edit') ? `${process.env.REACT_APP_BACKEND_URL}/cars/${car._id}` : `${process.env.REACT_APP_BACKEND_URL}/cars/add`;
        const toastMessage = pathname.includes('edit') ? 'Car updated successfully' : 'Car added successfully';

        try {
            setIsLoading(true);
            const response = await fetch(route, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(carData)
            });
            const responseData = await response.json();
            setIsLoading(false);

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            window.scrollTo(0, 0);
            navigate('/cars');
            toast.success(toastMessage);
        } catch (err) {
            setError(err.message);
        }
    }

    function handleCloseErrorModal() {
        setError(null);
    }

    return (
        <>
            <AnimatePresence>
                {error && <ErrorModal errorMessage={error} closeModal={handleCloseErrorModal} />}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="w-[70%] mx-auto text-gray-800 rounded-md shadow-lg shadow-gray-700 px-[10%] py-[5%]">
                <div className="flex flex-col mb-4">
                    <label htmlFor="manufacturer" className="font-bold text-xl mb-2">Manufacturer</label>
                    <input type="text" id="manufacturer" name="manufacturer" value={carData.manufacturer} onChange={handleChange} required placeholder="Enter manufacturer" className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-blue-500" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="model" className="font-bold text-xl mb-2">Model</label>
                    <input type="text" id="model" name="model" value={carData.model} onChange={handleChange} required placeholder="Enter model" className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-blue-500" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="year" className="font-bold text-xl mb-2">Year</label>
                    <input type="number" id="year" name="year" value={carData.year} onChange={handleChange} required placeholder="Enter year" className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-blue-500" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="engine" className="font-bold text-xl mb-2">Engine</label>
                    <input type="text" id="engine" name="engine" value={carData.engine} onChange={handleChange} required placeholder="Enter engine" className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-blue-500" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="power" className="font-bold text-xl mb-2">Power</label>
                    <input type="number" id="power" name="power" min={1} max={2000} value={carData.power} onChange={handleChange} required placeholder="Enter power" className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-blue-500" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="gearbox" className="font-bold text-xl mb-2">Gearbox</label>
                    <input type="text" id="gearbox" name="gearbox" value={carData.gearbox} onChange={handleChange} required placeholder="Enter gearbox" className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-blue-500" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="price" className="font-bold text-xl mb-2">Price</label>
                    <input type="number" id="price" name="price" min={1} max={5000000} value={carData.price} onChange={handleChange} required placeholder="Enter price" className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-blue-500" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="image" className="font-bold text-xl mb-2">Image</label>
                    <input type="text" id="image" name="image" value={carData.image} onChange={handleChange} required placeholder="Enter image" className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-blue-500" />
                </div>
                <div className="flex flex-row gap-x-4 mb-4">
                    <label htmlFor="isForSale" className="font-bold text-xl mb-2">Is for sale</label>
                    <input type="checkbox" checked={carData.isForSale} onChange={handleChange} id="isForSale" name="isForSale" className="w-5 h-7" />
                </div>
                {isLoading ? <div className="mt-6 flex justify-center"><LoadingSpinner /></div> : <button type="submit" className="mt-2 w-full bg-blue-600 h-14 sm:h-16 md:h-16 lg:h-14 text-xl font-semibold text-white rounded hover:bg-blue-800 transition duration-300">Submit</button>}
            </form>
        </>

    );
}