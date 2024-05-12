import { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import CarForm from '../components/CarForm';
import PageHeader from "../components/UI/PageHeader";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { AuthContext } from "../context/auth-context";

export default function EditCar() {
    const auth = useContext(AuthContext);
    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isLoggedIn) {
            navigate("/cars");
            return;
        }

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
    }, [auth.isLoggedIn]);

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