import BackButton from "@/components/back-button";
import { Badge } from "@/components/ui/badge";
import CheckoutForm from "@/features/payment/components/checkout-form";
import { useAppSelector } from "@/redux/hooks";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Checkout() {
  const bookingInfo = useAppSelector((state) => state.booking.bookingInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookingInfo) navigate("/");
  }, [bookingInfo, navigate]);

  return (
    <div className="min-h-screen   p-6">
      <BackButton />
      <div className=" max-w-4xl mx-auto  px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 ">Complete Your Booking</h2>
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="border p-6 rounded-md shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Booking Summary
              </h3>
              <div className="space-y-4 text-base text-gray-600">
                <div className="flex justify-between">
                  <span>Room Name:</span>
                  <span className="font-semibold text-gray-800">
                    {bookingInfo?.roomName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-semibold text-gray-800">
                    {bookingInfo?.date}
                  </span>
                </div>
                <div className="">
                  <p className="text-nowrap">Time slots:</p>
                  <div className="flex items-center justify-start flex-wrap gap-1 ">
                    {bookingInfo?.slots.map((slot, index) => (
                      <span key={index} className=" px-2 py-1 rounded-md">
                        <Badge>{slot.label}</Badge>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Cost:</span>
                  <span className="font-semibold text-gray-800">
                    ${bookingInfo?.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>User:</span>
                  <span className="font-semibold text-gray-800">
                    {bookingInfo?.userInfo.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-semibold text-gray-800">
                    {bookingInfo?.userInfo.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span className="font-semibold text-gray-800">
                    {bookingInfo?.userInfo.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Address:</span>
                  <span className="font-semibold text-gray-800">
                    {bookingInfo?.userInfo.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="border p-6 rounded-md shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Payment Information
              </h3>
              <Elements stripe={stripePromise}>
                <CheckoutForm data={bookingInfo!} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
