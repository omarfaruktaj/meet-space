import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Headphones, ShieldCheck, Star } from "lucide-react";

const features = [
  {
    title: "Seamless Booking Experience",
    description:
      "Our platform offers an intuitive and streamlined booking process, making it easy to find and reserve the perfect meeting room.",
    icon: Clock,
  },
  {
    title: "Secure Transactions",
    description:
      "We prioritize your security with encrypted payments and secure data handling, ensuring that your transactions are safe.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Customer Support",
    description:
      "Our support team is available around the clock to assist you with any inquiries or issues, ensuring a smooth experience.",
    icon: Headphones,
  },
  {
    title: "Highly Rated Services",
    description:
      "Our users consistently rate us highly for our excellent services, user-friendly interface, and top-notch customer support.",
    icon: Star,
  },
];
export default function WhyChooseUs() {
  return (
    <div className="py-16 bg-gray-50 rounded-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
        <h2 className="text-3xl font-extrabold ">Why Choose Us?</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover the advantages of booking with our platform.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-center items-center mb-4">
                    <Icon className="h-12 w-12 text-primary" />
                  </div>
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
