import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white p-4">
      <div className="w-3/4 max-lg:w-[85%] m-auto grid grid-cols-5 max-lg:grid-cols-3 justify-between text-center p-4 pb-16 border-b-2 border-gray-600 text-gray-200">
        <div className="col-span-2 max-lg:col-span-2 max-lg:mb-10">
          <h3 className="text-2xl pb-4 text-bold text-left text-white">Premium Motors</h3>
          <p className="text-md py-2 text-left">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="pr-3" /> 2220
            Sveti Nikole, Macedonia
          </p>
          <p className="text-md py-2 text-left">
            <FontAwesomeIcon icon={faPhone} className="pr-3" />
            +389 00 000 000
          </p>
          <p className="text-md py-2 text-left">
            <FontAwesomeIcon icon={faEnvelope} className="pr-3" />{" "}
            premiummotors@gmail.com
          </p>
        </div>
        <div className="text-left">
          <h3 className="text-2xl pb-4 text-white">Company</h3>
          <p className="text-md py-1">Terms of Service</p>
          <p className="text-md py-1">Privacy Policy</p>
          <p className="text-md py-1">FAQ</p>
          <p className="text-md py-1">Careers</p>
        </div>
        <div className="max-lg:col-span-2">
          <h3 className="text-2xl pb-4 text-left text-white">Our Product</h3>
          <p className="text-md text-left py-1">New Cars</p>
          <p className="text-md text-left py-1">Used Cars</p>
          <p className="text-md text-left py-1">Car Accessories</p>
        </div>
        <div className="text-left">
          <h3 className="text-2xl pb-4 text-bold mb-2 text-white">Follow Us</h3>
          <a href="http://www.facebook.com" target="_blank">
            <FontAwesomeIcon icon={faFacebook} className="h-6" />
          </a>
          <a href="http://www.instagram.com" target="_blank" className="px-4">
            <FontAwesomeIcon icon={faInstagram} className="h-6" />
          </a>
          <a href="http://www.twitter.com" target="_blank">
            <FontAwesomeIcon icon={faTwitter} className="h-6" />
          </a>
        </div>
      </div>
      <p className="w-3/4 m-auto max-lg:w-[85%] max-lg:mx-8 text-sm p-4">
        &copy; 2024 Premium Motors. All rights reserved.
      </p>
    </footer>
  );
  
}
