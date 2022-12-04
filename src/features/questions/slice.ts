import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  gameStarted: boolean;
  gameOver: boolean;
  questionIndex: number;
  score: number;
  questions: {
    answers: {
      text: string;
      correct?: boolean;
    }[];
  }[];
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    gameStarted: false,
    gameOver: false,
    questionIndex: 0,
    score: 0,
    questions: [],
  },

  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setCurrentQuestion: (state) => {
      if (state.questionIndex + 1 === state.questions.length) {
        state.gameOver = true;
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
      state.questionIndex = 0;
    },
    selectAnswer: (state, action: { payload: number }) => {
      const question: { answers: any[] } = state.questions[state.questionIndex];
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

export const {
  startGame,
  setCurrentQuestion,
  endGame,
  selectAnswer,
  setQuestions,
} = questionsSlice.actions;

export default questionsSlice.reducer;
