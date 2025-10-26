import React, { ButtonHTMLAttributes, useState } from "react";
import { Priority } from "../../utils/Priority";
import { State } from "../../utils/State";
import axios from "axios";
import UserData from "../../utils/UserData";
import { SemesterTable } from "../../utils/SemesterTable";
import { data } from "react-router-dom";

interface props {
  userid: string;
  closeModal: () => void;
  semesterTables: SemesterTable[];
  refreshSemesterTables: () => void;
  selectedSemesterTable: SemesterTable | undefined;
  setSelectedSemesterTable: (semesterTable: SemesterTable) => void;
}

const SemesterSubjectCreationModel: React.FC<props> = ({
  closeModal,
  semesterTables,
  userid,
  refreshSemesterTables,
  selectedSemesterTable,
  setSelectedSemesterTable,
}) => {
  const [title, setTitle] = useState<string>("");
  const [grade, setGrade] = useState<number>();
  const [ects, setEcts] = useState<number>();
  const [weighting, setWeighting] = useState<number>();
  const [error, setError] = useState<boolean>(false);

  const validated = () => {
    if (
      title &&
      title.trim() !== "" &&
      grade &&
      grade >= 1.0 &&
      grade <= 5.0 &&
      ects &&
      ects >= 1 &&
      ects <= 30 &&
      weighting &&
      weighting >= 0.1 &&
      weighting <= 10
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!selectedSemesterTable) {
      return;
    }

    if (!validated()) {
      setError(true);
      return;
    } else {
      axios
        .patch("http://localhost:8080/semester_tables", {
          data: {
            _id: selectedSemesterTable._id,
            userid: userid,
            table: selectedSemesterTable.table,
            content: [
              ...selectedSemesterTable.content,
              {
                subject: title,
                grade,
                ects,
                weighting,
              },
            ],
          },
        })
        .then((res) => {
          console.log("Successfully updated semester table:", res.data);
          refreshSemesterTables();
          closeModal();
        })
        .catch((err) => {
          console.error(
            "An error occurred while trying to update semester table:",
            err.message
          );
        });
    }
  };

  return (
    <div className="semester_subject_creation_modal">
      <div className="semester_subject_creation_modal_box">
        <div className="semester_subject_creation_modal_box_top">
          <h1>Add Subject</h1>
          <span className="material-symbols-rounded" onClick={closeModal}>
            close
          </span>
        </div>

        <div className="semester_subject_creation_modal_box_mid">
          <div className="semester_subject_creation_modal_box_mid_title_container">
            <label>Subject name:</label>
            <input
              className="semester_subject_creation_modal_box_mid_name_input"
              type="text"
              placeholder="type your subject name here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="semester_subject_creation_modal_box_mid_metadata_container">
            <div>
              <label>Grade:</label>
              <input
                type="number"
                inputMode="decimal"
                placeholder="1.0 - 5.0"
                min={1.0}
                max={5.0}
                step={0.1}
                value={grade ?? ""}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) {
                    setGrade(parseFloat(val.toFixed(1)));
                  } else {
                    setGrade(undefined);
                  }
                }}
              />
            </div>
            <div>
              <label>ECTS:</label>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={30}
                step={1}
                placeholder="1 - 30"
                pattern="[0-9]*"
                value={ects ?? ""}
                onChange={(e) => setEcts(parseInt(e.target.value))}
              />
            </div>
            <div>
              <label>Weighting:</label>
              <input
                type="number"
                min={0.1}
                max={10}
                placeholder="0.1x - 10x"
                value={weighting ?? ""}
                onChange={(e) => setWeighting(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="semester_subject_creation_modal_box_infobox_container">
          <p className="semester_subject_creation_modal_box_infobox">
            <span className="material-symbols-rounded">info</span>
            Weighting: 1x = normal (100%)
          </p>
          {error ? (
            <p className="semester_subject_creation_modal_box_warnbox">
              <span className="material-symbols-rounded">warning</span>
              Unvalid data - Please check your inputs again!
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="semester_subject_creation_modal_box_bottom">
          <button
            type="submit"
            className="semester_subject_creation_modal_create"
            onClick={handleSubmit}
          >
            Add Subject
          </button>
        </div>
      </div>
    </div>
  );
};

export default SemesterSubjectCreationModel;
