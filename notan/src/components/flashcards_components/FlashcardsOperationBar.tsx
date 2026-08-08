import React from "react";

interface props {
  deck_amount: number;
  card_amount: number;
  openModal: () => void;
}

const FlashcardsOperationBox: React.FC<props> = ({
  deck_amount,
  card_amount,
  openModal,
}) => {
  return (
    <>
      <div className="flashcards_operation_bar">
        <div className="flashcards_operation_bar_buttons">
          <button
            className="flashcards_operation_bar_add_deck"
            onClick={openModal}
          >
            Add Deck*
          </button>
        </div>
        <div className="flashcards_operation_bar_stats">
          <p>Total Decks: {deck_amount}</p>
          <p>Total Cards: {card_amount}</p>
        </div>
      </div>
    </>
  );
};

export default FlashcardsOperationBox;
