import React, { useMemo, useState } from "react";
import { GradeCalculationPiece } from "../../utils/GradeCalculationPiece";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { SemesterTable } from "../../utils/SemesterTable";
import axios from "axios";
import { downloadJSON } from "../../utils/helpers/ApiUtils";
import GradeTableEmptyWorkspace from "./GradeTableEmptyWorkspace";

interface Props {
  semesterTables: SemesterTable[];
  refreshSemesterTables: () => void;
  openCreationModal: () => void;
  openDeletionModal: () => void;
  openSubjectCreationModal: () => void;
  setSelectedSemester: (semester: SemesterTable | undefined) => void;
  selectedSemesterTable: SemesterTable | undefined;
}

const GradeTable: React.FC<Props> = ({
  openCreationModal,
  openDeletionModal,
  semesterTables,
  setSelectedSemester,
  openSubjectCreationModal,
  selectedSemesterTable,
  refreshSemesterTables,
}) => {
  const columnHelper = createColumnHelper<GradeCalculationPiece>();

  const columns = [
    columnHelper.accessor("subject", {
      header: "Subject",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("grade", {
      header: "Grade",
      cell: (info) => (Math.round(info.getValue() * 10) / 10).toFixed(1),
    }),
    columnHelper.accessor("ects", {
      header: "ECTS",
      cell: (info) => (info.getValue() ? info.getValue() : ""),
    }),
    columnHelper.accessor("weighting", {
      header: "Weighting",
      cell: (info) => {
        const value = info.getValue();
        const subject = info.row.original.subject;
        return subject === "Gesamt" ? value : value + "x";
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Action",
      cell: (info) => {
        const subject = info.row.original.subject;
        if (subject === "Gesamt") return null;

        return (
          <div className="operations_grade_table_content_button_section">
            <button
              className="operations_grade_content_delete_button"
              onClick={async () => {
                if (!selectedSemesterTable) return;

                try {
                  const updatedContent = selectedSemesterTable.content.filter(
                    (entry) => entry.subject !== info.row.original.subject
                  );

                  await axios
                    .patch(`http://localhost:8080/semester_tables/`, {
                      data: {
                        _id: selectedSemesterTable._id,
                        userid: selectedSemesterTable.userid,
                        table: selectedSemesterTable.table,
                        content: updatedContent,
                      },
                    })
                    .then(() => {
                      console.log(
                        "Successfully deleted subject:",
                        info.row.original.subject
                      );
                      refreshSemesterTables();
                    });
                } catch (err) {
                  console.log(
                    "An error occurred while trying to update semester table: " +
                      err
                  );
                }
              }}
            >
              <span className="material-symbols-rounded">delete</span>
            </button>
          </div>
        );
      },
    }),
  ];

  const data = useMemo(() => {
    const tableData = [...(selectedSemesterTable?.content ?? [])];

    if (tableData.length > 0) {
      const weightedSum = tableData.reduce((acc, curr) => {
        const grade = Number(curr.grade || 0);
        const weight = Number(curr.weighting || 1);
        return acc + grade * weight;
      }, 0);

      const totalWeight = tableData.reduce(
        (acc, curr) => acc + Number(curr.weighting || 1),
        0
      );

      const weightedAvgGrade = totalWeight > 0 ? weightedSum / totalWeight : 0;

      tableData.push({
        subject: "Gesamt",
        grade: weightedAvgGrade,
        ects: tableData.reduce((acc, curr) => acc + Number(curr.ects || 0), 0),
        weighting: "-",
      } as GradeCalculationPiece);
    }

    return tableData;
  }, [selectedSemesterTable]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSubjectButton = () => {
    if (selectedSemesterTable != undefined) {
      openSubjectCreationModal();
    }
  };

  return (
    <>
      <div className="operations_grade_table_container">
        <div className="operations_grade_table_topbar">
          <div className="operations_grad_table_topbar_left">
            <select
              className="operations_semester_selectbar"
              value={selectedSemesterTable?.table ?? ""}
              onChange={(e) =>
                setSelectedSemester(
                  semesterTables.find((table) => table.table === e.target.value)
                )
              }
            >
              {semesterTables.map((table) => (
                <option key={table.table} value={table.table}>
                  {table.table}
                </option>
              ))}
            </select>
            <div className="operations_semester_button_section">
              <button
                className="operations_semester_creation_button"
                onClick={openCreationModal}
              >
                <span className="material-symbols-rounded">add</span>
              </button>
              <button
                className="operations_semester_remove_button"
                onClick={openDeletionModal}
              >
                <span className="material-symbols-rounded">delete</span>
              </button>
            </div>
          </div>
          <div className="operations_grade_table_button_section">
            <button
              className="operations_add_subject_button"
              onClick={handleSubjectButton}
            >
              Add Subject*
            </button>
            <button
              className="operations_download_table_button"
              onClick={() =>
                downloadJSON(
                  selectedSemesterTable,
                  selectedSemesterTable?.table + ".json"
                )
              }
            >
              Download as JSON*
            </button>
          </div>
        </div>
        {selectedSemesterTable?.table &&
        selectedSemesterTable?.content.length > 0 ? (
          <div className="operations_grade_table_box">
            <table className="operations_grade_table">
              <thead className="operations_grade_table_head">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="operations_grade_table_th">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => {
                  const isLastRow =
                    row.index === table.getRowModel().rows.length - 1;

                  return (
                    <>
                      <tr
                        key={row.id}
                        className={
                          isLastRow
                            ? "font-semibold bg-blue-50"
                            : "hover:bg-gray-50"
                        }
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="operations_grade_table_td"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <GradeTableEmptyWorkspace
            openSubjectCreationModal={openSubjectCreationModal}
            selectedSemester={selectedSemesterTable}
            openSemesterCreationModal={openCreationModal}
          ></GradeTableEmptyWorkspace>
        )}
      </div>
    </>
  );
};

export default GradeTable;
