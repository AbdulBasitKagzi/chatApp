import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/authSlice";
import conversationSlice from "./Slice/conversationSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    conversation: conversationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
