import Banner from "@/features/about/components/banner";
import CoreValues from "@/features/about/components/core-values";
import History from "@/features/about/components/history";
import Mission from "@/features/about/components/mission";
import Team from "@/features/about/components/team";

export default function AboutUs() {
  return (
    <>
      <Banner />
      <Mission />
      <History />
      <Team />
      <CoreValues />
    </>
  );
}
