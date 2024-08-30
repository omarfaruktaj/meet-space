import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { columns } from "@/features/slot/components/table/columns";
import { DataTable } from "@/features/slot/components/table/data-table";
import { useGetSlotsQuery } from "@/features/slot/slotApi";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Slots() {
  const { data, isLoading } = useGetSlotsQuery(null);
  const navigate = useNavigate();
  if (isLoading) return <Loading />;

  if (!data) return <p>No data found.</p>;

  return (
    <div className="py-10">
      <div className="flex items-start justify-between pb-8">
        <h1 className="text-2xl font-bold">Slots</h1>
        <Button
          onClick={() => navigate("/dashboard/slots/create")}
          variant={"outline"}
          className="flex items-center  space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Slot</span>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
