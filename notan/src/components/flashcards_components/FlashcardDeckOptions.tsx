import axios from "axios";
import React from "react";

interface props {
  _id: string;
  refreshDeckData: () => void;
  handleTitleEdit: () => void;
}

const FlashcardDeckOptions: React.FC<props> = ({
  _id,
  refreshDeckData,
  handleTitleEdit,
}) => {
  const handleDeleteSubmit = () => {
    axios
      .delete(`http://localhost:8080/decks/${_id}`, {})
      .then((res) => {
        console.log("Successfully deleted deck:", res.data);
        refreshDeckData();
      })
      .catch((err) => {
        console.error(
          "An error occured while trying to delete a deck:",
          err.message
        );
      });
  };

  return (
    <div className="flashcard_deck_options">
      <div
        className="flashcard_deck_option title"
        onClick={(e) => handleTitleEdit()}
      >
        <span className="material-symbols-rounded">edit</span>
        <p>Edit title</p>
      </div>

      <div
        className="flashcard_deck_option delete"
        onClick={(e) => handleDeleteSubmit()}
      >
        <span className="material-symbols-rounded">delete</span>
        <p>Delete</p>
      </div>
    </div>
  );
};

export default FlashcardDeckOptions;
