import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userState = {
  userData: [],
  isLoading: "",
  error: "",
  token: "",
  allUsers: [],
};

const apiCall = axios.create({
  baseURL: "http://localhost:4000/",
  header: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type":
      "application/x-www-form-urlencoded; charset=UTF-8;application/json",
  },
});

export const registerUser = createAsyncThunk(
  "userslice/signup",
  async (body, thunkAPI) => {
    try {
      const response = await apiCall.post("/post", body);
      console.log("res", response);
      localStorage.setItem("userData", JSON.stringify(response.data.newUser));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return response;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const LoginUser = createAsyncThunk(
  "userslice/login",
  async (body, thunkAPI) => {
    try {
      const response = await apiCall.post("/login", body);
      console.log("res", response);
      localStorage.setItem("userData", JSON.stringify(response.data.User));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return response;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUsers = createAsyncThunk(
  "userslice/getusers",
  async (body, thunkAPI) => {
    try {
      const response = await apiCall.get("/getuser", body);
      console.log("res", response);
      // localStorage.setItem("userData", JSON.stringify(response.data.User));
      // localStorage.setItem("token", JSON.stringify(response.data.token));
      return response;
    } catch (error) {
      console.log("error", error);
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
    },
    [registerUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [registerUser.rejected]: (state, action) => {
      console.log("action", action);
      state.isLoading = false;
    },
    [LoginUser.fulfilled]: (state, action) => {
      console.log("action", action);
      state.token = action.payload.data.token;
      state.isLoading = false;
    },
    [LoginUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [LoginUser.rejected]: (state, action) => {
      console.log("action", action);
      state.isLoading = false;
    },
    [getUsers.fulfilled]: (state, action) => {
      console.log("action", action);
      state.isLoading = false;
      state.allUsers = action.payload.data;
      console.log("all user", state.allUsers);
    },
    [getUsers.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getUsers.rejected]: (state, action) => {
      console.log("action", action);
      state.isLoading = false;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
