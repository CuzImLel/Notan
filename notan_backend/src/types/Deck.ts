import { Flashcard } from "./Flashcard";

export type Deck = {
  _id: string;
  userid: string;
  title: string;
  flashcards: Flashcard[];
};
