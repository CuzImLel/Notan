import React from "react";
import logo from "../../assets/images/subjectlogo.png";
import { SemesterTable } from "../../utils/SemesterTable";

interface props {
  openSubjectCreationModal: () => void;
  openSemesterCreationModal: () => void;
  selectedSemester: SemesterTable | undefined;
}

const GradeTableEmptyWorkspace: React.FC<props> = ({
  openSubjectCreationModal,
  selectedSemester,
  openSemesterCreationModal,
}) => {
  return (
    <>
      <div className="gradetable_empty_workspace">
        <img src={logo} height={200}></img>
        <h1>{selectedSemester ? "No subjects found" : "No semester found"}</h1>
        <p>
          {selectedSemester
            ? "Add your first subject to start tracking your stats"
            : "Add your first semester to start tracking your stats"}
        </p>
        {selectedSemester ? (
          <button onClick={openSubjectCreationModal}>+ Add Subject</button>
        ) : (
          <button onClick={openSemesterCreationModal}>+ Add Semester</button>
        )}
      </div>
    </>
  );
};

export default GradeTableEmptyWorkspace;
