import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { slotFormSchema, TSlotFormSchema } from "../validation-schema";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetRoomsQuery } from "@/features/room/roomApi";

interface SlotFormProps {
  initialData?: TSlotFormSchema;
  handleSubmit: (data: TSlotFormSchema) => void;
  isLoading?: boolean;
}

export default function SlotForm({
  initialData,
  handleSubmit,
  isLoading,
}: SlotFormProps) {
  const { data, isLoading: isRoomLoading } = useGetRoomsQuery({});

  const action = initialData ? "Save changes" : "Create";
  const rooms = data?.data;
  const form = useForm<TSlotFormSchema>({
    resolver: zodResolver(slotFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          date: new Date(initialData.date),
        }
      : {
          date: undefined,
          startTime: "",
          endTime: "",
          room: "",
        },
  });

  function onSubmit(values: TSlotFormSchema) {
    handleSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="room"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room</FormLabel>
              <Select
                disabled={isRoomLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {rooms?.length &&
                    rooms.map((room) => (
                      <SelectItem key={room._id} value={room._id}>
                        {`${room.name} - ${room.roomNo}`}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);

                      const historicalDate = new Date("1900-01-01");
                      historicalDate.setHours(0, 0, 0, 0);

                      return date < today || date < historicalDate;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="time" placeholder="Enter start time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="time" placeholder="Enter end time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full" type="submit">
          {action}
        </Button>
      </form>
    </Form>
  );
}
