import { configureStore } from "@reduxjs/toolkit";
import chatReducer from '@/reducer/chatSlice'

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;
