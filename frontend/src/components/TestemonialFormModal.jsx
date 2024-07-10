import { useContext, useState } from "react";
import Modal from "./UI/Modal";
import LoadingSpinner from "./UI/LoadingSpinner";
import { AuthContext } from "../context/auth-context";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import { addTestemonial, updateTestemonial } from "../api/testemonials";

export default function TestemonialFormModal({ testemonial, closeModal }) {
    const auth = useContext(AuthContext);
    const [testemonialData, setTestemonialData] = useState(testemonial || {
        message: '',
        rating: '',
        city: '',
        country: '',
    });

    function handleChange(event) {
        setTestemonialData((prevTestemonialData) => {
            return {
                ...prevTestemonialData,
                [event.target.name]: event.target.value
            };
        });
    };

    const { mutate, isPending: isLoading, isError, error } = useMutation({
        mutationFn: testemonial ? updateTestemonial : addTestemonial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testemonials'] });
            window.scrollTo(0, 0);
            closeModal();
            toast.success(testemonial ? 'Testemonial updated successfully' : 'Testemonial added successfully');
        },
    })

    function handleSubmit(event) {
        event.preventDefault();
        mutate({ ...testemonialData, token: auth.token });
    };

    return (
        <Modal closeModal={closeModal}>
            <div className="flex flex-row justify-between px-5 bg-blue-500 h-14 w-full">
                <h2 className="uppercase font-semibold text-white text-2xl pt-3">
                    {testemonial ? "Edit" : "Add"} Testemonial
                </h2>
                <button onClick={closeModal} className="text-white text-2xl font-bold">X</button>
            </div>
            <form onSubmit={handleSubmit} className="w-[90%] mx-auto mt-6 pb-12">
                <div className="flex flex-col mb-4">
                    <label htmlFor="message" className="font-bold text-xl mb-2">Message <span className="text-gray-400">(max. 150 characters)</span></label>
                    <textarea id="message" name="message" maxLength={150} required placeholder="Enter message" onChange={handleChange} value={testemonialData.message} className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-blue-500" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="rating" className="font-bold text-xl mb-2">Rating</label>
                    <input type="number" id="rating" name="rating" required min="1" max="5" onChange={handleChange} value={testemonialData.rating} placeholder="Enter rating" className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-blue-500" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="city" className="font-bold text-xl mb-2">City</label>
                    <input type="text" id="city" name="city" required placeholder="Enter city" onChange={handleChange} value={testemonialData.city} className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-blue-500" />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="country" className="font-bold text-xl mb-2">Country</label>
                    <input type="text" id="country" name="country" required placeholder="Enter country" onChange={handleChange} value={testemonialData.country} className="bg-gray-200 text-gray-700 p-3 rounded focus:outline-blue-500" />
                </div>
                {isError && <h2 className="text-red-500 text-xl font-semibold my-8 text-center">{error.message}</h2>}
                {isLoading ? <div className="mt-6 flex justify-center"><LoadingSpinner /></div> : <button type="submit" className="mt-2 w-full bg-blue-600 h-14 sm:h-16 md:h-16 lg:h-14 text-xl font-semibold text-white rounded hover:bg-blue-800 transition duration-300">{testemonial ? 'Save changes' : 'Add Testemonial'}</button>}
            </form>
        </Modal>
    );
};