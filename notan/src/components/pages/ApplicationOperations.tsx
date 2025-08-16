import React from "react";
import GPAbox from "../operation_components/GPAbox";
import GradeOverviewChart from "../operation_components/GradeOverviewChart";
import GradeTable from "../operation_components/GradeTable";

const ApplicationOperations: React.FC = () => {
  return (
    <>
      <div className="operation_box">
        <GradeTable></GradeTable>
        <div className="operation_box_displays">
          <GPAbox gpa={1.7}></GPAbox>
          <GradeOverviewChart></GradeOverviewChart>
        </div>
      </div>
    </>
  );
};

export default ApplicationOperations;
