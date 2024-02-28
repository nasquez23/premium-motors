import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mx-4">
      <div className="w-3/4 m-auto flex flex-row justify-between text-center p-4 border-b-2 border-gray-600">
        <div className="w-1/3">
          <h3 className="text-2xl pb-4 text-bold text-left">Premium Motors</h3>
          <p className="text-md py-2 text-left">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="pr-3" /> 2220 Sveti Nikole,
            Macedonia
          </p>
          <p className="text-md py-2 text-left">
            <FontAwesomeIcon icon={faPhone} className="pr-3" />+389 00 000 000
          </p>
          <p className="text-md py-2 text-left">
            <FontAwesomeIcon icon={faEnvelope} className="pr-3" /> premiummotors@gmail.com
          </p>
        </div>
        <div className="w-1/4">
          <h3 className="text-2xl pb-4 text-bold text-left">Our Product</h3>
          <p className="text-md text-left py-1">New Cars</p>
          <p className="text-md text-left py-1">Used Cars</p>
          <p className="text-md text-left py-1">Car Accessories</p>
        </div>
        <div className="w-1/4">
          <h3 className="text-2xl pb-4 text-bold mb-2">Follow Us</h3>
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
      <p className="w-3/4 m-auto text-sm p-4">
        &copy; 2024 Premium Motors. All rights reserved.
      </p>
    </footer>
  );
}
