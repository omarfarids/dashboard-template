import { useQuery } from "@tanstack/react-query";
import { createSlice } from "@reduxjs/toolkit";

export const { data } = useQuery({
  queryKey: ["auth"],
  queryFn: async () => {
    await fetch("https://jsonplaceholder.typicode.com/todos/1", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
});

export interface authReducer {
  userAuth: any;
}

const initialState: authReducer = {
  userAuth: {},
};
export const authSlice = createSlice({
  name: "",
  initialState,
  reducers: {
    setloginProcess: (state: any, action) => {
      state.loginProcess = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function

export const { setloginProcess } = authSlice.actions;

export default authSlice.reducer;
