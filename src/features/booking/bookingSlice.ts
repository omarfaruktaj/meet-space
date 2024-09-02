import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IBookingInfo {
  roomId: string;
  roomName: string;
  totalPrice: number;
  date: string;
  slots: {
    value: string;
    label: string;
  }[];
  userInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}
interface BookingState {
  bookingInfo: null | IBookingInfo;
}

const initialState: BookingState = {
  bookingInfo: null,
};

export const bookingSlice = createSlice({
  initialState,
  name: "booking",
  reducers: {
    setBookingInfo: (state, action: PayloadAction<IBookingInfo | null>) => {
      state.bookingInfo = action.payload;
    },
  },
});

export const { setBookingInfo } = bookingSlice.actions;
export default bookingSlice.reducer;
