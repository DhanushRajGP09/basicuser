import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const QuestionsSlice = createSlice({
  name: "Question",
  initialState: {
    Questions: [],
    uniqueContent: 0,
    test: {},
  },
  reducers: {
    addQuestions: (state, action) => {
      state.Questions = action.payload;
    },

    removeFromQuestions: (state, action) => {
      state.Questions = state.Questions.filter(
        (data) => data !== action.payload
      );
    },
    addUniqueNumber: (state, action) => {
      state.uniqueContent = action.payload;
    },
    addTest: (state, action) => {
      state.test = action.payload;
    },
  },
});

export const { addQuestions, removeFromQuestions, addUniqueNumber, addTest } =
  QuestionsSlice.actions;

export const getQuestions = (state) => state.Question.Questions;
export const getUniqueNumber = (state) => state.Question.uniqueContent;
export const getTests = (state) => state.Question.test;

export default QuestionsSlice.reducer;
