import {
  addSemesterTable,
  getAllSemesterTables,
  getAllTablesByUser,
  removeSemesterTable,
  updateSemesterTable,
} from "../controllers/semester_tables";
import express, { Router } from "express";

export default (router: express.Router) => {
  router.get("/semester_tables", getAllSemesterTables);
  router.get("/semester_tables/:userid", getAllTablesByUser);
  router.post("/semester_tables", addSemesterTable);
  router.delete("/semester_tables/:id", removeSemesterTable);
  router.patch("/semester_tables", updateSemesterTable);
};
