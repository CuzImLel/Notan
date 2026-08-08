import express from "express";
import authentification from "./authentification";
import users from "./users";
import events from "./events";
import semester_tables from "./semester_tables";
import decks from "./decks";

const router = express.Router();

export default (): express.Router => {
  authentification(router);
  users(router);
  events(router);
  semester_tables(router);
  decks(router);
  return router;
};
