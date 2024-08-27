import { Room } from "../room/types";

export interface Slot {
  _id: string;
  room: Room;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  __v: number;
}
