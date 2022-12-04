import { useEffect, useRef, useState } from "react";
import "./App.css";
import Button from "./Components/button";
import QuestionContainer from "./Components/questionContainer";
import { useAppSelector, useAppDispatch } from "./hooks";
import { startGame, endGame, setQuestions } from "./features/questions/slice";
import { getQuestions } from "./api";

type ResultObject = {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
};

function App() {
  const [timer, setTimer] = useState("00:00");
  const dispatch = useAppDispatch();
  const { questions, questionIndex, score, gameStarted, gameOver } =
    useAppSelector((state) => state.questions);

  const timerRef = useRef<NodeJS.Timer | null>(null);

  //should move these types somewhere
  const generateAnswers = (result: {
    incorrect_answers: string[];
    correct_answer: string;
  }) => {
    let answers: {
      text: string;
      status: string;
      correct?: boolean;
    }[] = result.incorrect_answers.map((ans) => {
      return {
        text: decodeURIComponent(ans),
        status: "default",
      };
    });
    answers.splice(Math.floor(Math.random() * answers.length), 0, {
      text: decodeURIComponent(result.correct_answer),
      status: "default",
      correct: true,
    });

    return answers;
  };

  useEffect(() => {
    if (gameOver) {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [gameOver]);

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

  const handleGameStart = () => {
    getQuestions(10).then(({ results }: { results: ResultObject[] }) => {
      const newQuestions = results.map((result, i) => {
        return {
          number: i + 1,
          text: decodeURIComponent(result.question),
          answers: generateAnswers(result),
        };
      });
      dispatch(setQuestions(newQuestions));
      clearTimer(getDeadTime());
    });
  };

  return (
    <div className="App">
      <div className="trivia-container">
        {gameStarted && !gameOver ? (
          <Button label="Give Up" onClick={() => dispatch(endGame())} />
        ) : (
          <Button label="Start" onClick={handleGameStart} />
        )}
        <div className="timer">{timer}</div>
        <div className="score">
          Score: {score}/{questions?.length || 10}
        </div>
        {gameStarted ? (
          gameOver ? (
            <div className="game-status">
              Game over :( Press start to play again!
            </div>
          ) : (
            <QuestionContainer question={questions[questionIndex]} />
          )
        ) : (
          <div className="game-status">Press the start button to begin!</div>
        )}
      </div>
    </div>
  );
}

export default App;
