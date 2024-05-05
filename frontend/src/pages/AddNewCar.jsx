import CarForm from "../components/CarForm";
import PageHeader from "../components/UI/PageHeader";

export default function AddNewCar() {
    return (
        <>
            <PageHeader title="Add New Car" />
            <div className="mt-[15%] max-lg:mt-[30%] mb-[10%] max-lg:mb-[20%]">
                <CarForm />
            </div>
        </>
    );
}