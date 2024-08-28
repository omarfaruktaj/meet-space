import { Room } from "../room/types";
import { Slot } from "../slot/types";

export interface Booking {
  _id: string;
  room: Room;
  slots: Slot[];
  user: User;
  date: string;
  totalAmount: number;
  isConfirmed: string;
  isDeleted: boolean;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  __v: number;
}
