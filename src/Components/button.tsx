import React from "react";
import { useDispatch } from "react-redux";
import { selectAnswer, setCurrentQuestion } from "../features/questions/slice";

type ButtonProps = {
  label: string;
  onClick?: () => any;
  animated?: boolean;
  isCorrect?: boolean;
  status?: string;
  answerIndex?: number;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  animated,
  status,
  answerIndex,
}) => {
  const dispatch = useDispatch();
  const handleAnswerSelect = () => {
    if (answerIndex !== undefined) {
      dispatch(selectAnswer(answerIndex));

      setTimeout(() => {
        dispatch(setCurrentQuestion());
      }, 3000);
    }
  };

  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick();
    } else if (typeof handleAnswerSelect === "function") {
      if (!status?.includes("disabled")) {
        handleAnswerSelect();
      }
    }
  };

  return (
    <div
      className={`button ${animated ? "animated" : ""} ${status}`}
      onClick={handleClick}
    >
      <div className="button-label">{label}</div>
    </div>
  );
};

export default Button;
