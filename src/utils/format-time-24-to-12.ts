import { format, parseISO } from "date-fns";

export function convertTime24to12(time24: string) {
  const timeISO = `1970-01-01T${time24}:00`;
  const date = parseISO(timeISO);
  return format(date, "h:mm a");
}
