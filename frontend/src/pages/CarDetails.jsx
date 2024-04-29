import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import PageHeader from "../components/UI/PageHeader";
import Title from "../components/UI/Title";

export default function CarDetails() {
    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCarDetails() {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:3000/api/cars/${carId}`);

                setIsLoading(false);
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const resData = await response.json();
                setCar(resData);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchCarDetails();
    }, []);

    if (isLoading) {
        return <div className="flex flex-col items-center gap-y-8 justify-center my-[10%]">
            <LoadingSpinner />
        </div>
    }

    if (error) {
        return <h2 className="text-gray-700 text-center text-2xl font-semibold my-[10%] ml-[0%]">The car you are looking for could not be found.</h2>
    }

    console.log(car);

    return (
        <>
            <PageHeader title="Car Details" />
            {!isLoading && car && <div className="flex flex-row max-lg:flex-col gap-x-5 w-[80%] mx-auto my-[15%] shadow-lg shadow-gray-700 p-10 max-lg:p-5 rounded-md">
                <img src={car.image} className="object-cover rounded w-full lg:w-[50%] xl:w-[50%]" style={{ maxHeight: "500px" }} />
                <div className="w-1/2 max-lg:w-full mx-auto divide-y-4 border-4 text-gray-700 font-semibold text-3xl max-lg:text-2xl max-lg:mt-10">
                    <div className="flex flex-row divide-x-4 p-2">
                        <h2 className="text-center font-semibold w-1/2">Manufacturer</h2>
                        <h2 className="text-center text-blue-500 font-semibold px-4">{car.manufacturer}</h2>
                    </div>
                    <div className="flex flex-row divide-x-4 p-2">
                        <h2 className="text-center font-semibold w-1/2">Model</h2>
                        <h2 className="text-center text-blue-500 font-semibold px-4">{car.model}</h2>
                    </div>
                    <div className="flex flex-row divide-x-4 p-2">
                        <h2 className="text-center font-semibold w-1/2">Year</h2>
                        <h2 className="text-center text-blue-500 font-semibold px-4">{car.year}</h2>
                    </div>
                    <div className="flex flex-row divide-x-4 p-2">
                        <h2 className="text-center font-semibold w-1/2">Engine</h2>
                        <h2 className="text-center text-blue-500 font-semibold px-4">{car.engine}</h2>
                    </div>
                    <div className="flex flex-row divide-x-4 p-2">
                        <h2 className="text-center font-semibold w-1/2">Power</h2>
                        <h2 className="text-center text-blue-500 font-semibold px-4">{car.power} hp</h2>
                    </div>
                    <div className="flex flex-row divide-x-4 p-2">
                        <h2 className="text-center font-semibold w-1/2">Gearbox</h2>
                        <h2 className="text-center text-blue-500 font-semibold px-4">{car.gearbox}</h2>
                    </div>
                    <div className="flex flex-row divide-x-4 p-2">
                        <h2 className="text-center font-semibold w-1/2">Price</h2>
                        <h2 className="text-center text-blue-500 font-semibold px-4">{car.price} €</h2>
                    </div>
                    <div>
                        <h2 className="text-center p-2">For {car.isForSale ? "Sale" : "Rent"}</h2>
                    </div>
                </div>
            </div>}
        </>
    );
}