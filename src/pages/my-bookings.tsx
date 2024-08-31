import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { useMyBookingsQuery } from "@/features/booking/bookingApi";
import { DataTable } from "@/features/booking/components/table/data-table";
import { myBookingColumns } from "@/features/booking/components/table/my-booking-columns";
import { Link } from "react-router-dom";

export default function MyBooking() {
  const { data, isLoading } = useMyBookingsQuery(null);
  if (isLoading) return <Loading />;

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen max-w-xl mx-auto flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold mb-4">No Bookings Found</h1>
        <p className="text-lg mb-6">
          It looks like you haven’t booked any rooms yet. To start making
          reservations, please visit our booking page.
        </p>
        <Button>
          <Link to="/meeting-rooms">Book a Room</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-10">
      <div className="flex items-start justify-between pb-8">
        <h1 className="text-2xl font-bold">My Bookings</h1>
      </div>
      <DataTable columns={myBookingColumns} data={data} />
    </div>
  );
}
