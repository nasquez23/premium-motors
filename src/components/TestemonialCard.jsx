export default function TestemonialCard({ image, stars, text, name, from }) {
  return (
    <div className="flex flex-row w-[40%] h-96 rounded-xl shadow-gray-500 shadow-lg overflow-hidden bg-white">
      <img
        src={image}
        className="h-full w-1/2 object-cover"
        alt="Testemonial image"
      />
      <div className="w-full text-left ml-6 pt-4 mr-4">
        <h3 className="text-gray-700 text-xl font-semibold mb-12">
          <span className="text-gray-800 text-4xl">{stars}</span> stars
        </h3>
        <p className="text-gray-600 font-medium h-52">"{text}"</p>
        <p className="text-gray-800 font-semibold text-xl">{name}</p>
        <p className="text-gray-400 text-sm font-medium">From {from}</p>
      </div>
    </div>
  );
}
