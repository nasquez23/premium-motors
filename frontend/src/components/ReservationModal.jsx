import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./UI/Modal";
import { faCalendar, faMapMarkerAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "./UI/LoadingSpinner";

export default function ReservationModal({ car, handleCloseModal }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showConfirmationModal, setshowConfirmationModal] = useState(false);

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

            setshowConfirmationModal(true);
        } catch (err) {
            setError(err.message);
        }
    }

    function handleCloseAllModals() {
        handleCloseModal();
        setshowConfirmationModal(false);
    }

    return <>
        {showConfirmationModal ? <Modal closeModal={handleCloseAllModals}>
            <div className="flex flex-row justify-between px-5 bg-blue-500 h-14 w-full">
                <h2 className="uppercase font-semibold text-white text-2xl pt-3">
                    Reservation Complete
                </h2>
                <button onClick={handleCloseAllModals} className="text-white text-2xl font-bold">X</button>
            </div>
            <div className="flex flex-col items-center mt-[5%] mb-[5%]">
                <FontAwesomeIcon icon={faCheck} className="text-neutral-50 text-5xl mb-4 rounded-full bg-blue-500 p-4" />
                <h2 className="text-blue-500 text-2xl font-semibold mb-4">Thank you for your reservation!</h2>
                <p className="text-gray-800 text-lg">You will receive an email with the details of your reservation.</p>
            </div>
        </Modal> :
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
                        <img src={car.image} className="size-[80%] object-contain" />
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
        </Modal>}
    </>
}