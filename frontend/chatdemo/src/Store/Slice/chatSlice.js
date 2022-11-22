import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const chatState = {
  isLoading: "",
  chat: [],
};

export const postChat = createAsyncThunk(
  "chaltslice/postchat",
  async (body, thunkAPI) => {
    try {
      console.log("body", body);
      const response = await axios.post("http://localhost:4000/chat", body, {
        headers: {
          Authorization: `Bearer ${localStorage
            .getItem("token")
            .replace(/\"/g, "")}`,
        },
      });
      console.log("res", response);
      console.log("222", body.conversationId);
      thunkAPI.dispatch(getChat(body.conversationId));
      //   return response;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getChat = createAsyncThunk(
  "chaltslice/postchat",
  async (body, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/getChat/${body}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("token")
              .replace(/\"/g, "")}`,
          },
        }
      );
      console.log("res", response);

      return response;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const chatSlice = createSlice({
  name: "chatslice",
  initialState: chatState,
  reducers: {
    emptyState: (state, action) => {
      state.chat = [];
    },
  },
  extraReducers: {
    [postChat.fulfilled]: (state, action) => {
      console.log("chat fulfilled action", action);
      state.isLoading = false;
    },
    [postChat.pending]: (state) => {
      state.isLoading = true;
    },
    [postChat.rejected]: (state, action) => {
      console.log("chat rejected action", action);
      state.isLoading = false;
    },
    [getChat.fulfilled]: (state, action) => {
      console.log("chat fulfilled action", action);

      state.isLoading = false;
      state.chat = action.payload.data;
    },
    [getChat.pending]: (state) => {
      state.isLoading = true;
    },
    [getChat.rejected]: (state, action) => {
      console.log("chat rejected action", action);
      state.isLoading = false;
    },
  },
});

export const chatAction = chatSlice.actions;

export default chatSlice.reducer;
