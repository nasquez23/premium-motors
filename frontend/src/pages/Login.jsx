import { Link } from "react-router-dom";

import PageHeader from "../components/UI/PageHeader";
import Ferrari from '../assets/ferrari.jpeg';
import Title from "../components/UI/Title";

export default function Login() {
    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <>
            <PageHeader title="Member login" />
            <div className="flex flex-row w-[90%] mx-auto rounded-lg shadow-lg shadow-gray-500 overflow-hidden h-[40rem] max-lg:h-auto mb-20 mt-52 relative">
                <h3 className="text-gray-900 font-bold text-6xl w-[40%] max-lg:w-[80%] absolute ml-[7%] max-lg:ml-[20%] mt-[13%] max-lg:mt-10 z-10 max-lg:z-0">Welcome Back! Log in to Your Account</h3>
                <img src={Ferrari} className="w-1/2 h-full object-cover opacity-40 block max-lg:hidden" />
                <div className="w-1/2 px-20 mt-10 max-lg:mt-60 max-lg:w-full">
                    <Title title="Sign in" />
                    <form className="text-gray-800" onSubmit={handleSubmit}>
                        <div className="flex flex-col mt-10">
                            <label htmlFor="email" className="text-xl font-bold mb-2">Email address</label>
                            <input type="email" name="email" id="email" placeholder="Enter your email address" className="bg-gray-200 text-gray-700 p-4 rounded focus:outline-blue-500" />
                        </div>
                        <div className="flex flex-col mt-6">
                            <label htmlFor="password" className="text-xl font-bold mb-2">Password</label>
                            <input type="password" name="passwword" id="password" placeholder="Enter your password" className="bg-gray-200 text-gray-700 p-4 rounded focus:outline-blue-500" />
                        </div>
                        <button type="submit" className="mt-8 w-full bg-blue-600 h-14 sm:h-16 md:h-16 lg:h-14 text-xl font-semibold text-white rounded hover:bg-blue-800 transition duration-300">Sign in</button>
                        <div className="mt-6 max-lg:mt-10 max-lg:mb-10 max-lg:text-xl">
                            <p className="mt-4">New to the site? <Link to="/signup" onClick={() => window.scrollTo(0, 0)} className="text-blue-600 underline hover:text-blue-900 transition duration-300">Create an account</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}