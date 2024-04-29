import Modal from "./Modal";

export default function ErrorModal({ errorMessage, closeModal }) {
    return <Modal closeModal={closeModal}>
        <div className="flex flex-row justify-between px-5 py-3 bg-blue-500 w-full">
            <h2 className="uppercase font-semibold text-white text-2xl pt-3">
                An error occured
            </h2>
            <button
                onClick={() => setError(null)}
                className="text-white text-2xl font-bold"
            >
                X
            </button>
        </div>
        <div>
            <p className="text-gray-800 text-lg p-8">{errorMessage}</p>
        </div>
    </Modal>
}