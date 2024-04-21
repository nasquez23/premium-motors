import { Link } from "react-router-dom";
import PageHeader from "../components/UI/PageHeader";
import Title from "../components/UI/Title";

export default function Register() {
    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <>
            <PageHeader title="Become a member" />
            <div className="shadow-lg shadow-gray-500 w-[80%] mx-auto px-[15%] mt-52 pt-4 rounded-lg">
                <Title title="Register" />
                <form className="text-gray-800 mt-12 pb-20 mb-20" onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-6">
                        <label htmlFor="name" className="font-bold text-xl mb-2">Full Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter your full name" className="bg-gray-200 text-gray-700 p-4 rounded focus:outline-blue-500" />
                    </div>
                    <div className="flex flex-col mb-6">
                        <label htmlFor="email" className="font-bold text-xl mb-2">Email address</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email address" className="bg-gray-200 text-gray-700 p-4 rounded focus:outline-blue-500" />
                    </div>
                    <div className="flex flex-col mb-6">
                        <label htmlFor="password" className="font-bold text-xl mb-2">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter your password" className="bg-gray-200 text-gray-700 p-4 rounded focus:outline-blue-500" />
                    </div>
                    <div className="flex flex-col mb-6">
                        <label htmlFor="confirmPassword" className="font-bold text-xl mb-2">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Re-enter your password" className="bg-gray-200 text-gray-700 p-4 rounded focus:outline-blue-500" />
                    </div>
                    <button type="submit" className="mt-2 w-full bg-blue-600 h-14 sm:h-16 md:h-16 lg:h-14 text-xl font-semibold text-white rounded hover:bg-blue-800 transition duration-300">Register</button>
                    <div>
                        <p className="mt-6 max-lg:mt-10 max-lg:text-xl">Already a member? <Link to="/login" className="text-blue-600 underline hover:text-blue-900 transition duration-300">Sign in</Link></p>
                    </div>
                </form>
            </div>
        </>
    );
}