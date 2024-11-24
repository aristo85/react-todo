import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "../todo/todoApi";

export default configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});
