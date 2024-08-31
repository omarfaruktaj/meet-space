import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import {
  BookingProcessFormSchema,
  TBookingProcessFormSchema,
} from "../validation-schema";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Select, { GroupBase, OptionsOrGroups } from "react-select";
import { useSelector } from "react-redux";
import { Room } from "@/features/room/types";
import { useGetAvailabilSlotsQuery } from "@/features/slot/slotApi";
import { selectUser } from "@/features/user/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setBookingInfo } from "../bookingSlice";
import { useNavigate } from "react-router-dom";

type OptionType = {
  value: string;
  label: string;
};

interface BookingProcessFormProps {
  room: Room;
}

export default function BookingProcessForm({ room }: BookingProcessFormProps) {
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const form = useForm<TBookingProcessFormSchema>({
    resolver: zodResolver(BookingProcessFormSchema),
    defaultValues: {
      userInfo: {
        ...user,
      },
      slots: [],
    },
  });
  const dateValue = useWatch({ control: form.control, name: "date" });

  const { data, isLoading } = useGetAvailabilSlotsQuery(
    {
      roomId: room?._id,
      date: format(new Date(dateValue ? dateValue : new Date()), "yyyy-MM-dd"),
    },
    { skip: !dateValue }
  );

  const slotOptions: OptionsOrGroups<
    OptionType,
    GroupBase<OptionType>
  > = data?.map((slot) => ({
    value: slot._id,
    label: `${slot.startTime} - ${slot.endTime}`,
  })) || [];

  function onSubmit(values: TBookingProcessFormSchema) {
    const bookingInfo = {
      ...values,
      date: format(values.date, "yyyy-MM-dd"),
      roomId: room._id,
      roomName: room.name,
      totalPrice: room.pricePerSlot * values.slots.length,
    };
    dispatch(setBookingInfo(bookingInfo));
    navigate("chackout");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Room Details
            </h3>
            <p className="mb-2">Room</p>
            <p className="text-xl font-semibold mb-6 text-gray-600">
              {room?.name}
            </p>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
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
                          return date < today;
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
              name="slots"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Slots</FormLabel>
                  <FormControl>
                    <Select
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          padding: "2px",
                          borderColor: state.isFocused
                            ? "hsl(262.1, 83.3%, 57.8%)"
                            : "#d1d5db",
                          boxShadow: state.isFocused
                            ? `0 0 0 1px hsl(262.1, 83.3%, 57.8%)`
                            : provided.boxShadow,
                          borderRadius: "0.375rem",
                          "&:hover": {
                            borderColor: state.isFocused
                              ? "hsl(262.1, 83.3%, 57.8%)"
                              : "#d1d5db",
                          },
                        }),
                      }}
                      isMulti
                      value={value.map((val) => ({
                        label: val.label,
                        value: val.value,
                      }))}
                      onChange={onChange}
                      options={slotOptions}
                      isDisabled={!dateValue || isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Your Information
            </h3>

            <FormField
              control={form.control}
              name="userInfo.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userInfo.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userInfo.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userInfo.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button size={"lg"} type="submit">
            Checkout
          </Button>
        </div>
      </form>
    </Form>
  );
}
