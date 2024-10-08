import BackButton from "@/components/back-button";
import Loading from "@/components/ui/loading";
import BookingProcessForm from "@/features/booking/components/booking-process-form";
import { useGetARoomQuery } from "@/features/room/roomApi";
import { useParams } from "react-router-dom";

export default function BookingProcess() {
  const { id } = useParams();
  const { data: room, isLoading } = useGetARoomQuery(id!);
  if (isLoading) return <Loading />;
  return (
    <div className="min-h-screen py-8 ">
      <div className="pb-5">
        <BackButton />
      </div>
      <div className="max-w-4xl mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-8">Book Your Meeting Room</h2>
          <BookingProcessForm room={room!} />
        </div>
      </div>
    </div>
  );
}
