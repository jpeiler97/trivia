import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => any;
  animated?: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, animated }) => {
  return (
    <div className={`button ${animated ? "animated" : ""}`} onClick={onClick}>
      <div className="button-label">{label}</div>
    </div>
  );
};

export default Button;
