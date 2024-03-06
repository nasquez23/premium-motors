export default function Modal({ children, closeModal }) {
  return (
    <>
      <div onClick={closeModal} className="fixed top-0 left-0 w-[100%] h-[100%] z-20"  />
      <dialog open className="z-50 w-1/2 mx-auto bg-white border-2 border-black">{children}</dialog>
    </>
  );
}
