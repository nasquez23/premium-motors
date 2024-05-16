import { useContext, useEffect, useState } from "react";

import LoadingSpinner from "../components/UI/LoadingSpinner";
import { AuthContext } from "../context/auth-context";
import ErrorModal from "../components/UI/ErrorModal";
import { AnimatePresence } from "framer-motion";
import PageHeader from "../components/UI/PageHeader";
import Title from "../components/UI/Title";
import TestemonialCard from "../components/TestemonialCard";
import { checkAuth } from "../util/checkAuth";

export default function Profile() {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    checkAuth(!auth.isLoggedIn, '/');
    useEffect(() => {
        async function fetchUserData() {
            try {
                if (!auth.userId) {
                    return;
                }

                setIsLoading(true);
                const response = await fetch(`http://localhost:3000/api/users/user/${auth.userId}`, {
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
            } catch (err) {
                setError(err.message);
            }
        }

        fetchUserData();
    }, [auth.userId]);

    if (isLoading) {
        return <div className="pt-[10%] pb-[25%] flex justify-center"><LoadingSpinner /></div>;
    }

    console.log(user.testemonials);

    return (
        <>
            <AnimatePresence>
                {error && <ErrorModal errorMessage={error} closeModal={() => setError(null)} />}
            </AnimatePresence>

            <PageHeader title="Profile Overview" />
            <div className="mt-[10%] max-lg:mt-[30%]">
                <Title title="My account" />
                <div className="w-[80%] mx-auto mb-[10%]">
                    <h2 className="text-3xl text-gray-700 font-semibold mt-4 mb-8">
                        Your profile information
                    </h2>
                    <p className="text-xl text-gray-800">Name: {user.name}</p>
                    <p className="text-xl text-gray-800">Email: {user.email}</p>
                    <div>
                        <h2 className="text-3xl text-gray-700 font-semibold mt-8 mb-8">
                            Your testemonials
                        </h2>
                        {user.testemonials && user.testemonials.length === 0 && <p className="text-xl text-gray-800">You have not written any testemonials yet.</p>}
                        {user.testemonials && user.testemonials.length > 0 && <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-y-10 justify-center">
                            {user.testemonials.map((testemonial) => <TestemonialCard key={testemonial._id} testemonial={testemonial} />)}
                        </div>}
                    </div>
                </div>
            </div>
        </>
    );
}
