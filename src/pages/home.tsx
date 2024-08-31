import Hero from "@/features/home/components/hero";
import HowItWorks from "@/features/home/components/how-it-work";
import ServiceAdvertisement from "@/features/home/components/service-advertisement";
import Testimonials from "@/features/home/components/testimonials";
import WhyChooseUs from "@/features/home/components/why-choose-us";
import FeaturedRooms from "@/features/room/components/featured-rooms";
import ScrollToTop from "react-scroll-to-top";

export default function Home() {
  return (
    <div>
      <Hero />
      <ServiceAdvertisement />
      <FeaturedRooms />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <ScrollToTop height="25" width="25" className=" pl-2 " smooth />
    </div>
  );
}
