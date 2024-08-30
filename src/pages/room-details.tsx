import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loading from "@/components/ui/loading";
import { useGetARoomQuery } from "@/features/room/roomApi";
import { useNavigate, useParams } from "react-router-dom";

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetARoomQuery(id!);
  if (isLoading) return <Loading />;

  if (!data) return "no data found";

  return (
    <div className="min-h-scree">
      <BackButton />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-12">
          <div className="md:w-1/2 lg:w-1/3">
            <Carousel className="w-full ">
              <CarouselContent>
                {data.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-2">
                      <Card className="border  overflow-hidden">
                        <CardContent className="flex aspect-square items-center justify-center p-4">
                          <img
                            src={image}
                            alt={`Room Image ${index + 1}`}
                            className="w-full  rounded-lg"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2" />
              <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2" />
            </Carousel>
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {data.name}
            </h1>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Room No:</span> {data.roomNo}
              </p>
              <p>
                <span className="font-semibold">Floor No:</span> {data.floorNo}
              </p>
              <p>
                <span className="font-semibold">Capacity:</span> {data.capacity}{" "}
                People
              </p>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-4">
              ${data.pricePerSlot}{" "}
              <span className="text-sm text-gray-500">per slot</span>
            </p>
            <div>
              <Button onClick={() => navigate("booking")} size="lg">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
