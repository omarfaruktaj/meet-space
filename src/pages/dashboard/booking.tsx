import { Button } from "@/components/ui/button";
import { useGetBookingsQuery } from "@/features/booking/bookingApi";
import { columns } from "@/features/booking/components/table/columns";
import { DataTable } from "@/features/booking/components/table/data-table";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const { data, isLoading } = useGetBookingsQuery(null);
  const navigate = useNavigate();
  if (isLoading) return <p>Loadding..</p>;

  if (!data) return <p>No data found.</p>;
  return (
    <div className="py-10">
      <div className="flex items-start justify-between pb-8">
        <h1 className="text-2xl font-bold">Rooms</h1>
        <Button
          onClick={() => navigate("/dashboard/rooms/create")}
          variant={"outline"}
          className="flex items-center  space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Room</span>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
