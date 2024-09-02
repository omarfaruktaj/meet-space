import { useSpring, animated } from "@react-spring/web";
import { useEffect } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LucideProps } from "lucide-react";

interface ServiceAdvertisementProps {
  feature: {
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    iconColor: string;
    title: string;
    description: string;
  };
}

export default function ServicedAdvertisementCard({
  feature,
}: ServiceAdvertisementProps) {
  const Icon = feature.icon;
  const [props, api] = useSpring(() => ({
    opacity: 0,
    transform: "scale(0.9)",
    from: { opacity: 0, transform: "scale(0.9)" },
  }));

  useEffect(() => {
    api.start({ opacity: 1, transform: "scale(1)" });
  }, [api]);

  return (
    <animated.div style={props}>
      <Card className="h-full">
        <CardHeader>
          <Icon className={`${feature.iconColor} text-5xl mb-4`} />
          <CardTitle>{feature.title}</CardTitle>
          <CardDescription>{feature.description}</CardDescription>
        </CardHeader>
      </Card>
    </animated.div>
  );
}
