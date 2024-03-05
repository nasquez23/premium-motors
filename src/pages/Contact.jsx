import PageHeader from "../components/UI/PageHeader";
import Title from "../components/UI/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <PageHeader title="Contact Premium Motors" />
      <div className="pt-6 w-3/4 mx-auto">
        <Title title="Contact Us" />
        <div className="flex flex-row h-[32rem] mt-12 mb-32">
          <div className="w-1/2">
            <h2 className="text-4xl text-gray-800 font-semibold mb-10 mt-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 w-3/4 mb-10">
              Have questions, feedback, or looking to explore our premium cars?
              Contact us using the details below, or fill out the form, and
              we'll get back to you.
            </p>
            <p className="mb-4">
              <a
                href="tel:+389000000000"
                className="text-gray-800 font-semibold text-xl hover:text-blue-600 transition duration-300"
              >
                <FontAwesomeIcon className="pr-4" icon={faPhone} />
                +389 00 000 000
              </a>
            </p>
            <p className="mb-4">
              <a
                href="mailto:premiummotors@gmail.com"
                className="text-gray-800 font-semibold text-xl hover:text-blue-600 transition duration-300"
              >
                <FontAwesomeIcon className="pr-4" icon={faEnvelope} />
                premiummotors@gmail.com
              </a>
            </p>
            <p className="text-gray-800 font-semibold text-xl">
              <a
                href="https://maps.google.com/?q=2220+Sveti+Nikole,+Macedonia"
                target="_blank"
                className="hover:text-blue-600 transition duration-300"
              >
                <FontAwesomeIcon className="pr-4" icon={faMapMarkerAlt} />
                2220 Sveti Nikole, Macedonia
              </a>
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-1/2 text-gray-800 px-4 mt-4"
          >
            <label className="text-xl font-bold mb-4" htmlFor="name">
              Full Name
            </label>
            <input
              className="bg-gray-200 h-10 text-gray-700 focus:outline-none py-6 px-8 rounded"
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              required
            />
            <label className="text-xl font-bold mt-6 mb-4" htmlFor="email">
              Email
            </label>
            <input
              className="bg-gray-200 h-10 text-gray-700 focus:outline-none py-6 px-8 rounded"
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              required
            />
            <label className="text-xl font-bold mt-6 mb-4" htmlFor="message">
              Tell Us More
            </label>
            <textarea
              className="bg-gray-200 h-40 text-gray-700 focus:outline-none py-4 px-8 rounded"
              id="message"
              name="message"
              placeholder="Your Message"
              required
            />
            <button className="mt-6 w-full bg-blue-600 h-20 text-xl font-semibold text-white rounded shadow-md shadow-blue-800 hover:shadow-lg hover:bg-blue-800 hover:shadow-blue-900 transition duration-300">
              <FontAwesomeIcon className="pr-4" icon={faPaperPlane} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
