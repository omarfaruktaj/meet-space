import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCreatePaymentIntentMutation } from "../paymentApi";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ConfirmModel from "@/components/confirm-mode";
import { useCreateBookingMutation } from "@/features/booking/bookingApi";
import { IBookingInfo } from "@/features/booking/bookingSlice";
import { useAppSelector } from "@/redux/hooks";
import { runFireworks } from "@/utils/runFireworks";

export default function CheckoutForm({ data }: { data: IBookingInfo }) {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [createBooking] = useCreateBookingMutation();
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe has not been loaded");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const { clientSecret } = await createPaymentIntent({
        amount: data.totalPrice * 100,
      }).unwrap();

      const { error: paymentError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (paymentError) {
        toast.error(paymentError.message);
      } else {
        const slots = data.slots.map((slot) => slot.value);
        const bookingData = {
          user: userid,
          room: data.roomId,
          date: data.date,
          slots: slots,
        };
        await createBooking(bookingData);
        runFireworks();
        setIsModelOpen(true);
      }
    } catch (err) {
      toast.error("An error occurred while processing payment.");
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  const userid = useAppSelector((state) => state.user.user?._id);

  const handleCardChange = (event: any) => {
    setError(event.error ? event.error.message : null);
    setIsCardComplete(event.complete);
  };

  const cardElementOptions: StripeCardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true,
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <CardElement
            options={cardElementOptions}
            onChange={handleCardChange}
            className="p-3 border rounded-md shadow-sm"
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
        <div className="flex  justify-end">
          <Button
            type="submit"
            className="mt-4 w-full md:w-auto "
            size="lg"
            disabled={!stripe || loading || !isCardComplete}
          >
            {loading ? "Confirming..." : "Confirm Booking"}
          </Button>
        </div>
      </form>
      <ConfirmModel isOpen={isModelOpen} />
    </>
  );
}
