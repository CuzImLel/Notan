import React from "react";
import { GradeCalculationPiece } from "../../utils/GradeCalculationPiece";
import { SemesterTable } from "../../utils/SemesterTable";

interface props {
  tableData: SemesterTable | undefined;
}

const GPAbox: React.FC<props> = ({ tableData }) => {
  const calculateGPA = () => {
    if (tableData && tableData.content.length > 0) {
      const weightedSum = tableData.content.reduce((acc, curr) => {
        const grade = Number(curr.grade || 0);
        const weight = Number(curr.weighting || 1);
        return acc + grade * weight;
      }, 0);

      const totalWeight = tableData.content.reduce(
        (acc, curr) => acc + Number(curr.weighting || 1),
        0
      );

      return (
        Math.round((totalWeight > 0 ? weightedSum / totalWeight : 0) * 10) / 10
      ).toFixed(1);
    } else {
      return "-";
    }
  };

  return (
    <>
      <div className="gpa_box">
        <p>Grade point average</p>
        <h1>{calculateGPA()}</h1>
      </div>
    </>
  );
};

export default GPAbox;
