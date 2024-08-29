import { Button } from "@/components/ui/button";
import { useGetRoomsQuery } from "../roomApi";
import RoomCard from "./room-card";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";

export default function FeaturedRooms() {
  const { data, isLoading } = useGetRoomsQuery({});
  if (isLoading) return <p>Loadding..</p>;

  if (!data) return <p>Someting went very wrong! Please, refresh the page.</p>;

  const rooms = data.data.slice(0, 6);

  return (
    <div className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold ">Featured Rooms</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose from our top meeting spaces.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
        <div className="text-end mt-12">
          <Button asChild>
            <Link
              to="/meeting-rooms"
              className="flex items-center justify-center space-x-2"
            >
              <span>See More Rooms</span>
              <MoveRight className="h-5 w-5 mt-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
