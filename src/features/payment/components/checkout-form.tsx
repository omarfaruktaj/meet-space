import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCreatePaymentIntentMutation } from "../paymentApi";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ConfirmModel from "@/components/confirm-mode";
import { useCreateBookingMutation } from "@/features/booking/bookingApi";
import { IBookingInfo, setBookingInfo } from "@/features/booking/bookingSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function CheckoutForm({ data }: { data: IBookingInfo }) {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [createBookig] = useCreateBookingMutation();
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const naviagate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsModelOpen(true);
  };

  const userid = useAppSelector((state) => state.user.user?._id);

  const handleCardChange = (event: any) => {
    setError(event.error ? event.error.message : null);
    setIsCardComplete(event.complete);
  };

  const onConfirm = async () => {
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
        amount: 1000,
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
        await createBookig(bookingData);
        toast.success("Payment successful. Check in My booking");
        dispatch(setBookingInfo(null));
        naviagate("/");
      }
    } catch (err) {
      toast.error("An error occurred while processing payment.");
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
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
      <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
        <div className="pb-4">
          <label htmlFor="card-element" className="pb-16">
            Credit or Debit Card
          </label>
        </div>
        <CardElement options={cardElementOptions} onChange={handleCardChange} />
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <div className="flex items-center justify-end mt-5">
          <Button
            type="submit"
            className="mt-4"
            size="lg"
            disabled={!stripe || loading || !isCardComplete}
          >
            {loading ? "Processing..." : "Pay"}
          </Button>
        </div>
      </form>
      <ConfirmModel
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        onConfirm={onConfirm}
      />
    </>
  );
}
