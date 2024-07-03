import { useContext, useState } from "react";

import Modal from "./UI/Modal";
import LoadingSpinner from "./UI/LoadingSpinner";
import { AuthContext } from "../context/auth-context";
import { toast } from "react-toastify";

export default function TestemonialFormModal({ testemonial, closeModal, forceUpdate }) {
    const auth = useContext(AuthContext);
    const [testemonialData, setTestemonialData] = useState(testemonial || {
        message: '',
        rating: '',
        city: '',
        country: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleChange(event) {
        setTestemonialData((prevTestemonialData) => {
            return {
                ...prevTestemonialData,
                [event.target.name]: event.target.value
            };
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const method = testemonial ? 'PATCH' : 'POST';
        const route = testemonial ? `${process.env.REACT_APP_BACKEND_URL}/testemonials/${testemonial._id}` : `${process.env.REACT_APP_BACKEND_URL}/testemonials`;
        const toastMessage = testemonial ? 'Testemonial updated successfully' : 'Testemonial added successfully';

        testemonialData.author = auth.userId;

        try {
            setIsLoading(true);

            const response = await fetch(route, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(testemonialData)
            });
            const responseData = await response.json();

            setIsLoading(false);
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            closeModal();
            toast.success(toastMessage);
            forceUpdate();
        } catch (err) {
            setError(err.message);
        }
    };

    return <Modal closeModal={closeModal}>
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
            {isLoading ? <div className="mt-6 flex justify-center"><LoadingSpinner /></div> : <button type="submit" className="mt-2 w-full bg-blue-600 h-14 sm:h-16 md:h-16 lg:h-14 text-xl font-semibold text-white rounded hover:bg-blue-800 transition duration-300">{testemonial ? 'Save changes' : 'Add Testemonial'}</button>}
        </form>
    </Modal>
};