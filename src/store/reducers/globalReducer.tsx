import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface globalReducer {
  user: any;
}

const initialState: globalReducer = {
  user: {
    token: Cookies.get("token"),
    username: Cookies.get("username"),
    image: Cookies.get("image"),
    userId: Cookies.get("userId"),
    role: Cookies.get("role"),
  },
};

export const globalSlice = createSlice({
  name: "global store",
  initialState,
  reducers: {
    registerUser: (state) => {
      state.user = {
        token: Cookies.get("token"),
        username: Cookies.get("username"),
        image: Cookies.get("image"),
        userId: Cookies.get("userId"),
        role: Cookies.get("role"),
      };
    },
    logoutUser: (state) => {
      state.user = {
        token: null,
        username: null,
        image: null,
        userId: null,
        role: null,
      };
    },
  },
});
// Action creators are generated for each case reducer function

export const { registerUser, logoutUser } = globalSlice.actions;

export default globalSlice.reducer;
