import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "./UI/LoadingSpinner";
import ErrorModal from "./UI/ErrorModal";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../context/auth-context";
import { useMutation } from "@tanstack/react-query";
import { addCar, updateCar } from "../api/cars";
import { queryClient } from "../main";

export default function CarForm({ car }) {
    const auth = useContext(AuthContext);
    const fileInputRef = useRef();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(car ? car.image : null);
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
        const { name, value, type, checked } = event.target;
        if (type === 'file') {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setImagePreview(fileReader.result);
                setCarData((prevCarData) => ({
                    ...prevCarData,
                    image: event.target.files[0]
                }));
            };
            fileReader.readAsDataURL(event.target.files[0]);
        } else {
            setCarData((prevCarData) => ({
                ...prevCarData,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    }

    const { mutate, isPending: isLoading, isError, error } = useMutation({
        mutationFn: pathname.includes('edit') ? updateCar : addCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
            window.scrollTo(0, 0);
            navigate('/cars');
            toast.success(pathname.includes('edit') ? 'Car updated successfully' : 'Car added successfully');
        },
    });

    useEffect(() => {
        if (isError) {
            setShowErrorModal(true);
        }
    }, [isError]);

    function handleSubmit(event) {
        event.preventDefault();
        mutate({ ...carData, token: auth.token });
    }

    return (
        <>
            <AnimatePresence>
                {showErrorModal && <ErrorModal errorMessage={error.message} closeModal={() => setShowErrorModal(false)} />}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="w-[70%] max-lg:w-[85%] mx-auto text-gray-800 rounded-md shadow-lg shadow-gray-700 px-[10%] max-lg:px-[7%] py-[5%] max-lg:mt-[40%]">
                <div className="flex flex-col mb-4">
                    <label htmlFor="manufacturer" className="font-bold text-xl mb-2">Manufacturer</label>
                    <input type="text" id="manufacturer" name="manufacturer" value={carData.manufacturer} onChange={handleChange} required placeholder="Enter manufacturer" className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="model" className="font-bold text-xl mb-2">Model</label>
                    <input type="text" id="model" name="model" value={carData.model} onChange={handleChange} required placeholder="Enter model" className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="year" className="font-bold text-xl mb-2">Year</label>
                    <input type="number" id="year" name="year" value={carData.year} onChange={handleChange} required placeholder="Enter year" className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="engine" className="font-bold text-xl mb-2">Engine</label>
                    <input type="text" id="engine" name="engine" value={carData.engine} onChange={handleChange} required placeholder="Enter engine" className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="power" className="font-bold text-xl mb-2">Power</label>
                    <input type="number" id="power" name="power" min={1} max={2000} value={carData.power} onChange={handleChange} required placeholder="Enter power" className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="gearbox" className="font-bold text-xl mb-2">Gearbox</label>
                    <select id="gearbox" name="gearbox" value={carData.gearbox} required onChange={handleChange} className={`bg-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${carData.gearbox === '' && 'text-gray-400'}`}>
                        <option value="" className="text-gray-400">Select gearbox</option>
                        <option value="Manual" className="text-gray-700">Manual</option>
                        <option value="Automatic" className="text-gray-700">Automatic</option>
                    </select>
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="price" className="font-bold text-xl mb-2">Price</label>
                    <input type="number" id="price" name="price" min={1} max={5000000} value={carData.price} onChange={handleChange} required placeholder="Enter price" className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" />
                </div>
                <div className="flex flex-col mb-5">
                    {carData.image && <img src={imagePreview} alt="Car" className="flex w-3/4 max-lg:w-full h-[250px] max-lg:h-[200px] object-left object-contain max-lg:object-contain rounded-md" />}
                    <input ref={fileInputRef} type="file" id="image" name="image" accept=".jpg,.jpeg,.png" onChange={handleChange} className="hidden" />
                    <button className="mt-3 text-center text-white font-semibold w-[30%] max-lg:w-[100%] rounded bg-blue-500 hover:bg-blue-700 transition duration-300 p-3" type="button" onClick={() => fileInputRef.current.click()}>Pick Image</button>
                </div>
                <div className="flex flex-row gap-x-4 mb-4">
                    <label htmlFor="isForSale" className="font-bold text-xl mb-2">Is for sale</label>
                    <input type="checkbox" checked={carData.isForSale} onChange={handleChange} id="isForSale" name="isForSale" className="w-5 h-7" />
                </div>
                {isLoading ? <div className="mt-6 flex justify-center"><LoadingSpinner /></div> : <button type="submit" className="mt-10 w-full bg-blue-600 h-14 sm:h-16 md:h-16 lg:h-14 text-xl font-semibold text-white rounded hover:bg-blue-800 transition duration-300">Submit</button>}
            </form>
        </>
    );
}
