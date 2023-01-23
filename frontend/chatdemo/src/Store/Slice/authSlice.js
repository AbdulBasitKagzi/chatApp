import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate } from "react-router-dom";


const userState = {
  userData: "",
  isLoading: "",
  error: "",
  token: "",
  allUsers: [],
  isAuthenticated: false
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
      console.log('error', error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateusersettings = createAsyncThunk(
  "userslice/updateusersettings",
  async (body, thunkAPI) => {
    console.log('----->', body)
    try {
      const response = await apiCall.patch("/updateusersettings", { usersettings: body });
      thunkAPI.dispatch(getCurrentUser())
      return response;
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "userslice",
  initialState: userState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = false
    }
  },
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
      state.isAuthenticated = true
      console.log('isAuth', state.isAuthenticated)
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
      state.isAuthenticated = true
    },

    [getUsers.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getUsers.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [getCurrentUser.fulfilled]: (state, action) => {
    
      state.userData = action.payload.data
      state.isLoading = false;
      state.isAuthenticated = true

    },
    [getCurrentUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCurrentUser.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [updateusersettings.fulfilled]: (state, action) => {


      state.isLoading = false;
      state.isAuthenticated = true

    },
    [updateusersettings.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateusersettings.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
