import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/authSlice";
import conversationSlice from "./Slice/conversationSlice";
import chatSlice from "./Slice/chatSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    conversation: conversationSlice,
    chat: chatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
