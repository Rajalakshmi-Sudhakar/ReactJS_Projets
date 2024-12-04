import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/AuthSlice.js";

//import authSlice from "./AuthSlice";

const store = configureStore({
  reducer: { auth: authReducer },
});

export default store;
