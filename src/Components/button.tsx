import React from "react";

type ButtonProps = {
  label: string;
};

const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <div className="button">
      {/* <span className="material-icons md-dark">trip_origin</span> */}
      <div className="button-label">{label}</div>
    </div>
  );
};

export default Button;
