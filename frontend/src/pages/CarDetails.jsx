import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import PageHeader from "../components/UI/PageHeader";
import { AuthContext } from "../context/auth-context";
import Modal from "../components/UI/Modal";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCar, getCarById } from "../api/cars";
import { queryClient } from "../main";

export default function CarDetails() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { carId } = useParams();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const { data: car, isLoading, isError } = useQuery({
        queryKey: ['cars', carId],
        queryFn: () => getCarById(carId)
    });

    const { mutate, isPending: isDeleting, isError: errorWhileDeleting, error } = useMutation({
        mutationFn: deleteCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
            window.scrollTo(0, 0);
            navigate('/cars');
            toast.success("Car deleted successfully");
        }
    });

    useEffect(() => {
        if (errorWhileDeleting) {
            setErrorMessage(error.message);
        }
    }, [errorWhileDeleting]);

    function handleDeleteCar() {
        mutate({ carId, token: auth.token });
    }

    if (isLoading) {
        return <div className="flex flex-col items-center gap-y-8 justify-center my-[10%]">
            <LoadingSpinner />
        </div>
    }

    if (isError) {
        return <h2 className="text-gray-700 text-center text-2xl font-semibold my-[10%] ml-[0%]">The car you are looking for could not be found.</h2>
    }

    function handleCloseConfirmationModal() {
        setShowConfirmationModal(false);
        setErrorMessage(null);
    }

    return (
        <>
            <AnimatePresence>
                {showConfirmationModal && <Modal closeModal={handleCloseConfirmationModal}>
                    <div className="flex flex-row justify-between px-5 bg-blue-500 h-14 w-full">
                        <h2 className="uppercase font-semibold text-white text-2xl pt-3">
                            Delete Car
                        </h2>
                        <button
                            onClick={handleCloseConfirmationModal}
                            className="text-white text-2xl font-bold"
                        >
                            X
                        </button>
                    </div>
                    {isDeleting && <div className="flex justify-center py-20"><LoadingSpinner /></div>}
                    {errorMessage && <div className="flex justify-center">
                        <h2 className="text-red-500 text-2xl font-semibold my-10">{errorMessage}</h2>
                    </div>}
                    {!isDeleting && !errorMessage && <div>
                        <div>
                            <h2 className="text-gray-700 text-center text-2xl font-semibold my-10">Are you sure you want to delete this car?</h2>
                        </div>
                        <div className="flex justify-end max-lg:justify-center pr-12 max-lg:pr-0 gap-x-6 pb-10 text-xl font-semibold">
                            <button onClick={handleCloseConfirmationModal} className="text-gray-700 hover:text-gray-900 transition duration-300">Cancel</button>
                            <button onClick={handleDeleteCar} className="bg-red-500 text-neutral-100 hover:bg-red-700 transition duration-300 rounded-md px-4 py-2">Delete</button>
                        </div>
                    </div>}
                </Modal>}
            </AnimatePresence>

            <PageHeader title="Car Details" />
            {!isLoading && car && <div className="flex flex-col w-[80%] mx-auto my-[15%] max-lg:mt-[35%] max-lg:mb-[25%] shadow-lg shadow-gray-700 p-10 max-lg:p-5 rounded-md">
                <div className="flex flex-row max-lg:flex-col gap-x-5">
                    <img src={car.image} alt={`${car.manufacturer} ${car.model}`} className="object-cover rounded w-full lg:w-[50%] xl:w-[50%]" style={{ maxHeight: "500px" }} />
                    <div className="w-1/2 max-lg:w-full mx-auto divide-y-4 border-4 text-gray-700 font-semibold text-3xl max-lg:text-2xl max-lg:mt-10">
                        <div className="flex flex-row max-lg:flex-col divide-x-4 max-lg:divide-x-0 p-2 max-lg:px-0">
                            <h2 className="text-center font-semibold w-1/2 max-lg:w-full max-lg:mb-1">Manufacturer</h2>
                            <h2 className="text-center text-blue-500 font-semibold px-4">{car.manufacturer}</h2>
                        </div>
                        <div className="flex flex-row max-lg:flex-col divide-x-4 max-lg:divide-x-0 p-2">
                            <h2 className="text-center font-semibold w-1/2 max-lg:w-full max-lg:mb-1">Model</h2>
                            <h2 className="text-center text-blue-500 font-semibold px-4">{car.model}</h2>
                        </div>
                        <div className="flex flex-row max-lg:flex-col divide-x-4 max-lg:divide-x-0 p-2">
                            <h2 className="text-center font-semibold w-1/2 max-lg:w-full max-lg:mb-1">Year</h2>
                            <h2 className="text-center text-blue-500 font-semibold px-4">{car.year}</h2>
                        </div>
                        <div className="flex flex-row max-lg:flex-col divide-x-4 max-lg:divide-x-0 p-2">
                            <h2 className="text-center font-semibold w-1/2 max-lg:w-full max-lg:mb-1">Engine</h2>
                            <h2 className="text-center text-blue-500 font-semibold px-4">{car.engine}</h2>
                        </div>
                        <div className="flex flex-row max-lg:flex-col divide-x-4 max-lg:divide-x-0 p-2">
                            <h2 className="text-center font-semibold w-1/2 max-lg:w-full max-lg:mb-1">Power</h2>
                            <h2 className="text-center text-blue-500 font-semibold px-4">{car.power} hp</h2>
                        </div>
                        <div className="flex flex-row max-lg:flex-col divide-x-4 max-lg:divide-x-0 p-2">
                            <h2 className="text-center font-semibold w-1/2 max-lg:w-full max-lg:mb-1">Gearbox</h2>
                            <h2 className="text-center text-blue-500 font-semibold px-4">{car.gearbox}</h2>
                        </div>
                        <div className="flex flex-row max-lg:flex-col divide-x-4 max-lg:divide-x-0 p-2">
                            <h2 className="text-center font-semibold w-1/2 max-lg:w-full max-lg:mb-1">Price</h2>
                            <h2 className="text-center text-blue-500 font-semibold px-4">{car.price} €</h2>
                        </div>
                        <div>
                            <h2 className="text-center p-2">For {car.isForSale ? "Sale" : "Rent"}</h2>
                        </div>
                    </div>
                </div>
                {auth.isLoggedIn && <div className="flex max-lg:flex-col max-lg:gap-y-4 gap-x-10 w-[40%] max-lg:w-[90%] mx-auto mt-10 text-center text-xl font-semibold text-neutral-100">
                    <Link to={`/cars/edit/${carId}`} onClick={() => window.scrollTo(0, 0)} className="inline-block bg-blue-500 h-12 w-1/2 max-lg:w-full p-2 rounded-md hover:bg-blue-700 transition duration-300">Edit Car</Link>
                    <button onClick={() => setShowConfirmationModal(true)} className="bg-red-500 h-12 w-1/2 max-lg:w-full p-2 rounded-md hover:bg-red-700 transition duration-300">Delete Car</button>
                </div>}
            </div>}
        </>
    );
}