import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit() {
    toast.success("Thank you for your message!");
    form.reset();
  }

  const formAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
  });

  const contactInfoAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    delay: 200,
  });

  return (
    <div className="min-h-screen py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <animated.div
          style={formAnimation}
          className="shadow-lg rounded-lg p-8 mb-8 md:mb-0"
        >
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your Message"
                          {...field}
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <Button size="lg" className="w-full mt-4" type="submit">
                  Send Message
                </Button>
              </div>
            </form>
          </Form>
        </animated.div>

        <animated.div
          style={contactInfoAnimation}
          className="flex items-center justify-center px-4"
        >
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions, feel free to reach out to us through
              the following channels:
            </p>
            <ul className="list-none space-y-4">
              <li className="flex items-center">
                <Phone className="text-primary mr-2" />
                <span>Phone: +88017844548558</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-primary mr-2" />
                <span>Email: support@meetspace.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="text-primary mr-2" />
                <span>Address: 123 Keyboard St, Dhaka City, TX 12345</span>
              </li>
            </ul>
          </div>
        </animated.div>
      </div>
    </div>
  );
}
