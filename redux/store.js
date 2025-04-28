// Create the Store

import { configureStore } from "@reduxjs/toolkit";
import  cartSlice  from "../redux/slices/cartSlice";
import  checkoutSlice  from "../redux/slices/checkoutSlice";

export const store = configureStore({
  reducer: {
    //Slice go here
    cart: cartSlice,
    checkout:checkoutSlice
  },
});
