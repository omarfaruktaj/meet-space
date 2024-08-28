import { Bolt, CalendarCheck, Clock, Headset } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const features = [
  {
    icon: CalendarCheck,
    iconColor: "text-blue-600",
    title: "Real-Time Availability",
    description:
      "Instantly check the availability of your preferred meeting rooms.",
  },
  {
    icon: Bolt,
    iconColor: "text-yellow-500",
    title: "Instant Booking Confirmation",
    description:
      "Receive immediate confirmation for your bookings with no delays.",
  },
  {
    icon: Clock,
    iconColor: "text-green-500",
    title: "Flexible Scheduling",
    description: "Book rooms for any time slot that suits your schedule.",
  },
  {
    icon: Headset,
    iconColor: "text-red-500",
    title: "24/7 Support",
    description: "Get assistance anytime with our dedicated support team.",
  },
];

export default function ServiceAdvertisement() {
  return (
    <div className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold ">Our Top Features</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experience unparalleled convenience and support with our key
            features.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <Icon className={`${feature.iconColor} text-5xl mb-4`} />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
