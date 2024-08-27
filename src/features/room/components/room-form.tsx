import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Creatable from "react-select/creatable";
import { Input } from "@/components/ui/input";
import { roomFormSchema, TRoomFormSchema } from "../validation-schema";

interface RoomFormProps {
  initialData?: TRoomFormSchema;
  handleSubmit: (data: TRoomFormSchema) => void;
  isLoading?: boolean;
}

export default function RoomForm({
  initialData,
  handleSubmit,
  isLoading,
}: RoomFormProps) {
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<TRoomFormSchema>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          pricePerSlot: parseFloat(String(initialData.pricePerSlot)),
        }
      : {
          name: "",
          roomNo: 0,
          floorNo: 0,
          capacity: 0,
          pricePerSlot: 0,
          amenities: [],
        },
  });
  function handleCreate(inputValue: string) {
    const newOption = {
      label: inputValue,
      value: inputValue,
    };
    const updatedAmenities = [...form.getValues("amenities"), newOption.value];
    form.setValue("amenities", updatedAmenities);
  }

  function onSubmit(values: TRoomFormSchema) {
    handleSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Please Enter room name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roomNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Number</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter room number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="floorNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Floor Number</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter floor number"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter capacity" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pricePerSlot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per Slot</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter price per slot"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amenities"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Amenities</FormLabel>
              <FormControl>
                <Creatable
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      padding: "1px",
                      borderColor: state.isFocused
                        ? "hsl(262.1, 83.3%, 57.8%)"
                        : "#d1d5db",
                      boxShadow: state.isFocused
                        ? `0 0 0 1px hsl(262.1, 83.3%, 57.8%)`
                        : provided.boxShadow,
                      borderRadius: "0.3rem",
                      "&:hover": {
                        borderColor: state.isFocused
                          ? "hsl(262.1, 83.3%, 57.8%)"
                          : "#d1d5db",
                      },
                    }),
                  }}
                  isMulti
                  value={value.map((val) => ({ label: val, value: val }))}
                  onChange={(newValue) => {
                    onChange(newValue.map((option) => option.value));
                  }}
                  onCreateOption={handleCreate}
                  options={value.map((val) => ({ label: val, value: val }))}
                  placeholder="Table, chare.."
                  isClearable
                />
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
