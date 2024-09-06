import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import prodouctReducer from "./features/product/productSlice";

export const store = configureStore({
  reducer: {
    auths: authReducer,
    products: prodouctReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
