import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ref, push, update, remove } from "firebase/database";
import database from "../api/firebase.js";
//import { useDispatch } from "react-redux";

const FIREBASE_BRAND_URL =
  "https://simpleloginapplication-eb372-default-rtdb.firebaseio.com/brands.json";

const FIREBASE_DEVICE_URL =
  "https://simpleloginapplication-eb372-default-rtdb.firebaseio.com/device.json";

const FIREBASE_DASHBOARD_URL =
  "https://simpleloginapplication-eb372-default-rtdb.firebaseio.com/dashboard.json";

//Async Thunk : add brand data to cart
export const addBrandToDB = createAsyncThunk(
  "uData/addBrandToDB",
  async (formData, { rejectWithValue }) => {
    try {
      // Push data to Firebase
      const userRef = ref(database, "brands");
      const response = await push(userRef, formData);
      return { id: response.key, ...formData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk: Delete existing brand data in DB
export const deleteBrandInDB = createAsyncThunk(
  "uData/deleteBrandInDB",
  async (brandId, { rejectWithValue }) => {
    try {
      // Reference to the dashboard entry in Firebase using the dashboardId
      const brandRef = ref(database, `brands/${brandId}`);
      await remove(brandRef);
      //const response = await remove(deviceRef);

      // Return the updated data with the dashboardId for further use
      return { id: brandId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk: get brand data from cart
export const getBrandDataFromDB = createAsyncThunk(
  "uData/getBrandDataFromDB",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(FIREBASE_BRAND_URL);
      const brandDB = response.data;
      console.log("Raw Firebase Response:", response.data);
      const formattedBrandData = Object.entries(brandDB || {}).map(
        ([id, value]) => ({
          id,
          ...value,
        })
      );

      console.log("Formatted Brand Data:", formattedBrandData);
      return formattedBrandData;
    } catch (error) {
      console.error("Error fetching brands:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

//Async Thunk : add device data to cart
export const addDeviceToDB = createAsyncThunk(
  "uData/addDeviceToDB",
  async (formData, { rejectWithValue }) => {
    try {
      // Push data to Firebase
      const userRef = ref(database, "device");
      const response = await push(userRef, formData);

      return { id: response.key, ...formData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk: Update existing device data in DB
export const updateDeviceInDB = createAsyncThunk(
  "uData/updateDeviceInDB",
  async ({ deviceId, updatedData }, { rejectWithValue }) => {
    try {
      // Reference to the device entry in Firebase using the deviceId
      const deviceRef = ref(database, `device/${deviceId}`);

      // Update the existing device data in Firebase (e.g., update quantity)
      await update(deviceRef, updatedData);

      // Return the updated data with the deviceId for further use
      return { id: deviceId, ...updatedData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk: Delete existing device data in DB
export const deleteDeviceInDB = createAsyncThunk(
  "uData/deleteDeviceInDB",
  async (deviceId, { rejectWithValue }) => {
    try {
      // Reference to the dashboard entry in Firebase using the deviceId
      const deviceRef = ref(database, `device/${deviceId}`);
      await remove(deviceRef);

      // Return the updated data with the deviceId for further use
      return { id: deviceId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk: get device data from cart
export const getDeviceDataFromDB = createAsyncThunk(
  "uData/getDeviceDataFromDB",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(FIREBASE_DEVICE_URL);
      const deviceDB = response.data;
      console.log("Raw Firebase Response for devicedata:", response.data);
      //console.log("brandDB: ", [brandDB]);
      const formattedDeviceData = Object.entries(deviceDB || {}).map(
        ([deviceId, value]) => ({
          deviceId,
          ...value,
        })
      );
      console.log("Formatted Device Data:", formattedDeviceData);
      return formattedDeviceData;
    } catch (error) {
      console.error("Error fetching brands:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

//Async Thunk : add dashboard data to cart
export const addDashboardDataToDB = createAsyncThunk(
  "uData/addDashboardDataToDB",
  async ({ deviceId, dashBoardData }, { rejectWithValue }) => {
    try {
      const dashboardDataToAdd = { deviceId, ...dashBoardData };
      // Push data to Firebase
      const userRef = ref(database, "dashboard");
      const response = await push(userRef, dashboardDataToAdd);

      return { id: response.key, ...dashboardDataToAdd };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk: Update existing dashboard data in DB
export const updateDashboardInDB = createAsyncThunk(
  "uData/updateDashboardInDB",
  async ({ dashboardId, updatedData }, { rejectWithValue }) => {
    try {
      // Reference to the dashboard entry in Firebase using the dashboardId
      const dashboardRef = ref(database, `dashboard/${dashboardId}`);

      await update(dashboardRef, updatedData);

      // Return the updated data with the dashboardId for further use
      return { id: dashboardId, ...updatedData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk: Delete existing dashboard data in DB
export const deleteDashboardInDB = createAsyncThunk(
  "uData/deleteDashboardInDB",
  async (dashboardId, { rejectWithValue }) => {
    try {
      // Reference to the dashboard entry in Firebase using the dashboardId
      const dashboardRef = ref(database, `dashboard/${dashboardId}`);
      await remove(dashboardRef);
      // Return the updated data with the dashboardId for further use
      return { id: dashboardId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk: get brand data from cart
export const getDashboardDataFromDB = createAsyncThunk(
  "uData/getDashboardDataFromDB",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(FIREBASE_DASHBOARD_URL);
      const dashboardDB = response.data;
      console.log("Raw Firebase Response for devicedata:", response.data);
      //console.log("brandDB: ", [brandDB]);
      const formattedDashboardData = Object.entries(dashboardDB || {}).map(
        ([id, value]) => ({
          id,
          ...value,
        })
      );
      console.log("Formatted Dashboard Data:", formattedDashboardData);
      return formattedDashboardData;
    } catch (error) {
      console.error("Error fetching brands:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

const dataSlice = createSlice({
  name: "uData",
  initialState: {
    status: "idle",
    error: null,
    brandData: null,
    deviceData: null,

    dashboardData: null,
    brandDB: [],
    deviceDB: [],
    dashboardDB: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBrandToDB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBrandToDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brandData = action.payload;
      })
      .addCase(addBrandToDB.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getBrandDataFromDB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBrandDataFromDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brandDB = action.payload;
      })
      .addCase(getBrandDataFromDB.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addDeviceToDB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDeviceToDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deviceData = action.payload;
      })
      .addCase(addDeviceToDB.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getDeviceDataFromDB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDeviceDataFromDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deviceDB = action.payload;
      })
      .addCase(getDeviceDataFromDB.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addDashboardDataToDB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDashboardDataToDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dashboardData = action.payload;
      })
      .addCase(addDashboardDataToDB.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getDashboardDataFromDB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDashboardDataFromDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dashboardDB = action.payload;
      })
      .addCase(getDashboardDataFromDB.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteDeviceInDB.fulfilled, (state, action) => {
        state.deviceDB = state.deviceDB.filter(
          (device) => device.deviceId !== action.payload.id
        );
      })
      .addCase(deleteBrandInDB.fulfilled, (state, action) => {
        state.brandDB = state.brandDB.filter(
          (brand) => brand.id !== action.payload.id
        );
      })
      .addCase(deleteDashboardInDB.fulfilled, (state, action) => {
        state.dashboardDB = state.dashboardDB.filter(
          (data) => data.id !== action.payload.id
        );
      })
      .addCase(updateDashboardInDB.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDashboardInDB.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.dashboardDB.findIndex(
          (dashboard) => dashboard.id === action.payload.id
        );
        if (index !== -1) {
          state.dashboardDB[index] = action.payload; // Replace the updated entry
        }
      })
      .addCase(updateDashboardInDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update dashboard data";
      })
      .addCase(updateDeviceInDB.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDeviceInDB.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.deviceDB.findIndex(
          (device) => device.id === action.payload.id
        );
        if (index !== -1) {
          state.deviceDB[index] = action.payload; // Replace the updated entry
        }
      })
      .addCase(updateDeviceInDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update device data";
      });
  },
});

export default dataSlice.reducer;
