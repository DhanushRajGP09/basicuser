import { configureStore } from "@reduxjs/toolkit";
import QuestionsReducer from "./Questions/QuestionsSlice";

export const store = configureStore({
  reducer: {
    Question: QuestionsReducer,
  },
});
