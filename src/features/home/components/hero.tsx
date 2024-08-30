import { Button } from "@/components/ui/button";
import banner from "../../../assets/banner.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative h-96 overflow-hidden rounded-md">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-60"
          src={banner}
          alt="Modern Workspace"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4 md:p-8 lg:p-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 text-white">
          Discover the Perfect Space for Every Occasion
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 lg:mb-10 text-white">
          Seamlessly book meeting rooms tailored to your needs, anytime,
          anywhere.
        </p>
        <Button asChild>
          <Link to="/meeting-rooms">Explore Rooms</Link>
        </Button>
      </div>
    </div>
  );
}
