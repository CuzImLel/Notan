import React, { ButtonHTMLAttributes, useState } from "react";
import { Priority } from "../../utils/Priority";
import { State } from "../../utils/State";
import axios from "axios";
import UserData from "../../utils/UserData";
import { SemesterTable } from "../../utils/SemesterTable";

interface props {
  userid: string;
  closeModal: () => void;
  semesterTables: SemesterTable[];
  refreshSemesterTables: () => void;
  setSelectedSemester: (table: SemesterTable) => void;
  selectedSemesterTable: SemesterTable | undefined;
}

const SemesterCreationModel: React.FC<props> = ({
  closeModal,
  semesterTables,
  userid,
  refreshSemesterTables,
  setSelectedSemester,
  selectedSemesterTable,
}) => {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let error: boolean = false;

    if (title.length < 3) {
      error = true;
    }

    semesterTables.map((table) => {
      if (title == table.table) {
        error = true;
        return;
      }
    });

    if (!error)
      axios
        .post("http://localhost:8080/semester_tables/", {
          userid: userid,
          table: title,
        })
        .then((res) => {
          console.log("Successfully added new semester table:", res.data);
          refreshSemesterTables();
          setSelectedSemester(res.data.table);
          closeModal();
        })
        .catch((err) => {
          console.error(
            "An error occured while trying to add a new semester table:",
            err.message
          );
        });
  };

  return (
    <>
      <div className="semester_creation_modal">
        <div className="semester_creation_modal_box">
          <div className="semester_creation_modal_box_top">
            <h1>Add Semester</h1>
            <span className="material-symbols-rounded" onClick={closeModal}>
              close
            </span>
          </div>

          <div className="semester_creation_modal_box_mid">
            <input
              type="text"
              placeholder="type your title here..."
              content={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className="semester_creation_modal_box_bottom">
            <button
              type="submit"
              className="semester_creation_modal_create"
              onClick={(e) => handleSubmit(e)}
            >
              Create Semester*
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SemesterCreationModel;
