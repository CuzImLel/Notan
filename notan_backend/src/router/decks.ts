import express from "express";
import {
  addDeck,
  getAllDecks,
  getAllDecksByUser,
  removeDeck,
  updateDeck,
} from "../controllers/decks";
export default (router: express.Router) => {
  router.get("/decks", getAllDecks);
  router.get("/decks/:userid", getAllDecksByUser);
  router.post("/decks", addDeck);
  router.delete("/decks/:id", removeDeck);
  router.patch("/decks", updateDeck);
};
