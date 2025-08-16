import express from "express";
import { deleteUserByID, getUserByID, getUsers } from "../db/users";
import { identity } from "lodash";
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserByID(id);
    res.json(deleteUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    if (!username) {
      res.sendStatus(400);
    }

    const user = await getUserByID(id);
    user.username = username;
    await user.save();
    res.sendStatus(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
