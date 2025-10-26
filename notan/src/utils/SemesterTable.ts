import { GradeCalculationPiece } from "./GradeCalculationPiece";

export type SemesterTable = {
  _id?: string;
  userid: string;
  table: string;
  content: GradeCalculationPiece[];
};
