import { createSlice } from "@reduxjs/toolkit";

const INIT_QUESTIONS = [
  {
    number: 1,
    text: "What is the question?",
    answers: [
      {
        text: "Hello there!",
        status: "default",
      },
      {
        text: "General Kenobi.",
        correct: true,
        status: "default",
      },
      {
        text: "Now there's two of them! Wow this is a long question.",
        status: "default",
      },
    ],
  },
  {
    number: 2,
    text: "What is the NEXT question?",
    answers: [
      {
        text: "E equals M C Squared",
        status: "default",
      },
      {
        text: "Inertia is a property of matter.",
        status: "default",
      },
      {
        text: "Bill Nye The Science Guy.",
        correct: true,
        status: "default",
      },
    ],
  },
];

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    gameStarted: false,
    gameOver: false,
    questionIndex: 0,
    score: 0,
    questions: INIT_QUESTIONS,
  },

  reducers: {
    setCurrentQuestion: (state) => {
      if (state.questionIndex + 1 === state.questions.length) {
        state.gameOver = true;
        state.questions = INIT_QUESTIONS;
        state.questionIndex = 0;
      } else {
        state.questionIndex++;
      }
    },
    startGame: (state) => {
      state.gameStarted = true;
      state.gameOver = false;
      state.score = 0;
    },
    endGame: (state) => {
      state.gameOver = true;
    },
    selectAnswer: (state, action: { payload: number }) => {
      const question = state.questions[state.questionIndex];
      if (question.answers[action.payload].correct) {
        state.score += 1;
        question.answers = question.answers.map((ans) => {
          if (ans.correct) {
            return {
              ...ans,
              status: "correct disabled",
            };
          }
          return {
            ...ans,
            status: "locked disabled",
          };
        });
      } else {
        question.answers = question.answers.map((ans, i) => {
          if (ans.correct) {
            return {
              ...ans,
              status: "correct disabled",
            };
          }
          if (i === action.payload) {
            return {
              ...ans,
              status: "incorrect disabled",
            };
          }
          return {
            ...ans,
            status: "locked disabled",
          };
        });
      }
    },
  },
});

export const { startGame, setCurrentQuestion, endGame, selectAnswer } =
  questionsSlice.actions;

export default questionsSlice.reducer;
