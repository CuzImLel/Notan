import React, { ButtonHTMLAttributes, useState } from "react";
import { Priority } from "../../utils/Priority";
import { State } from "../../utils/State";
import axios from "axios";
import UserData from "../../utils/UserData";
import { SemesterTable } from "../../utils/SemesterTable";
import { Deck } from "../../utils/Deck";

interface props {
  userid: string;
  closeModal: () => void;
  refreshDeckData: () => void;
  decks: Deck[];
}

const FlashcardDeckCreationModal: React.FC<props> = ({
  userid,
  closeModal,
  refreshDeckData,
  decks,
}) => {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let error: boolean = false;

    if (title.length < 3) {
      error = true;
    }

    decks.map((deck) => {
      if (title == deck.title) {
        error = true;
        return;
      }
    });

    if (!error)
      axios
        .post("http://localhost:8080/decks/", {
          userid: userid,
          title: title,
          flashcards: [],
        })
        .then((res) => {
          console.log("Successfully added new deck:", res.data);
          refreshDeckData();
          closeModal();
        })
        .catch((err) => {
          console.error(
            "An error occured while trying to add a new deck:",
            err.message,
          );
        });
  };

  return (
    <>
      <div className="deck_creation_modal">
        <div className="deck_creation_modal_box">
          <div className="deck_creation_modal_box_top">
            <h1>Add Deck</h1>
            <span className="material-symbols-rounded" onClick={closeModal}>
              close
            </span>
          </div>

          <div className="deck_creation_modal_box_mid">
            <input
              type="text"
              placeholder="type your title here..."
              content={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className="deck_creation_modal_box_bottom">
            <button
              type="submit"
              className="deck_creation_modal_create"
              onClick={(e) => handleSubmit(e)}
            >
              Create Deck*
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlashcardDeckCreationModal;
