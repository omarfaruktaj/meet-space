import { useSpring, animated } from "@react-spring/web";

export default function History() {
  const titleAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(-20px)" },
    config: { tension: 200, friction: 20 },
  });

  const paragraphAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 200, friction: 20 },
    delay: 300,
  });

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <animated.h2
            style={titleAnimation}
            className="text-3xl font-bold text-gray-900 text-center"
          >
            Our History
          </animated.h2>
          <animated.p
            style={paragraphAnimation}
            className="mt-4 text-lg text-gray-600"
          >
            Founded in 2010, our company started as a small team with a big
            dream. Over the years, we have grown exponentially, but our core
            values have remained the same. We believe in integrity, hard work,
            and innovation, and these principles have guided us every step of
            the way.
          </animated.p>
        </div>
      </div>
    </section>
  );
}
