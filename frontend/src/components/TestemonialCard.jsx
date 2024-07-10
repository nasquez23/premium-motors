import { useContext, useEffect, useState } from "react";
import Modal from "./UI/Modal";
import { AnimatePresence } from "framer-motion";
import LoadingSpinner from './UI/LoadingSpinner';
import { toast } from "react-toastify";
import TestemonialFormModal from "./TestemonialFormModal";
import { AuthContext } from "../context/auth-context";
import { useMutation } from "@tanstack/react-query";
import { deleteTestemonial } from "../api/testemonials";
import { queryClient } from "../main";
import { useLocation } from "react-router-dom";

export default function TestemonialCard({ testemonial, closeModal }) {
  const auth = useContext(AuthContext);
  const [showButtons, setShowButtons] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [errorWhileDeleting, setErrorWhileDeleting] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const location = useLocation();

  const { mutate, isPending: isDeleting, isError, error } = useMutation({
    mutationFn: deleteTestemonial,
    onSuccess: () => {
      if (location.pathname === '/profile') {
        queryClient.invalidateQueries({ queryKey: ['user', auth.userId] });
      } else {
        queryClient.invalidateQueries({ queryKey: ['testemonials'] });
      }
      setShowConfirmationModal(false);
      toast.success("Testemonial deleted successfully");
    },
  });

  useEffect(() => {
    if (isError) {
      setErrorWhileDeleting(error.message);
    }
  }, [isError]);

  function handleDeleteTestemonial() {
    mutate({ ...testemonial, token: auth.token });
  };

  function handleCloseConfirmationModal() {
    setShowConfirmationModal(false);
    setErrorWhileDeleting(null);
  };

  return (
    <>
      <AnimatePresence>
        {showConfirmationModal && <Modal closeModal={handleCloseConfirmationModal}>
          <div className="flex flex-row justify-between px-5 bg-blue-500 h-14 w-full">
            <h2 className="uppercase font-semibold text-white text-2xl pt-3">
              Delete Testemonial
            </h2>
            <button
              onClick={handleCloseConfirmationModal}
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
              <button onClick={handleCloseConfirmationModal} className="text-gray-700 hover:text-gray-900 transition duration-300">Cancel</button>
              <button onClick={handleDeleteTestemonial} className="bg-red-500 text-neutral-100 hover:bg-red-700 transition duration-300 rounded-md px-4 py-2">Delete</button>
            </div>
          </div>}
        </Modal>}
        {showEditModal && <TestemonialFormModal closeModal={() => setShowEditModal(false)} testemonial={testemonial} />}
      </AnimatePresence>

      <div onMouseEnter={() => setShowButtons(true)} onMouseLeave={() => setShowButtons(false)} className="relative flex flex-row w-[85%] rounded-xl shadow-gray-500 shadow-lg overflow-hidden mx-auto bg-white">
        {auth.isLoggedIn && auth.userId === testemonial.author._id && showButtons && <div className="absolute top-0 left-0 bg-black bg-opacity-80 w-full h-full">
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