import React from "react";

type QuestionProps = {
  question: string;
  number: string | number;
};

const Question: React.FC<QuestionProps> = ({ question, number }) => {
  return (
    <div className="question">
      <div className="question-number">Q{number}</div>
      <div className="question-text">{question}</div>
    </div>
  );
};

export default Question;
