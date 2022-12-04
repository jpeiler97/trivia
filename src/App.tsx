import "./App.css";
import Button from "./Components/button";
import ButtonGroup from "./Components/buttonGroup";
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
      },
      {
        text: "Now there's two of them! Wow this is a long question.",
      },
    ],
  },
];

function App() {
  return (
    <div className="App">
      {questions.map((question) => {
        return <QuestionContainer question={question} />;
      })}
    </div>
  );
}

export default App;
