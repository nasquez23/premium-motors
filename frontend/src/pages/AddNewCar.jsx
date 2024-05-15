import { useContext } from "react";
import CarForm from "../components/CarForm";
import PageHeader from "../components/UI/PageHeader";
import { checkAuth } from "../util/checkAuth";
import { AuthContext } from "../context/auth-context";

export default function AddNewCar() {
    const auth = useContext(AuthContext);
    checkAuth(!auth.isLoggedIn, '/cars');

    return (
        <>
            <PageHeader title="Add New Car" />
            <div className="mt-[15%] max-lg:mt-[30%] mb-[10%] max-lg:mb-[20%]">
                <CarForm />
            </div>
        </>
    );
}