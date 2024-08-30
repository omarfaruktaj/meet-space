import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBookingInfo {
  room: string;
  totalPrice: number;
  date: Date;
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
interface UserState {
  bookingInfo: null | IBookingInfo;
}

const initialState: UserState = {
  bookingInfo: null,
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setBookingInfo: (state, action: PayloadAction<IBookingInfo>) => {
      state.bookingInfo = action.payload;
    },
  },
});

export const { setBookingInfo } = userSlice.actions;
export default userSlice.reducer;
