import React, { useState } from "react";
import { Deck } from "../../utils/Deck";
import FlashcardComponent from "../flashcards_components/FlashcardComponent";
import FlashcardCreationModal from "../modals/FlashcardCreationModal";

interface props {
  deck: Deck;
  refreshDeckData: () => void;
  closeDeckMenu: () => void;
}

const ApplicationFlashcardsDeckMenu: React.FC<props> = ({
  deck,
  refreshDeckData,
  closeDeckMenu,
}) => {
  const [cardCreationModal, setCardCreationModal] = useState<boolean>(false);

  return (
    <>
      <div className="application_flashcards_deck_menu">
        <div className="application_flashcards_deck_menu_toolbar">
          <h1 className="application_flashcards_deck_menu_title">
            {deck.title}
          </h1>

          <div className="application_flashcards_deck_menu_buttons">
            <button
              onClick={() => setCardCreationModal(true)}
              className="application_flashcards_deck_menu_add"
            >
              Add Flashcard*
            </button>

            <button
              onClick={closeDeckMenu}
              className="application_flashcards_deck_menu_return"
            >
              Return
              <span className="material-symbols-rounded">keyboard_return</span>
            </button>
          </div>
        </div>

        <div className="application_flashcards_deck_menu_cardsection">
          {deck.flashcards.map((card) => (
            <FlashcardComponent
              key={card._id}
              card={card}
              deck={deck}
              refreshDeckData={refreshDeckData}
            />
          ))}
        </div>

        {cardCreationModal ? (
          <FlashcardCreationModal
            deck={deck}
            refreshDeckData={refreshDeckData}
            closeModal={() => setCardCreationModal(false)}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ApplicationFlashcardsDeckMenu;
