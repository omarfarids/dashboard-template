import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./reducers/globalReducer";
import cartReducer from "./reducers/cartReducer";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    global: globalReducer,
  },
});
