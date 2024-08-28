import Hero from "@/features/home/components/hero";
import ServiceAdvertisement from "@/features/home/components/service-advertisement";
import WhyChooseUs from "@/features/home/components/why-choose-us";
import FeaturedRooms from "@/features/room/components/featured-rooms";

export default function Home() {
  return (
    <div>
      <Hero />
      <ServiceAdvertisement />
      <FeaturedRooms />
      <WhyChooseUs />
    </div>
  );
}
