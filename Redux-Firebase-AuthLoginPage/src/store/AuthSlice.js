import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ref, push } from "firebase/database";
import database from "../api/firebase.js";

const FIREBASE_URL =
  "https://simpleloginapplication-eb372-default-rtdb.firebaseio.com/users.json";

// Async Thunk: Sign up a new user
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      // Push data to Firebase
      const userRef = ref(database, "users");
      const response = await push(userRef, formData);
      return { id: response.key, ...formData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk: Log in a user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get(FIREBASE_URL);
      const users = response.data;

      // Check if the email and password match a user
      for (const userId in users) {
        const user = users[userId];
        if (user.email === email && user.password === password) {
          console.log("Login success");

          const token = `${userId}-auth-token`;
          localStorage.setItem("authToken", token);
          return { email: user.email, username: user.username, token };
        }
      }

      throw new Error("Invalid email or password");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    token: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      state.token = null;
      state.error = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
