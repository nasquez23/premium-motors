import { useContext, useEffect, useRef, useState } from "react";

import LoadingSpinner from "../components/UI/LoadingSpinner";
import { AuthContext } from "../context/auth-context";
import ErrorModal from "../components/UI/ErrorModal";
import { AnimatePresence } from "framer-motion";
import PageHeader from "../components/UI/PageHeader";
import Title from "../components/UI/Title";
import TestemonialCard from "../components/TestemonialCard";
import { checkAuth } from "../util/checkAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function Profile() {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userImage, setUserImage] = useState(user?.image);
    const fileInputRef = useRef();

    checkAuth(!auth.isLoggedIn, '/');

    useEffect(() => {
        async function fetchUserData() {
            try {
                if (!auth.userId) {
                    return;
                }

                setIsLoading(true);
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/user/${auth.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                });
                const responseData = await response.json();

                setIsLoading(false);
                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setUser(responseData);
                setUserImage(responseData.image);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchUserData();
    }, [auth.userId]);

    const updateUserProfile = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        for (const key in user) {
            formData.append(key, user[key]);
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/user/${auth.userId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                },
                body: formData
            });
            const responseData = await response.json();

            setIsLoading(false);
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setUser(responseData);
            setIsEditing(false);
            toast.success('Profile updated successfully!');
            auth.login(auth.userId, auth.token, null, responseData.image);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const handleImageChange = (event) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setIsEditing(true);
            setUserImage(fileReader.result);
            setUser((prevUser) => ({
                ...prevUser,
                image: event.target.files[0]
            }));
        };
        fileReader.readAsDataURL(event.target.files[0]);
    };

    if (isLoading) {
        return <div className="pt-[10%] pb-[25%] flex justify-center"><LoadingSpinner /></div>;
    }

    return (
        <>
            <AnimatePresence>
                {error && <ErrorModal errorMessage={error} closeModal={() => setError(null)} />}
            </AnimatePresence>

            <PageHeader title="Profile Overview" />
            <div className="mt-[10%] max-lg:mt-[40%]">
                <Title title="My account" />
                <div className="w-[80%] mt-[5%] mx-auto mb-[10%] flex flex-row max-lg:flex-col">
                    <div className="w-1/4 max-lg:w-2/3 flex ml-[20%] mr-[5%] max-lg:mx-auto max-lg:mt-10 items-center flex-col">
                        <img src={userImage} alt={user.name} className="rounded-full object-contain size-60" />
                        <input ref={fileInputRef} onChange={handleImageChange} type="file" id="image" name="image" accept=".jpg,.jpeg,.png" className="hidden" />
                        <button type="button" onClick={() => fileInputRef.current.click()} className="text-white mt-10 font-semibold rounded p-4 bg-blue-500 hover:bg-blue-700 transition duration-300">Change image</button>
                    </div>
                    <div className="max-lg:mt-10 w-1/2 max-lg:w-full">
                        <div className="flex flex-row">
                            <h2 className="text-3xl text-gray-700 font-semibold mt-4 mb-8">
                                Your profile information
                            </h2>
                            {!isEditing && <button type="button" onClick={() => setIsEditing(true)} className="ml-[20%] -mt-3">
                                <FontAwesomeIcon className="text-gray-700 text-3xl" icon={faEdit} />
                            </button>}
                        </div>
                        {!isEditing ? (
                            <>
                                <p className="text-xl text-gray-800">Name: {user.name}</p>
                                <p className="text-xl text-gray-800">Email: {user.email}</p>
                            </>
                        ) : (
                            <form onSubmit={updateUserProfile}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={user.name}
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <button type="submit" className="text-white mt-4 font-semibold rounded p-4 bg-blue-500 hover:bg-blue-700 transition duration-300">Save Changes</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="text-white mt-4 font-semibold rounded p-4 bg-gray-500 hover:bg-gray-700 transition duration-300 ml-4">Cancel</button>
                            </form>
                        )}
                        {!isEditing && <div>
                            <h2 className="text-3xl text-gray-700 font-semibold mt-8 mb-8">
                                Your testimonials
                            </h2>
                            {user.testemonials && user.testemonials.length === 0 && <p className="text-xl text-gray-800">You have not written any testemonials yet.</p>}
                            {user.testemonials && user.testemonials.length > 0 && <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-y-10 justify-center">
                                {user.testemonials.map((testemonial) => <TestemonialCard key={testemonial._id} testemonial={testemonial} />)}
                            </div>}
                        </div>}
                    </div>
                </div>
            </div>
        </>
    );
}
