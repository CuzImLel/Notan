import {
  getTables,
  getTablesByUser,
  createSemesterTable,
  deleteSemesterTable,
  updateSemesterTableByID,
  SemesterTable,
} from "../db/semester_table";
import express from "express";
import { SemesterTableType } from "types/SemesterTable";

export const getAllSemesterTables = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const tables = await getTables();
    res.status(200).json(tables);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getAllTablesByUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userid } = req.params;
    const tables = await getTablesByUser(userid);
    res.status(200).json(tables);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const addSemesterTable = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const tableData = req.body as SemesterTableType;

    const table = await createSemesterTable(tableData);

    res.status(200).json({
      message: "SemesterTable added successfully",
      table,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const removeSemesterTable = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const table = await deleteSemesterTable(id);

    res.status(200).json({
      message: "SemesterTable removed successfully",
      table,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updateSemesterTable = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { data } = req.body;

    const updatedTable = await updateSemesterTableByID(data._id, data);
    await updatedTable.save();
    res.status(200).json({
      message: "SemesterTable updated successfully",
      updatedTable,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
