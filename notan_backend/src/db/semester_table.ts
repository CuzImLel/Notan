import mongoose from "mongoose";
import { GradeCalculationPiece } from "types/GradeCalculationPiece";

const SemesterTableSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  content: {
    type: [
      {
        subject: { type: String, required: true },
        grade: { type: Number, required: true },
        ects: { type: Number, required: true },
        weighting: { type: String, required: true },
      },
    ],
    required: true,
  },
});

export const SemesterTable = mongoose.model(
  "SemesterTable",
  SemesterTableSchema,
  "semester_tables"
);

export const getTables = () => SemesterTable.find();
export const getTablesByUser = (userid: string) =>
  SemesterTable.find({ userid });
export const createSemesterTable = (values: Record<string, any>) =>
  new SemesterTable(values).save().then((table) => table.toObject());
export const deleteSemesterTable = (id: string) =>
  SemesterTable.findOneAndDelete({ _id: id });
export const updateSemesterTableByID = (
  id: string,
  values: Record<string, any>
) => SemesterTable.findByIdAndUpdate({ id, values });
