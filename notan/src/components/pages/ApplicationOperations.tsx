import React, { useEffect, useState } from "react";
import GPAbox from "../operation_components/GPAbox";
import GradeOverviewChart from "../operation_components/GradeOverviewChart";
import GradeTable from "../operation_components/GradeTable";
import { SemesterTable } from "../../utils/SemesterTable";
import SemesterCreationModel from "../modals/SemesterCreationModal";
import SemesterDeletionModel from "../modals/SemesterDeletionModal";
import SemesterSubjectCreationModel from "../modals/SemesterSubjectCreationModal";

interface props {
  semesterTables: SemesterTable[];
  refreshSemesterTableData: () => void;
  userid: string;
}

const ApplicationOperations: React.FC<props> = ({
  semesterTables,
  refreshSemesterTableData,
  userid,
}) => {
  const [semesterCreationModal, setSemesterCreationModal] =
    useState<boolean>(false);
  const [semesterDeletionModal, setSemesterDeletionModal] =
    useState<boolean>(false);
  const [subjectCreationModal, setSubjectCreationModal] =
    useState<boolean>(false);
  const [selectedSemester, setSelectedSemester] = useState<
    SemesterTable | undefined
  >();

  useEffect(() => {
    if (semesterTables[0]) {
      setSelectedSemester(semesterTables[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedSemester) {
      setSelectedSemester(
        semesterTables.find((table) => table._id == selectedSemester._id)
      );
    }
  }, [refreshSemesterTableData]);

  return (
    <>
      <div className="operation_box">
        <GradeTable
          openCreationModal={() => setSemesterCreationModal(true)}
          openDeletionModal={() => setSemesterDeletionModal(true)}
          semesterTables={semesterTables}
          refreshSemesterTables={refreshSemesterTableData}
          setSelectedSemester={setSelectedSemester}
          selectedSemesterTable={selectedSemester}
          openSubjectCreationModal={() => setSubjectCreationModal(true)}
        ></GradeTable>

        <div className="operation_box_displays">
          <GPAbox tableData={selectedSemester}></GPAbox>
          <GradeOverviewChart
            selectedSemester={selectedSemester}
          ></GradeOverviewChart>
        </div>
      </div>

      {semesterDeletionModal ? (
        <SemesterDeletionModel
          userid={userid}
          closeModal={() => setSemesterDeletionModal(false)}
          semesterTable={selectedSemester}
          semesterTables={semesterTables}
          refreshSemesterTables={refreshSemesterTableData}
          setSelectedSemesterTable={setSelectedSemester}
        ></SemesterDeletionModel>
      ) : (
        ""
      )}
      {semesterCreationModal ? (
        <SemesterCreationModel
          userid={userid}
          closeModal={() => setSemesterCreationModal(false)}
          semesterTables={semesterTables}
          refreshSemesterTables={refreshSemesterTableData}
          setSelectedSemester={setSelectedSemester}
          selectedSemesterTable={selectedSemester}
        ></SemesterCreationModel>
      ) : (
        ""
      )}
      {subjectCreationModal ? (
        <SemesterSubjectCreationModel
          userid={userid}
          closeModal={() => setSubjectCreationModal(false)}
          semesterTables={semesterTables}
          refreshSemesterTables={refreshSemesterTableData}
          selectedSemesterTable={selectedSemester}
          setSelectedSemesterTable={setSelectedSemester}
        ></SemesterSubjectCreationModel>
      ) : (
        ""
      )}
    </>
  );
};

export default ApplicationOperations;
