import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";
import { RootState } from "@/redux/store";

interface UserState {
  token: null | string;
  user: null | User;
}

const initialState: UserState = {
  token: localStorage.getItem("token") || null,
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;

      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },

    logOut: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, setUser, logOut } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;
