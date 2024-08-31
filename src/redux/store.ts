import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseapi";
import userSlice from "@/features/user/userSlice";
import bookingSlice from "@/features/booking/bookingSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    booking: bookingSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
