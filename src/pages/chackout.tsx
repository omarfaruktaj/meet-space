import CheckoutForm from "@/features/payment/components/checkout-form";
import { useAppSelector } from "@/redux/hooks";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const stripePromise = loadStripe(
  "pk_test_51L3Fp1IjxtgD4oeXTqiApOHtHeSKHRXD6BocMvTAYep7X0JMFKcISN3rBhttaCDNvKzFIVpCxXjYXHC5DpKO7cvj00SqtC0smY"
);
export default function Chackout() {
  const bookingInfo = useAppSelector((state) => state.booking.bookingInfo);
  const naviagate = useNavigate();

  useEffect(() => {
    if (!bookingInfo) naviagate("/");
  }, [bookingInfo, naviagate]);

  return (
    <div className="min-h-screen p-6 ">
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Booking Summary
        </h2>
        <div className="md:flex md:gap-8">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Booking Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Room Name:</span>
                  <span className="font-semibold text-lg text-gray-800">
                    {bookingInfo?.roomName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Date:</span>
                  <span className="font-semibold text-lg text-gray-800">
                    {bookingInfo?.date}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Time:</span>
                  <div className="flex space-x-2">
                    {bookingInfo?.slots.map((slot, index) => (
                      <p key={index} className="font-semibold text-gray-800">
                        {slot.label}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Cost:</span>
                  <span className="font-semibold text-lg text-gray-800">
                    ${bookingInfo?.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">User:</span>
                  <span className="font-semibold text-lg text-gray-800">
                    {bookingInfo?.userInfo.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Email:</span>
                  <span className="font-semibold text-lg text-gray-800">
                    {bookingInfo?.userInfo.email}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Phone:</span>
                  <span className="font-semibold text-lg text-gray-800">
                    {bookingInfo?.userInfo.phone}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Address:</span>
                  <span className="font-semibold text-lg text-gray-800">
                    {bookingInfo?.userInfo.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Pay Now
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
