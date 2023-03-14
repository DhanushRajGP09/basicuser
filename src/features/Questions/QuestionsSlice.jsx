import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const QuestionsSlice = createSlice({
  name: "Question",
  initialState: {
    Questions: [],
    uniqueContent: 0,
    test: {},
    defaultCode: "",
    testStatus: "",
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
    addDefaultCode: (state, action) => {
      state.defaultCode = action.payload;
    },
    addTestStatus: (state, action) => {
      state.testStatus = action.payload;
    },
  },
});

export const {
  addQuestions,
  removeFromQuestions,
  addUniqueNumber,
  addTest,
  addDefaultCode,
  addTestStatus,
} = QuestionsSlice.actions;

export const getQuestions = (state) => state.Question.Questions;
export const getUniqueNumber = (state) => state.Question.uniqueContent;
export const getTests = (state) => state.Question.test;
export const getDefaultCode = (state) => state.Question.defaultCode;
export const getTestStatus = (state) => state.Question.testStatus;

export default QuestionsSlice.reducer;
