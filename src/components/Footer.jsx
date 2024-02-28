export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mx-4">
      <div className="w-3/4 m-auto flex flex-row justify-between text-center items-center p-4 pb-12 border-b-2">
        <div className="">
          <h3 className="text-xl">Premium Motors</h3>
          <p className="text-sm">Location: 2220 Sveti Nikole, Macedonia</p>
          <p className="text-sm">Phone: +389 00 000 000</p>
          <p className="text-sm">Email: premiummotors@gmail.com</p>
        </div>
        <div>
          <h3 className="text-xl">Our Product</h3>
          <p className="text-sm">New Cars</p>
          <p className="text-sm">Used Cars</p>
          <p className="text-sm">Car Accessories</p>
        </div>
        <div>
          <h3 className="text-xl">Follow Us</h3>
          <p className="text-sm">Facebook</p>
          <p className="text-sm">Instagram</p>
          <p className="text-sm">Twitter</p>
        </div>
      </div>
      <p className="w-3/4 m-auto text-sm p-4">
        &copy; 2024 Premium Motors. All rights reserved.
      </p>
    </footer>
  );
}
