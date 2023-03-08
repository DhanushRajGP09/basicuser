import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const QuestionsSlice = createSlice({
  name: "Question",
  initialState: {
    Questions: [
      {
        questionId: 1,
        question: "sum of three numbers",
        description:
          "here You need to write a program to perform the addition of any three numbers given as an input",
        sampleInput: "1,2,3",
        sampleOutput: "6",
      },
      {
        questionId: 2,
        question: "sum of two numbers",
        description:
          "here You need to write a program to perform the addition of any two numbers given as an input",
        sampleInput: "2,3",
        sampleOutput: "5",
      },
      {
        questionId: 3,
        question: "print the leap years",
        description:
          "You should write a program to print the leap year between the two years you provide as an input",
        sampleInput: "2000,2020",
        sampleOutput: "2000, 2004, 2008, 2012, 2016, 2020",
      },
      {
        questionId: 4,
        question: "Fibbonaci series",
        description:
          "You should write a program to print the fibbonaci series of the number you provide as a input",
        sampleInput: 9,
        sampleOutput: 21,
      },
      {
        questionId: 5,
        question: "Find prime numbers between two numbers",
        description:
          "You should write a program to print the prime numbers between the two number you provide as a input",
        sampleInput: "1,20",
        sampleOutput: " 2 , 3 , 5 , 7 , 11 , 13 , 17 , 19",
      },
    ],
    uniqueContent: 0,
  },
  reducers: {
    addQuestions: (state, { payload }) => {
      let isPresent = false;
      for (let item of state.Questions) {
        if (item === payload) {
          isPresent = true;
        }
      }
      if (!isPresent) {
        state.Questions.unshift(payload);
      }
    },

    removeFromQuestions: (state, action) => {
      state.Questions = state.Questions.filter(
        (data) => data !== action.payload
      );
    },
    addUniqueNumber: (state, action) => {
      state.uniqueContent = action.payload;
    },
  },
});

export const { addQuestions, removeFromQuestions, addUniqueNumber } =
  QuestionsSlice.actions;

export const getQuestions = (state) => state.Question.Questions;
export const getUniqueNumber = (state) => state.Question.uniqueContent;

export default QuestionsSlice.reducer;
