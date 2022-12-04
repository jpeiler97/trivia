import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./features/questions/slice";
export default configureStore({
  reducer: {
    questions: questionsReducer,
  },
});

const store = configureStore({
  reducer: {
    questions: questionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
