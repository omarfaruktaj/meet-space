import { useSpring, animated } from "@react-spring/web";

export default function Mission() {
  const titleAnimation = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    config: { tension: 200, friction: 22 },
  });

  const paragraphAnimation = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    config: { tension: 200, friction: 22 },
    delay: 300,
  });

  return (
    <section className="py-16 bg-gray-100 mt-4 rounded-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <animated.h2
          style={titleAnimation}
          className="text-3xl font-bold text-gray-900"
        >
          Our Mission
        </animated.h2>
        <animated.p
          style={paragraphAnimation}
          className="mt-4 text-lg text-gray-600"
        >
          Our mission is to deliver the best products and services to our
          customers, ensuring quality, innovation, and sustainability in
          everything we do.
        </animated.p>
      </div>
    </section>
  );
}
