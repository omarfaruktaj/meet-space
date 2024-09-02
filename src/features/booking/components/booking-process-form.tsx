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
import { Calendar } from "@/components/ui/calendar";

import Select, { GroupBase, OptionsOrGroups } from "react-select";
import { useSelector } from "react-redux";
import { Room } from "@/features/room/types";
import { useGetAvailabilSlotsQuery } from "@/features/slot/slotApi";
import { selectUser } from "@/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBookingInfo } from "../bookingSlice";
import { useNavigate } from "react-router-dom";
import { convertTime24to12 } from "@/utils/format-time-24-to-12";

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

  const bookingData = useAppSelector((state) => state.booking.bookingInfo);

  const dispatch = useAppDispatch();
  const form = useForm<TBookingProcessFormSchema>({
    resolver: zodResolver(BookingProcessFormSchema),
    defaultValues: bookingData
      ? {
          date: new Date(bookingData.date),
          slots: bookingData.slots,
          userInfo: { ...bookingData.userInfo },
        }
      : {
          userInfo: {
            ...user,
          },
          slots: [],
        },
  });
  const dateValue = useWatch({ control: form.control, name: "date" });
  const slotValue = useWatch({ control: form.control, name: "slots" });

  const { data, isLoading, error } = useGetAvailabilSlotsQuery(
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
    label: `${convertTime24to12(slot.startTime)} - ${convertTime24to12(
      slot.endTime
    )}`,
  })) || [];

  if (slotValue.length === 0) {
    console.log(true);
    setBookingInfo(null);
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="mb-2">
              Room:{" "}
              <span className=" font-semibold mb-6 text-gray-600">
                {room?.name}
              </span>
            </p>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Select a Date</FormLabel>

                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                    className="rounded-md border max-w-72"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slots"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Select Slots</FormLabel>
                  <FormControl>
                    <Select
                      className="max-w-72"
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
                      closeMenuOnSelect={false}
                      onChange={onChange}
                      options={slotOptions}
                      isDisabled={!dateValue || isLoading || !!error}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="h-2">
                    {error && (
                      <p className="text-rose-500">No Slot availabile.</p>
                    )}
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-8">
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
          <Button size={"lg"} type="submit" disabled={slotValue.length === 0}>
            Checkout
          </Button>
        </div>
      </form>
    </Form>
  );
}
