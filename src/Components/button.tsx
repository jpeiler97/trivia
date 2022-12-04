import React, { useState } from "react";

type ButtonProps = {
  label: string;
  onClick?: () => any;
  animated?: boolean;
  isCorrect?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  animated,
  isCorrect,
}) => {
  const [answerState, setAnswerState] = useState("");
  const handleAnswerSelect = () => {
    //todo- handle external question select
    if (isCorrect) {
      setAnswerState("correct");
    }
  };
  return (
    <div
      className={`button ${animated ? "animated" : ""} ${answerState}`}
      onClick={onClick || handleAnswerSelect}
    >
      <div className="button-label">{label}</div>
    </div>
  );
};

export default Button;
