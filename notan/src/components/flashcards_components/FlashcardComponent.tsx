import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Flashcard } from "../../utils/Flashcard";
import axios from "axios";
import { Deck } from "../../utils/Deck";
import FlashcardCreationModal from "../modals/FlashcardCreationModal";

interface props {
  card: Flashcard;
  deck: Deck;
  refreshDeckData: () => void;
}

const FlashcardComponent: React.FC<props> = ({
  card,
  deck,
  refreshDeckData,
}) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(() => {
    try {
      const preferences = JSON.parse(
        localStorage.getItem("notan-preferences") ?? "{}",
      );
      return preferences.showAnswerAutomatically === true;
    } catch {
      return false;
    }
  });
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const deleteFlashcard = async () => {
    try {
      const updatedDeck = {
        _id: deck._id,
        userid: deck.userid,
        title: deck.title,
        flashcards: deck.flashcards.filter(
          (flashcard) => flashcard._id !== card._id,
        ),
      };

      const res = await axios
        .patch(`http://localhost:8080/decks/`, updatedDeck)
        .then(() => {
          console.log("Successfully deleted flashcard!");
          refreshDeckData();
        });
    } catch (err: any) {
      console.error("An error occured while updating the deck:", err.message);
    }
  };

  return (
    <>
      <div className="flashcard_container">
        <div className="flashcard_operation_buttons">
          <button
            className="flashcard_operation_edit"
            aria-label="Edit flashcard"
            onClick={() => setEditModalOpen(true)}
          >
            <span className="material-symbols-rounded">edit</span>
          </button>
          <button
            className="flashcard_operation_delete"
            onClick={() => deleteFlashcard()}
            aria-label="Delete flashcard"
          >
            <span className="material-symbols-rounded">delete</span>
          </button>
        </div>
        <div className="flashcard_content">
          <span className="flashcard_label">Question</span>
          <p className="flashcard_question">{card.question}</p>
        </div>
        <button
          className="flashcard_answer_toggle"
          onClick={() => setShowAnswer(!showAnswer)}
          aria-expanded={showAnswer}
        >
          <span>{showAnswer ? "Hide answer" : "Show answer"}</span>
          <span className="material-symbols-rounded">
            {showAnswer ? "expand_less" : "expand_more"}
          </span>
        </button>
        {showAnswer && (
          <div className="flashcard_answer">
            <span className="flashcard_label">Answer</span>
            <p>{card.answer}</p>
          </div>
        )}
      </div>
      {editModalOpen &&
        createPortal(
          <FlashcardCreationModal
            deck={deck}
            cardToEdit={card}
            refreshDeckData={refreshDeckData}
            closeModal={() => setEditModalOpen(false)}
          />,
          document.body,
        )}
    </>
  );
};

export default FlashcardComponent;
