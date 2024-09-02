import { Button } from "@/components/ui/button";
import banner from "../../../assets/banner.png";
import { Link } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

export default function Hero() {
  const titleAnimation = useSpring({
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: -20 },
  });

  const contentAnimation = useSpring({
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 20 },
    delay: 200,
  });

  const buttonAnimation = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    delay: 400,
    config: { tension: 300, friction: 25 },
  });

  return (
    <div className="pb-16">
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
          <animated.div style={titleAnimation}>
            {" "}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 text-white">
              Discover the Perfect Space for Every Occasion
            </h1>
          </animated.div>

          <animated.div style={contentAnimation}>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 lg:mb-10 text-white">
              Seamlessly book meeting rooms tailored to your needs, anytime,
              anywhere.
            </p>
          </animated.div>

          <animated.div style={buttonAnimation}>
            <Button asChild>
              <Link to="/meeting-rooms">Explore Rooms</Link>
            </Button>
          </animated.div>
        </div>
      </div>
    </div>
  );
}
