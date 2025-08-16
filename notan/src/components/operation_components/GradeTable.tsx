import React from "react";
import { GradeCalculationPiece } from "../../utils/GradeCalculationPiece";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

//---Example dataset below!

const data: GradeCalculationPiece[] = [
  { subject: "Mathematik", grade: 1.7, ects: 2.3, weighting: "50 %" },
  { subject: "Biologie", grade: 2.3, ects: 4.0, weighting: "50 %" },
  { subject: "Informatik", grade: 2.0, ects: 5.0, weighting: "100 %" },
  { subject: "Chemie", grade: 1.3, ects: 1.0, weighting: "100 %" },
  { subject: "Physik", grade: 1.3, ects: 5.0, weighting: "50%" },
];

const averageGrade = (
  data.reduce((acc, cur) => acc + cur.grade, 0) / data.length
).toFixed(2);

const extendedData = [
  ...data,
  {
    subject: "Gesamt",
    grade: parseFloat(averageGrade),
    ects: 0.0,
    weighting: "-",
  },
];

const columnHelper = createColumnHelper<GradeCalculationPiece>();

const columns = [
  columnHelper.accessor("subject", {
    header: "Fach",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("grade", {
    header: "Note",
    cell: (info) => info.getValue().toFixed(2),
  }),
  columnHelper.accessor("ects", {
    header: "ECTS",
    cell: (info) => (info.getValue() ? info.getValue().toFixed(2) : ""),
  }),
  columnHelper.accessor("weighting", {
    header: "Gewichtung",
    cell: (info) => info.getValue(),
  }),
];

const GradeTable: React.FC = ({}) => {
  const table = useReactTable({
    data: extendedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="operations_grade_table_container">
        <div className="operations_grade_table_topbar">
          <div className="operations_grad_table_topbar_left">
            <select className="operations_semester_selectbar">
              <option selected={true}>1. Semester</option>
              <option selected={false}>2. Semester</option>
              <option selected={false}>3. Semester</option>
            </select>
            <div className="operations_semester_button_section">
              <button className="operations_semester_creation_button">
                <span className="material-symbols-rounded">add</span>
              </button>
              <button className="operations_semester_remove_button">
                <span className="material-symbols-rounded">delete</span>
              </button>
            </div>
          </div>
          <div className="operations_grade_table_button_section">
            <button className="operations_add_subject_button">
              Add Subject*
            </button>
            <button className="operations_download_table_button">
              Download as CSV*
            </button>
          </div>
        </div>
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
                  <tr
                    key={row.id}
                    className={
                      isLastRow
                        ? "font-semibold bg-blue-50"
                        : "hover:bg-gray-50"
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="operations_grade_table_td">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default GradeTable;
