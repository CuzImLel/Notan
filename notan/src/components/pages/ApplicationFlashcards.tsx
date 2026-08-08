import React, { useState } from "react";
import FlashcardsOperationBox from "../flashcards_components/FlashcardsOperationBar";
import FlashcardDeck from "../flashcards_components/FlashcardDeck";
import { Deck } from "../../utils/Deck";
import FlashcardsEmptyWorkspace from "../flashcards_components/FlashcardsEmptyWorkspace";
import FlashcardDeckCreationModal from "../modals/FlashcardDeckCreationModal";
import ApplicationFlashcardsDeckMenu from "./ApplicationFlashcardsDeckMenu";

interface props {
  userid: string;
  decks: Deck[];
  refreshDeckData: () => void;
}

const ApplicationFlashcards: React.FC<props> = ({
  decks,
  userid,
  refreshDeckData,
}) => {
  const [deckCreationModal, setDeckCreationModal] = useState<boolean>(false);
  const [deckMenuId, setDeckMenuId] = useState<string | undefined>(undefined);

  const selectedDeck = decks.find((d) => d._id === deckMenuId);

  return (
    <>
      {!selectedDeck ? (
        <div className="application_flashcards">
          <FlashcardsOperationBox
            deck_amount={decks.length}
            card_amount={decks.reduce(
              (acc, deck) => acc + deck.flashcards.length,
              0,
            )}
            openModal={() => setDeckCreationModal(true)}
          />

          <div className="application_flashcards_card_section">
            {decks.map((deck) => (
              <FlashcardDeck
                key={deck._id}
                deck={deck}
                refreshDeckData={refreshDeckData}
                openDeckMenu={() => setDeckMenuId(deck._id)}
              />
            ))}

            {decks.length > 0 ? (
              ""
            ) : (
              <div className="application_flashcards_empty_container">
                <FlashcardsEmptyWorkspace />
              </div>
            )}
          </div>

          {deckCreationModal ? (
            <FlashcardDeckCreationModal
              userid={userid}
              closeModal={() => setDeckCreationModal(false)}
              refreshDeckData={refreshDeckData}
              decks={decks}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <ApplicationFlashcardsDeckMenu
          deck={selectedDeck}
          refreshDeckData={refreshDeckData}
          closeDeckMenu={() => setDeckMenuId(undefined)}
        />
      )}
    </>
  );
};

export default ApplicationFlashcards;
