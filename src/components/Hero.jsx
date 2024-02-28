import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="w-full items-center text-center h-56 bg-blue-300 px-4 text-black">
      <h3 className="text-3xl my-5 font-bold pt-5">
        Welcome to Premium Motors
      </h3>
      <p className="text-xl mb-6">Your ultimate destionation for cars</p>
      <p>
        <button className="bg-stone-900 text-slate-50 h-12 w-32 rounded-lg hover:bg-stone-800">
          <Link to="/cars">Explore Cars</Link>
        </button>
      </p>
    </div>
  );
}
