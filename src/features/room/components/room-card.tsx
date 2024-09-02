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
import { useSpring, animated } from "@react-spring/web";

export default function RoomCard({ room }: { room: Room }) {
  const cardAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
  });

  return (
    <animated.div style={cardAnimation}>
      <Card className="h-full">
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
    </animated.div>
  );
}
