import { useContext, useState } from "react";
import Modal from "./UI/Modal";
import { AnimatePresence } from "framer-motion";
import LoadingSpinner from './UI/LoadingSpinner';
import { toast } from "react-toastify";
import TestemonialFormModal from "./TestemonialFormModal";
import { AuthContext } from "../context/auth-context";

export default function TestemonialCard({ testemonial, forceUpdate, closeModal }) {
  const auth = useContext(AuthContext);
  const [showButtons, setShowButtons] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [errorWhileDeleting, setErrorWhileDeleting] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  async function handleDeleteTestemonial() {
    try {
      setIsDeleting(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/testemonials/${testemonial._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
      const responseData = await response.json();
      setIsDeleting(false);

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setShowConfirmationModal(false);
      toast.success("Testemonial deleted successfully");
      forceUpdate();
    } catch (error) {
      setErrorWhileDeleting(error.message);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showConfirmationModal && <Modal closeModal={() => setShowConfirmationModal(false)}>
          <div className="flex flex-row justify-between px-5 bg-blue-500 h-14 w-full">
            <h2 className="uppercase font-semibold text-white text-2xl pt-3">
              Delete Testemonial
            </h2>
            <button
              onClick={() => setShowConfirmationModal(false)}
              className="text-white text-2xl font-bold"
            >
              X
            </button>
          </div>
          {isDeleting && <div className="flex justify-center py-20"><LoadingSpinner /></div>}
          {errorWhileDeleting && <div className="flex justify-center">
            <h2 className="text-red-500 text-2xl font-semibold my-10">{errorWhileDeleting}</h2>
          </div>}
          {!isDeleting && !errorWhileDeleting && <div>
            <div>
              <h2 className="text-gray-700 text-center text-2xl font-semibold my-10">Are you sure you want to delete this testemonial?</h2>
            </div>
            <div className="flex justify-end max-lg:justify-center pr-12 max-lg:pr-0 gap-x-6 pb-10 text-xl font-semibold">
              <button onClick={() => setShowConfirmationModal(false)} className="text-gray-700 hover:text-gray-900 transition duration-300">Cancel</button>
              <button onClick={handleDeleteTestemonial} className="bg-red-500 text-neutral-100 hover:bg-red-700 transition duration-300 rounded-md px-4 py-2">Delete</button>
            </div>
          </div>}
        </Modal>}
        {showEditModal && <TestemonialFormModal forceUpdate={closeModal} closeModal={() => setShowEditModal(false)} testemonial={testemonial} />}
      </AnimatePresence>

      <div onMouseEnter={() => setShowButtons(true)} onMouseLeave={() => setShowButtons(false)} className="relative flex flex-row w-[85%] rounded-xl shadow-gray-500 shadow-lg overflow-hidden mx-auto bg-white">
        {auth.isLoggedIn && showButtons && <div className="absolute top-0 left-0 bg-black bg-opacity-80 w-full h-full">
          <button onClick={() => setShowEditModal(true)} className="text-white text-lg font-semibold absolute top-1/3 left-[40%] bg-blue-500 h-12 w-[20%] max-lg:w-[25%] py-3 rounded-md">Edit</button>
          <button onClick={() => setShowConfirmationModal(true)} className="text-white text-lg font-semibold absolute top-[50%] max-lg:top-[55%] left-[40%] bg-red-500 h-12 w-[20%] max-lg:w-[25%] px-5 py-3 rounded-md">Delete</button>
        </div>}
        <img
          src={testemonial.author.image}
          className="h-full w-1/2 object-cover"
          alt="Testemonial image"
        />
        <div className="w-full text-left ml-6 pt-4 mr-4">
          <h3 className="text-gray-700 text-xl font-semibold mb-12 max-lg:mb-4">
            <span className="text-gray-800 text-4xl">{testemonial.rating}</span> stars
          </h3>
          <p className="text-gray-600 font-medium h-52 max-lg:h-[230px]">
            "{testemonial.message}"
          </p>
          <p className="text-gray-800 font-semibold text-xl max-lg:mt-2">{testemonial.author.name}</p>
          <p className="text-gray-400 text-sm font-medium pb-4">From {testemonial.city}, {testemonial.country}</p>
        </div>
      </div>
    </>
  );
}