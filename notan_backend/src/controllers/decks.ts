import {
  createDeck,
  deleteDeckByID,
  getAllDecksByUserID,
  getDecks,
  updateDeckTitle,
} from "../db/deck";

import express from "express";
import { Deck } from "types/Deck";

export const getAllDecks = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const decks = await getDecks();
    res.status(200).json(decks);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getAllDecksByUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { userid } = req.params;
    const decks = await getAllDecksByUserID(userid);
    res.status(200).json(decks);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const addDeck = async (req: express.Request, res: express.Response) => {
  try {
    const deckData = req.body as Deck;

    const deck = await createDeck(deckData);

    res.status(200).json({
      message: "Deck added successfully",
      deck,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const removeDeck = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;

    const deck = await deleteDeckByID(id);

    res.status(200).json({
      message: "Deck removed successfully",
      deck,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updateDeck = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const data = req.body as Deck;

    const updatedDeck = await updateDeckTitle(data._id, data);
    if (updatedDeck == null) return;
    await updatedDeck.save();
    res.status(200).json({
      message: "Deck updated successfully",
      updatedDeck,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
