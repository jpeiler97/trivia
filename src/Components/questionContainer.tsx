import React from "react";
import ButtonGroup from "./buttonGroup";
import Question from "./question";

type QuestionProps = {
  question: {
    text: string;
    number: string | number;
    answers: { text: string }[];
  };
};

const QuestionContainer: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div className="question-container">
      <Question question={question.text} number={question.number} />
      <ButtonGroup options={question.answers} />
    </div>
  );
};

export default QuestionContainer;
