import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const userState = {
  userData: "",
  isLoading: "",
  error: "",
  token: "",
  allUsers: [],
  isAutheticated: false
};

const apiCall = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage
      .getItem("token")
      ?.replace(/\"/g, "")}`,
  },
});

export const registerUser = createAsyncThunk(
  "userslice/signup",
  async (body, thunkAPI) => {
    try {
      const response = await apiCall.post("/post", body)
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const LoginUser = createAsyncThunk(
  "userslice/login",
  async (body, thunkAPI) => {
    try {
      const response = await apiCall.post("/login", body);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUsers = createAsyncThunk(
  "userslice/getusers",
  async (body, thunkAPI) => {
    try {
      const response = await apiCall.get("/getuser", body);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "userslice/getcurrentuser",
  async (body, thunkAPI) => {
    try {
      const response = await apiCall.get("/getcurrentuser");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "userslice",
  initialState: userState,
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.token = action.payload.data.token;
      state.isLoading = false;
      state.isAutheticated = true
      state.userData = action.payload.data.User
    },
    [registerUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [registerUser.rejected]: (state, action) => {

      state.isLoading = false;
    },

    [LoginUser.fulfilled]: (state, action) => {
      state.token = action.payload.data.token;
      state.isLoading = false;
      state.isAutheticated = true
      state.userData = action.payload.data.User
    },
    [LoginUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [LoginUser.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload.data;
      state.isAutheticated = true
    },

    [getUsers.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getUsers.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [getCurrentUser.fulfilled]: (state, action) => {

      state.userData = action.payload.data[0]
      state.isLoading = false;
      state.isAutheticated = true

    },
    [getCurrentUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCurrentUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
