import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import CarForm from '../components/CarForm';
import PageHeader from "../components/UI/PageHeader";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { AuthContext } from "../context/auth-context";
import { checkAuth } from "../util/checkAuth";

export default function EditCar() {
    const auth = useContext(AuthContext);
    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    checkAuth(!auth.isLoggedIn, '/cars');

    useEffect(() => {
        async function fetchCarDetails() {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cars/${carId}`, {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                });

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

    if (car) {
        car.image = `${process.env.REACT_APP_BACKEND_URL}/${car.image}`;
    }

    if (isLoading) {
        return <div className="flex flex-col items-center gap-y-8 justify-center my-[10%]">
            <LoadingSpinner />
        </div>
    }

    if (error) {
        return <h2 className="text-gray-700 text-center text-2xl font-semibold my-[10%] ml-[0%]">The car you are looking for could not be found.</h2>
    }

    return (
        <>
            <PageHeader title="Edit car" />
            {!isLoading && car && <div className="mt-[15%] mb-[10%]"><CarForm car={car} /></div>}
        </>
    );
}