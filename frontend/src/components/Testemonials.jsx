import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/auth-context";
import quotes from "../assets/quotes.jpg";
import TestemonialCard from "./TestemonialCard";
import Title from "./UI/Title";
import LoadingSpinner from "./UI/LoadingSpinner";
import TestemonialFormModal from "./TestemonialFormModal";

export default function Testemonials() {
  const auth = useContext(AuthContext);
  const [testemonials, setTestemonials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchTestemonials() {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/api/testemonials");
        const responseData = await response.json();

        setIsLoading(false);
        setTestemonials(responseData);
      } catch (err) { }
    }

    fetchTestemonials();
  }, []);

  if (isLoading) {
    return <div className="flex flex-col items-center justify-center mb-[10%]">
      <Title title="Testemonials" />
      <h2 className="text-3xl text-gray-700 font-semibold mt-4 mb-20 relative">
        What our customers say about us?
      </h2>
      <LoadingSpinner />
    </div>
  }

  return (
    <>
      {showModal && <TestemonialFormModal closeModal={() => setShowModal(false)} />}
      <section className="text-center pb-[5%] relative bg-gradient-to-b from-white to-blue-50 mt-48">
        {testemonials && testemonials.length > 0 && <div
          className="absolute top-0 left-0 w-full h-full opacity-15 z-0"
          style={{
            backgroundImage: `url(${quotes})`,
            backgroundRepeat: "repeat",
            backgroundSize: "50% 30%",
            backgroundPosition: "center",
          }}
        />}
        <Title title="Testemonials" />
        <h2 className="text-3xl text-gray-700 font-semibold mt-4 mb-20 relative">
          What our customers say about us?
        </h2>

        {testemonials && testemonials.length === 0 && <h2 className="text-gray-800 text-center text-2xl font-semibold mt-[10%] ml-[0%]">No testemonials found.</h2>}
        {testemonials && testemonials.length > 0 && <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-y-10 justify-center relative w-[90%] mx-auto">
          {testemonials.map((testemonial) => <TestemonialCard key={testemonial._id} testemonial={testemonial} />)}
        </div>}
        {auth.isLoggedIn && <div className="mt-16 max-lg:mt-10 max-lg:pb-10">
          <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-14 w-[13%] pb-2 rounded-lg mt-10 z-10 relative">
            <span className="text-2xl">+</span> Add Testemonial
          </button>
        </div>}
      </section>
    </>
  );
}
