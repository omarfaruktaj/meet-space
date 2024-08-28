import {
  Card,
  CardContent,
  CardDescription,
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
      <CardHeader>
        <img
          className="w-full h-48 object-cover"
          src={room?.image}
          alt={room.name}
        />
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>Capacity: {room.capacity} people</CardDescription>
      </CardHeader>
      <CardContent>
        <p>${room.pricePerSlot} Per Slot</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link to={`/rooms/${room._id}`}>See Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
