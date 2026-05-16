import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../src/features/Cart/CartSlice";

export const store = configureStore({
  reducer: {
    Cart: CartReducer,
  },
});
