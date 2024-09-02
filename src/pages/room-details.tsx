import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { useGetARoomQuery } from "@/features/room/roomApi";
import { CircleCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: room, isLoading } = useGetARoomQuery(id!);

  const fadeIn = useSpring({ opacity: isLoading ? 0 : 1 });
  const slideUp = useSpring({
    transform: isLoading ? "translateY(20px)" : "translateY(0)",
    opacity: isLoading ? 0 : 1,
  });

  if (isLoading) return <Loading />;

  if (!room) return "no data found";

  return (
    <animated.div style={fadeIn} className="min-h-screen py-8">
      <BackButton />
      <animated.div
        style={slideUp}
        className="max-w-4xl mx-auto shadow-md rounded-md p-8"
      >
        <div className="flex flex-col gap-x-8 gap-y-8">
          <div className="md:flex space-y-4 md:space-y-0 md:space-x-1">
            <div className="relative flex-shrink-0 w-full md:w-80 lg:w-96 h-96 md:h-96 lg:h-96 rounded-lg overflow-hidden">
              <animated.img
                src={room.images[0]}
                alt="meeting-room-image-1"
                className="w-full h-full object-cover"
                style={slideUp}
              />
            </div>

            <div className="flex flex-row md:flex-col space-x-1 md:space-x-0 md:space-y-1 md:flex-grow">
              <div className="relative flex-shrink-0 w-1/2 md:w-full lg:w-full h-36 md:h-48 rounded-lg overflow-hidden">
                <animated.img
                  src={room.images[1]}
                  alt="meeting-room-image-2"
                  className="w-full h-full object-cover"
                  style={slideUp}
                />
              </div>
              <div className="relative flex-shrink-0 w-1/2 md:w-full lg:w-full h-36 md:h-48 rounded-lg overflow-hidden">
                <animated.img
                  src={room.images[2]}
                  alt="meeting-room-image-3"
                  className="w-full h-full object-cover"
                  style={slideUp}
                />
              </div>
            </div>
          </div>

          <animated.div
            style={slideUp}
            className="flex flex-col justify-start md:flex-grow"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {room.name}
              </h2>
              <p className="mb-3">
                <span className="text-lg font-semibold">Room No:</span>
                <span className="text-lg text-gray-600"> {room.roomNo}</span>
              </p>
              <p className="mb-3">
                <span className="text-lg font-semibold">Floor No:</span>
                <span className="text-lg text-gray-600"> {room.floorNo}</span>
              </p>
              <p className="mb-6">
                <span className="text-lg font-semibold">Capacity:</span>
                <span className="text-lg text-gray-600 pl-1">
                  {room.capacity} People
                </span>
              </p>
            </div>

            <div>
              <p className="text-xl font-bold text-gray-800 mb-4">
                ${room.pricePerSlot}{" "}
                <span className="text-sm text-gray-500">Per slot</span>
              </p>
              <Button onClick={() => navigate("booking")} size={"lg"}>
                Book Now
              </Button>
            </div>
          </animated.div>
        </div>

        <animated.div style={slideUp} className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Amenities</h3>
          <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
            {room.amenities.map((amenity, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 mb-2 text-gray-800"
              >
                <CircleCheck className="h-4 w-4 text-green-500" />
                <span>{amenity}</span>
              </li>
            ))}
          </ul>
        </animated.div>

        <animated.div style={slideUp} className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Description</h3>
          <p className="text-gray-700 leading-7">{room.description}</p>
        </animated.div>
      </animated.div>
    </animated.div>
  );
}
