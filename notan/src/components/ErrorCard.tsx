import React from "react";

interface props {
  errorMessage: string;
}

const ErrorCard: React.FC<props> = ({ errorMessage }) => {
  return (
    <>
      <div className="errorcard_container">
        <span className="material-symbols-rounded">error</span>
        <p>{errorMessage}</p>
      </div>
    </>
  );
};

export default ErrorCard;
