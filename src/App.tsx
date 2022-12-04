import { useRef, useState } from "react";
import "./App.css";
import Button from "./Components/button";
import QuestionContainer from "./Components/questionContainer";
import { useAppSelector, useAppDispatch } from "./hooks";
import { startGame, endGame } from "./features/questions/slice";

function App() {
  const [timer, setTimer] = useState("00:00");
  const dispatch = useAppDispatch();
  const { questions, questionIndex, score, gameStarted, gameOver } =
    useAppSelector((state) => state.questions);

  const timerRef = useRef<NodeJS.Timer | null>(null);

  const parseTimeRemaining = (e: Date) => {
    const total =
      Date.parse(e as unknown as string) -
      Date.parse(new Date() as unknown as string);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);

    return {
      total,
      seconds,
      minutes,
    };
  };

  const startTimer = (e: Date) => {
    let { total, minutes, seconds } = parseTimeRemaining(e);

    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
      if (total === 0) {
        dispatch(endGame());
      }
    }
  };

  const clearTimer = (e: Date) => {
    dispatch(startGame());
    setTimer("01:30");
    if (timerRef.current) clearInterval(timerRef.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    timerRef.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 90);
    return deadline;
  };

  return (
    <div className="App">
      <div className="trivia-container">
        <Button label="Start" onClick={() => clearTimer(getDeadTime())} />
        <div className="timer">{timer}</div>
        <div className="timer">
          Score: {score}/{questions.length}
        </div>
        {gameStarted ? (
          gameOver ? (
            <div>Game over! Press start to play again!</div>
          ) : (
            <QuestionContainer question={questions[questionIndex]} />
          )
        ) : (
          <div>Press the start button to begin!</div>
        )}
      </div>
    </div>
  );
}

export default App;
