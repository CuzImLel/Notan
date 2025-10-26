import React, { ButtonHTMLAttributes, useState } from "react";
import { Priority } from "../../utils/Priority";
import { State } from "../../utils/State";
import axios from "axios";
import UserData from "../../utils/UserData";
import { SemesterTable } from "../../utils/SemesterTable";

interface props {
  userid: string;
  closeModal: () => void;
  semesterTable: SemesterTable | undefined;
  semesterTables: SemesterTable[];
  refreshSemesterTables: () => void;
  setSelectedSemesterTable: (table: SemesterTable | undefined) => void;
}

const SemesterDeletionModel: React.FC<props> = ({
  closeModal,
  semesterTable,
  semesterTables,
  refreshSemesterTables,
  setSelectedSemesterTable,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (semesterTable) {
      axios
        .delete(
          `http://localhost:8080/semester_tables/${semesterTable._id}`,
          {}
        )
        .then((res) => {
          console.log("Successfully deleted semester table:", res.data);
          refreshSemesterTables();

          const remaining = semesterTables.filter(
            (t) => t._id !== semesterTable._id
          );
          setSelectedSemesterTable(remaining[0] ?? undefined);
          closeModal();
        })
        .catch((err) => {
          console.error(
            "An error occured while trying to delete semester table:",
            err.message
          );
        });
    }
  };

  return (
    <>
      <div className="semester_deletion_modal">
        <div className="semester_deletion_modal_box">
          <div className="semester_deletion_modal_box_top">
            <h1>Do you really want to delete the entire Section?</h1>
            <p>Changes can't be undone!</p>
          </div>
          <div className="semester_deletion_modal_box_bottom">
            <button
              type="button"
              className="semester_deletion_modal_delete"
              onClick={(e) => handleSubmit(e)}
            >
              Delete*
            </button>
            <button
              type="button"
              className="semester_creation_modal_return"
              onClick={closeModal}
            >
              Return*
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SemesterDeletionModel;
