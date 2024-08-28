import { useMyBookingsQuery } from "@/features/booking/bookingApi";
import { DataTable } from "@/features/booking/components/table/data-table";
import { myBookingColumns } from "@/features/booking/components/table/my-booking-columns";

export default function MyBooking() {
  const { data, isLoading } = useMyBookingsQuery(null);
  if (isLoading) return <p>Loadding..</p>;
  console.log(data);
  if (!data) return <p>No data found.</p>;
  return (
    <div className="py-10">
      <div className="flex items-start justify-between pb-8">
        <h1 className="text-2xl font-bold">My Bookings</h1>
      </div>
      <DataTable columns={myBookingColumns} data={data} />
    </div>
  );
}
