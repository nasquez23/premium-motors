import BackgroundImage from "../../assets/page-header-bg.jpg";

export default function PageHeader({ title }) {
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-1/2 opacity-10 z-0"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "100% 30%",
        }}
      ></div>
      <h1 className="text-4xl text-gray-900 font-semibold text-center uppercase mt-24 mb-32">
        {title}
      </h1>
    </>
  );
}
