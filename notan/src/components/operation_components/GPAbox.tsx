import React from "react";

interface props {
  gpa: number;
}

const GPAbox: React.FC<props> = ({ gpa }) => {
  return (
    <>
      <div className="gpa_box">
        <p>Grade point average</p>
        <h1>{gpa}</h1>
      </div>
    </>
  );
};

export default GPAbox;
