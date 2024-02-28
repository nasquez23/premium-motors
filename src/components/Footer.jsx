export default function Footer() {
  return (
    <footer class="bg-gray-800 text-white p-4 mx-4">
      <div className="w-3/4 m-auto flex flex-row justify-between text-center items-center p-4 border-b-2">
        <div>
          <h3>Premium Motors</h3>
          <p>Location: 2220 Sveti Nikole, Macedonia</p>
          <p>Phone: +389 00 000 000</p>
          <p>Email: premiummotors@gmail.com</p>
        </div>
        <div>
          <h3>Our Product</h3>
          <p>New Cars</p>
          <p>Used Cars</p>
          <p>Car Accessories</p>
        </div>
        <div>
          <h3>Follow Us</h3>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Twitter</p>
        </div>
      </div>
      <p class="w-3/4 m-auto text-sm">
        &copy; 2024 Premium Motors. All rights reserved.
      </p>
    </footer>
  );
}
