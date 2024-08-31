import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "../types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <img
        className="w-full h-48 object-cover rounded-t-md"
        src={room?.images[0]}
        alt={room.name}
      />
      <CardHeader className="pb-3">
        <CardTitle>{room.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-1">Capacity: {room.capacity} people</p>
        <p>${room.pricePerSlot} Per Slot</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link to={`/meeting-rooms/${room._id}`}>See Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
