export default function Newsletter() {
  return (
    <section className="bg-gray-700 mt-24 py-16 lg:py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl text-white font-bold mb-8">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-white mb-8">
          Stay updated with the latest news, promotions, and car releases.
        </p>
        <div className="flex justify-center items-center">
          <input
            type="email"
            placeholder="Your Email Address"
            className="bg-white text-gray-700 border border-gray-300 p-3 px-6 rounded-l-md focus:outline-none"
          />
          <button className="bg-blue-600 text-white p-[13px] rounded-r-md hover:bg-blue-800 transition duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
