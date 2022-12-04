import { useEffect, useRef, useState } from "react";
import "./App.css";
import Button from "./Components/button";
import QuestionContainer from "./Components/questionContainer";

const questions = [
  {
    number: 1,
    text: "What is the question?",
    answers: [
      {
        text: "Hello there!",
      },
      {
        text: "General Kenobi.",
        correct: true,
      },
      {
        text: "Now there's two of them! Wow this is a long question.",
      },
    ],
  },
];

function App() {
  const [timer, setTimer] = useState("00:00");

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
    }
  };

  const clearTimer = (e: Date) => {
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
        {questions.map((question) => {
          return <QuestionContainer question={question} />;
        })}
      </div>
    </div>
  );
}

export default App;
