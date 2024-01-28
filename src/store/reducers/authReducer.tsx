import { createSlice } from "@reduxjs/toolkit";

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
