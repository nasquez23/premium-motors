import { useContext } from "react";
import { useParams } from "react-router-dom";
import CarForm from '../components/CarForm';
import PageHeader from "../components/UI/PageHeader";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { AuthContext } from "../context/auth-context";
import { checkAuth } from "../util/checkAuth";
import { useQuery } from "@tanstack/react-query";

export default function EditCar() {
    const auth = useContext(AuthContext);
    const { carId } = useParams();

    checkAuth(!auth.isLoggedIn, '/cars');

    const { data: car, isLoading, error } = useQuery({
        queryKey: ['cars', carId],
        queryFn: () => getCarById(carId)
    });

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