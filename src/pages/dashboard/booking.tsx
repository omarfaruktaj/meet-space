import { useGetBookingsQuery } from "@/features/booking/bookingApi";
import { columns } from "@/features/booking/components/table/columns";
import { DataTable } from "@/features/booking/components/table/data-table";

export default function Booking() {
  const { data, isLoading } = useGetBookingsQuery(null);
  if (isLoading) return <p>Loadding..</p>;

  if (!data) return <p>No data found.</p>;
  return (
    <div className="py-10">
      <div className="flex items-start justify-between pb-8">
        <h1 className="text-2xl font-bold">Bookings</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
