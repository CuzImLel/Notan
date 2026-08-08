import mongoose from "mongoose";
import { Deck } from "types/Deck";

const DeckSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  title: { type: String, required: true },
  flashcards: {
    type: [
      {
        _id: { type: String, required: true },
        question: { type: String, required: true },
        answer: { type: String, required: true },
        successRate: { type: Number, required: true },
        lastReviewedAt: { type: Date || undefined, required: false },
      },
    ],
    required: true,
  },
});

export const DeckModel = mongoose.model("Deck", DeckSchema, "decks");

export const getDecks = () => DeckModel.find();
export const getAllDecksByUserID = (_id: string) =>
  DeckModel.find({ userid: _id });
export const deleteDeckByID = (deckid: string) =>
  DeckModel.findByIdAndDelete(deckid);
export const createDeck = (values: Deck) =>
  new DeckModel(values).save().then((event) => event.toObject());
export const updateDeckTitle = (_id: string, values: Deck) =>
  DeckModel.findByIdAndUpdate(_id, values);
