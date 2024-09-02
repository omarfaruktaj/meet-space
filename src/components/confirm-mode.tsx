import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Badge } from "./ui/badge";
import { CheckCircle } from "lucide-react";
import { setBookingInfo } from "@/features/booking/bookingSlice";

interface ConfirmModelProps {
  isOpen: boolean;
}

export default function ConfirmModel({ isOpen }: ConfirmModelProps) {
  const dispatch = useAppDispatch();
  const bookingDetails = useAppSelector((state) => state.booking.bookingInfo);

  function onConfirm() {
    dispatch(setBookingInfo(null));
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="p-6">
        <AlertDialogHeader>
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />

          <AlertDialogTitle className="mx-auto">
            Booking Confirmed!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Your booking has been successfully confirmed.
          </AlertDialogDescription>
          <div className="my-4">
            <p>Below are your booking details:</p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Room Name:</span>
              <span className="font-semibold">{bookingDetails?.roomName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold">{bookingDetails?.date}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Cost:</span>
              <span className="font-semibold">
                ${bookingDetails?.totalPrice}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">User:</span>
              <span className="font-semibold">
                {bookingDetails?.userInfo?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Time slots:</p>
              <div className="flex items-center justify-start flex-wrap gap-1 ">
                {bookingDetails?.slots?.map((slot, index) => (
                  <span key={index} className="px-2 py-1 rounded-md">
                    <Badge>{slot.label}</Badge>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4">
          <AlertDialogAction
            className={`${buttonVariants({
              variant: "default",
            })} mx-auto`}
            onClick={onConfirm}
          >
            Back to home
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
