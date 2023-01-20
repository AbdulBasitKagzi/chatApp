import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const chatState = {
  isLoading: "",
  chat: [],
  image:null
};

const apiCall = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localStorage
      .getItem("token")
      ?.replace(/\"/g, "")}`,
  },
});


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
      // console.log("res", response);

      return response;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadFile = createAsyncThunk("chatslice/uploadfile", async (body, thunkAPI) => {
  try {
    const response = await apiCall.post('/post/file', body)
    return response
  } catch (error) {
    console.log("error", error);
    return thunkAPI.rejectWithValue(error);
  }
})

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
      state.isLoading = false;
    },
    [postChat.pending]: (state) => {
      state.isLoading = true;
    },
    [postChat.rejected]: (state, action) => {

      state.isLoading = false;
    },

    [getChat.fulfilled]: (state, action) => {

      state.isLoading = false;
      state.chat = action.payload.data;
    },
    [getChat.pending]: (state) => {
      state.isLoading = true;
    },
    [getChat.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [uploadFile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.image = action.payload.data.url;
    },
    [uploadFile.pending]: (state) => {
      state.isLoading = true;
    },
    [uploadFile.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const chatAction = chatSlice.actions;

export default chatSlice.reducer;
