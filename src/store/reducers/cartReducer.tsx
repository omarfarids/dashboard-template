import { createSlice } from "@reduxjs/toolkit";

export interface cartReducer {
  cartItems: any;
}

const initialState: cartReducer = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart store",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function

export const { setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
