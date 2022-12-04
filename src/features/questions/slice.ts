import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    gameStarted: true,
    questionIndex: 0,
    questions: [
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
    ],
  },

  reducers: {
    setCurrentQuestion: (state) => {
      if (state.questionIndex + 1 === state.questions.length) {
        state.gameStarted = false;
      } else {
        state.questionIndex++;
      }
    },
    startGame: (state) => {
      state.gameStarted = true;
    },
    endGame: (state) => {
      state.gameStarted = false;
    },
    selectAnswer: (state, action: { payload: number }) => {
      const question = state.questions[state.questionIndex];
      console.log(question);
      if (question.answers[action.payload].correct) {
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
