import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Autoplay from "embla-carousel-autoplay";

import customer1 from "@/assets/customers/customer-1.jpg";
import customer2 from "@/assets/customers/customer-2.jpg";
import customer3 from "@/assets/customers/customer-3.jpg";
import customer4 from "@/assets/customers/customer-4.jpg";
import customer5 from "@/assets/customers/customer-5.jpg";
import customer6 from "@/assets/customers/customer-6.jpg";
import customer7 from "@/assets/customers/customer-7.jpg";
import customer8 from "@/assets/customers/customer-8.jpg";

const testimonials = [
  {
    name: "Jane Doe",
    role: "Startup Founder",
    image: customer1,
    testimonial:
      "Booking a meeting room has never been easier. The process is straightforward, and the support team is incredibly helpful!",
  },
  {
    name: "John Smith",
    role: "Product Manager",
    image: customer2,
    testimonial:
      "The rooms are always clean, well-equipped, and ready for our meetings. I highly recommend this service.",
  },
  {
    name: "Alice Johnson",
    role: "Freelancer",
    image: customer3,
    testimonial:
      "I love the flexibility and ease of booking. The website is user-friendly, and I can book a room in just a few clicks.",
  },
  {
    name: "Robert Brown",
    role: "Consultant",
    image: customer4,
    testimonial:
      "The meeting rooms are perfect for client presentations. The technology is top-notch, and the atmosphere is professional.",
  },
  {
    name: "Emily White",
    role: "Marketing Director",
    image: customer5,
    testimonial:
      "This service has transformed our team meetings. We now have a reliable space where we can focus and collaborate effectively.",
  },
  {
    name: "Michael Davis",
    role: "Business Analyst",
    image: customer6,
    testimonial:
      "The booking system is intuitive and fast. Plus, the room setups are always exactly what we need. Great service overall.",
  },
  {
    name: "Sophia Lee",
    role: "Event Planner",
    image: customer7,
    testimonial:
      "I appreciate the variety of room options available. From small brainstorming sessions to large team meetings, everything is covered.",
  },
  {
    name: "Daniel Martinez",
    role: "Sales Executive",
    image: customer8,
    testimonial:
      "Excellent service and great value for the price. The rooms are spacious, well-lit, and conducive to productive meetings.",
  },
];

export default function Testimonials() {
  return (
    <div className="py-16 bg-gray-50 rounded-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          What Our Customers Say
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full mt-12 "
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center justify-center gap-2 mt-4 ">
                    <Avatar>
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name}</AvatarFallback>
                    </Avatar>
                    <blockquote className="mt-4 text-gray-600 italic text-center">
                      "{testimonial.testimonial}"
                    </blockquote>
                    <div className="mt-4 text-center">
                      <p className="text-lg font-semibold ">
                        {testimonial.name}
                      </p>
                      <p className="text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
