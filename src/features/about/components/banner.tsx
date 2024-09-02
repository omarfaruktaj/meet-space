import banner from "@/assets/professionaloffice.png";
import { useSpring, animated } from "@react-spring/web";

export default function Banner() {
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

  return (
    <section
      className="relative mb-16 bg-cover rounded-md bg-center h-96 flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute inset-0 bg-black opacity-70 rounded-md"></div>
      <div className="relative z-10 text-center">
        <animated.div style={titleAnimation}>
          <h1 className="text-4xl font-bold shadow-lg">About Us</h1>
        </animated.div>

        <animated.div style={contentAnimation}>
          <p className="mt-4 text-lg shadow-md">
            Learn more about our journey, values, and what drives us.
          </p>
        </animated.div>
      </div>
    </section>
  );
}
