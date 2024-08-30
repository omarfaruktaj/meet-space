import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { columns } from "@/features/room/components/table/columns";
import { DataTable } from "@/features/room/components/table/data-table";
import { useGetRoomsQuery } from "@/features/room/roomApi";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Rooms() {
  const { data, isLoading } = useGetRoomsQuery({ limit: 100 });
  const navigate = useNavigate();
  if (isLoading) return <Loading />;

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
      <DataTable columns={columns} data={data.data} />
    </div>
  );
}
