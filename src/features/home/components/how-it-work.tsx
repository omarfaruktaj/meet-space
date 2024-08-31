import Stepper from "@/components/Step/stepper";
import { MapPin, Calendar, CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Select a Room",
    description: "Browse and select the ideal meeting room for your needs.",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    title: "Choose Date & Time",
    description: "Pick the perfect date and time that suits your schedule.",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Confirm Booking",
    description: "Review your selection and confirm your booking instantly.",
    icon: <CheckCircle className="h-5 w-5" />,
  },
];

export default function HowItWorks() {
  return (
    <div className="py-16 ">
      <div className="px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900">How It Works</h2>
        <p className="mt-4 text-lg text-gray-600">
          Follow these simple steps to book your meeting room.
        </p>
        <div className="mt-12">
          <div className="container mx-auto">
            <Stepper barStyle="solid" activeStep={3} steps={steps} />
          </div>
        </div>
      </div>
    </div>
  );
}
