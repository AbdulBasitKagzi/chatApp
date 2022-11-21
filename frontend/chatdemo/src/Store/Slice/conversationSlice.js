import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const conversationState = {
  isLoading: "",
  conversation: [],
};

const apiCall = axios.create({
  baseURL: "http://localhost:4000/",
  header: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type":
      "application/x-www-form-urlencoded; charset=UTF-8;application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export const getConversation = createAsyncThunk(
  "conversationSlice/getConversation",
  async (body, thunkAPI) => {
    try {
      console.log(localStorage.getItem("token"));
      const response = await apiCall("/getconversation", {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded; charset=UTF-8;application/json",
          Authorization: `Bearer ${localStorage
            .getItem("token")
            .replace(/\"/g, "")}`,
        },
      });
      console.log("res", response);
      return response;
    } catch (error) {
      console.log("error", error);
      console.log(localStorage.getItem("token"));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const converSationSlice = createSlice({
  name: "conversation",
  initialState: conversationState,
  extraReducers: {
    [getConversation.fulfilled]: (state, action) => {
      console.log("tok", state.token);
      console.log("fulfilled action", action);
      state.conversation = action.payload.data.convo;
      state.isLoading = false;
    },
  },
  [getConversation.pending]: (state, action) => {
    state.isLoading = true;
  },
  [getConversation.rejected]: (state, action) => {
    console.log("tok", state.token);
    console.log("pending action", action);
    state.isLoading = false;
  },
});

const conversationAction = converSationSlice.actions;
export default converSationSlice.reducer;
