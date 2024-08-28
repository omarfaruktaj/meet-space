import banner from "@/assets/professionaloffice.png";

export default function Banner() {
  return (
    <section
      className="relative mb-16 bg-cover rounded-md bg-center h-96 flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute inset-0 bg-black opacity-70 rounded-md"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold shadow-lg">About Us</h1>
        <p className="mt-4 text-lg shadow-md">
          Learn more about our journey, values, and what drives us.
        </p>
      </div>
    </section>
  );
}
