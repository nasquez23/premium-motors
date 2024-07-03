import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

import PageHeader from "../components/UI/PageHeader";
import Ferrari from '../assets/ferrari.jpeg';
import Title from "../components/UI/Title";
import { AnimatePresence } from "framer-motion";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorModal from "../components/UI/ErrorModal";
import { toast } from "react-toastify";
import { checkAuth } from "../util/checkAuth";

export default function Login() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    checkAuth(auth.isLoggedIn, '/');

    async function handleLoginUser(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            setIsLoading(true);
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();

            setIsLoading(false);
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            auth.login(responseData.userId, responseData.token, null, responseData.userImage);
            toast.success("You have successfully logged in");
            navigate("/");
            window.scrollTo(0, 0);
        } catch (err) {
            setError(err.message);
        }
    }

    function handleCloseErrorModal() {
        setError(null);
    }

    return (
        <>
            <PageHeader title="Member login" />
            <AnimatePresence>
                {error && <ErrorModal errorMessage={error} closeModal={handleCloseErrorModal} />}
            </AnimatePresence>

            <div className="flex flex-row w-[90%] mx-auto rounded-lg shadow-lg shadow-gray-500 overflow-hidden h-[40rem] max-lg:h-auto mb-20 mt-52 relative">
                <h3 className="text-gray-900 font-bold text-6xl w-[40%] max-lg:w-[80%] absolute ml-[7%] max-lg:ml-[20%] mt-[13%] max-lg:mt-10 z-10 max-lg:z-0">Welcome Back! Log in to Your Account</h3>
                <img src={Ferrari} className="w-1/2 h-full object-cover opacity-40 block max-lg:hidden" />
                <div className="w-1/2 px-20 mt-10 max-lg:mt-60 max-lg:w-full">
                    <Title title="Sign in" />
                    <form className="text-gray-800" onSubmit={handleLoginUser}>
                        <div className="flex flex-col mt-10">
                            <label htmlFor="email" className="text-xl font-bold mb-2">Email address</label>
                            <input type="email" name="email" id="email" placeholder="Enter your email address" required className="bg-gray-200 text-gray-700 p-4 rounded focus:outline-blue-500" />
                        </div>
                        <div className="flex flex-col mt-6">
                            <label htmlFor="password" className="text-xl font-bold mb-2">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter your password" required className="bg-gray-200 text-gray-700 p-4 rounded focus:outline-blue-500" />
                        </div>
                        {isLoading ? <div className="mt-8 flex justify-center"><LoadingSpinner /></div> : <button type="submit" className="mt-8 w-full bg-blue-600 h-14 sm:h-16 md:h-16 lg:h-14 text-xl font-semibold text-white rounded hover:bg-blue-800 transition duration-300">Sign in</button>}
                        <div className="mt-6 max-lg:mt-10 max-lg:mb-10 max-lg:text-xl">
                            <p className="mt-4">New to the site? <Link to="/signup" onClick={() => window.scrollTo(0, 0)} className="text-blue-600 underline hover:text-blue-900 transition duration-300">Create an account</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}