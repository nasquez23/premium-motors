import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import { toast } from "react-toastify";
import PageHeader from "../components/UI/PageHeader";
import Title from "../components/UI/Title";
import { AnimatePresence } from "framer-motion";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorModal from "../components/UI/ErrorModal";
import { checkAuth } from "../util/checkAuth";

export default function Register() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    checkAuth(auth.isLoggedIn, "/");

    async function handleRegisterUser(event) {
        event.preventDefault();

        if (event.target.password.value !== event.target.confirmPassword.value) {
            setError("Passwords do not match");
            return;
        }

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const { name, email, password } = data;

        try {
            setIsLoading(true);
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });
            const responseData = await response.json();

            setIsLoading(false);
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            auth.login(responseData.userId, responseData.token, null, resData.userImage);
            toast.success("You have successfully registered");
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
            <PageHeader title="Become a member" />
            <AnimatePresence>
                {error && <ErrorModal errorMessage={error} closeModal={handleCloseErrorModal} />}
            </AnimatePresence>

            <div className="shadow-lg shadow-gray-500 w-[80%] mx-auto px-[15%] mt-52 pt-4 rounded-lg">
                <Title title="Register" />
                <form className="text-gray-800 mt-12 pb-20 mb-20" onSubmit={handleRegisterUser}>
                    <div className="flex flex-col mb-6">
                        <label htmlFor="name" className="font-bold text-xl mb-2">Full Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter your full name" required className="bg-gray-200 text-gray-700 p-4 rounded focus:outline-blue-500" />
                    </div>
                    <div className="flex flex-col mb-6">
                        <label htmlFor="email" className="font-bold text-xl mb-2">Email address</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email address" required className="bg-gray-200 text-gray-700 p-4 rounded focus:outline-blue-500" />
                    </div>
                    <div className="flex flex-col mb-6">
                        <label htmlFor="password" className="font-bold text-xl mb-2">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter your password" required className="bg-gray-200 text-gray-700 p-4 rounded focus:outline-blue-500" />
                    </div>
                    <div className="flex flex-col mb-6">
                        <label htmlFor="confirmPassword" className="font-bold text-xl mb-2">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Re-enter your password" required className="bg-gray-200 text-gray-700 p-4 rounded focus:outline-blue-500" />
                    </div>
                    {isLoading ? <div className="mt-8 flex justify-center"><LoadingSpinner /></div> : <button type="submit" className="mt-2 w-full bg-blue-600 h-14 sm:h-16 md:h-16 lg:h-14 text-xl font-semibold text-white rounded hover:bg-blue-800 transition duration-300">Register</button>}
                    <div>
                        <p className="mt-6 max-lg:mt-10 max-lg:text-xl">Already a member? <Link to="/login" onClick={() => window.scrollTo(0, 0)} className="text-blue-600 underline hover:text-blue-900 transition duration-300">Sign in</Link></p>
                    </div>
                </form>
            </div>
        </>
    );
}