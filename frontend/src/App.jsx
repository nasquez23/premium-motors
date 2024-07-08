import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Cars = lazy(() => import("./pages/Cars"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CarDetails = lazy(() => import("./pages/CarDetails"));
const EditCar = lazy(() => import("./pages/EditCar"));
const AddNewCar = lazy(() => import("./pages/AddNewCar"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  return (
    <>
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Suspense fallback={<div className="flex justify-center my-[20%]"><LoadingSpinner /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/new" element={<AddNewCar />} />
          <Route path="/cars/edit/:carId" element={<EditCar />} />
          <Route path="/cars/:carId" element={<CarDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
