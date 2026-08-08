import React, { useState, useRef, useEffect } from "react";
import deck_icon from "../../assets/images/deck.png";
import FlashcardDeckOptions from "./FlashcardDeckOptions";
import { Deck } from "../../utils/Deck";
import axios from "axios";

interface FlashcardDeckProps {
  deck: Deck;
  refreshDeckData: () => void;
  openDeckMenu: (deck: Deck) => void;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  deck,
  refreshDeckData,
  openDeckMenu,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(deck.title);
  const menuRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const saveTitle = async (newTitle: string) => {
    try {
      const updatedDeck = {
        _id: deck._id,
        userid: deck.userid,
        title: newTitle,
        flashcards: deck.flashcards,
      };
      const res = await axios.patch(
        `http://localhost:8080/decks/`,
        updatedDeck,
      );
      console.log("Successfully updated deck:", res.data);
      refreshDeckData();
    } catch (err: any) {
      console.error("An error occured while updating the deck:", err.message);
    }
  };

  const handleTitleEdit = () => {
    setEditable(true);
    setShowOptions(false);
  };

  useEffect(() => {
    if (editable && titleRef.current) {
      titleRef.current.focus();
      const len = titleRef.current.value.length;
      titleRef.current.setSelectionRange(len, len);
    }
  }, [editable]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const finishEditing = () => {
    setEditable(false);
    if (title !== deck.title) {
      saveTitle(title);
    }
  };

  return (
    <div className="flashcard_deck" id={deck._id}>
      <img className="flashcard_deck_icon" src={deck_icon} alt="Deck icon" />
      <div className="flashcard_deck_mid" ref={menuRef}>
        <span className="material-symbols-rounded" style={{ opacity: 0 }}>
          more_vert
        </span>

        <input
          className="flashcard_deck_title"
          type="text"
          maxLength={20}
          ref={titleRef}
          value={title}
          disabled={!editable}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={finishEditing}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") {
              finishEditing();
              e.preventDefault();
              if (e.key === "Escape") {
                setTitle(deck.title);
              }
            }
          }}
        />
        <div className="flashcard_menu_wrapper">
          <span
            className="material-symbols-rounded flashcard_menu_button"
            onClick={() => setShowOptions(!showOptions)}
          >
            more_vert
          </span>

          {showOptions && (
            <div className="flashcard_deck_options_container">
              <FlashcardDeckOptions
                _id={deck._id}
                refreshDeckData={refreshDeckData}
                handleTitleEdit={handleTitleEdit}
              />
            </div>
          )}
        </div>
      </div>

      <p className="flashcard_deck_stats">{deck.flashcards.length} cards</p>

      <button
        className="flashcard_deck_button"
        onClick={() => openDeckMenu(deck)}
      >
        Study now
      </button>
    </div>
  );
};

export default FlashcardDeck;
