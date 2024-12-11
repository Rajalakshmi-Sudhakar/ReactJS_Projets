import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/AuthSlice.js";
import dataReducer from "../store/UserDataSlice.js";

//import authSlice from "./AuthSlice";

const store = configureStore({
  reducer: { auth: authReducer, uData: dataReducer },
});

export default store;
