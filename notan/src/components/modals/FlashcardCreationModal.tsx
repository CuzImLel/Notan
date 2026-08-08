import React, { useState } from "react";
import { Deck } from "../../utils/Deck";
import axios from "axios";
import { Flashcard } from "../../utils/Flashcard";

interface props {
  deck: Deck;
  refreshDeckData: () => void;
  closeModal: () => void;
  cardToEdit?: Flashcard;
}

const FlashcardCreationModal: React.FC<props> = ({
  closeModal,
  deck,
  refreshDeckData,
  cardToEdit,
}) => {
  const [question, setQuestion] = useState<string>(cardToEdit?.question ?? "");
  const [answer, setAnswer] = useState<string>(cardToEdit?.answer ?? "");

  const saveFlashcard = async () => {
    if (!question.trim() || !answer.trim()) return;

    const flashcard: Flashcard = {
      _id: cardToEdit?._id ?? crypto.randomUUID(),
      question,
      answer,
      successRate: cardToEdit?.successRate ?? 5,
      lastReviewedAt: cardToEdit?.lastReviewedAt,
    };

    const flashcards = cardToEdit
      ? deck.flashcards.map((card) =>
          card._id === cardToEdit._id ? flashcard : card,
        )
      : [...deck.flashcards, flashcard];

    try {
      await axios.patch(`http://localhost:8080/decks/`, {
        _id: deck._id,
        userid: deck.userid,
        title: deck.title,
        flashcards,
      });

      closeModal();
      refreshDeckData();
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="flashcard_creation_modal">
      <div className="flashcard_creation_modal_box">
        <div className="flashcard_creation_modal_box_top">
          <h1>{cardToEdit ? "Edit Flashcard" : "Add Flashcard"}</h1>
          <span className="material-symbols-rounded" onClick={closeModal}>
            close
          </span>
        </div>

        <div className="flashcard_creation_modal_box_mid">
          <div className="flashcard_creation_modal_box_mid_question_container">
            <label>Question:</label>
            <input
              placeholder="Type in your question!"
              className="flashcard_creation_modal_box_mid_question_input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <div className="flashcard_creation_modal_box_mid_answer_container">
            <label>Answer:</label>
            <input
              placeholder="Type in your answer!"
              className="flashcard_creation_modal_box_mid_answer_input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
        </div>

        <div className="flashcard_creation_modal_box_bottom">
          <button
            className="flashcard_creation_modal_create"
            onClick={saveFlashcard}
          >
            {cardToEdit ? "Save changes" : "Add Flashcard"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardCreationModal;
