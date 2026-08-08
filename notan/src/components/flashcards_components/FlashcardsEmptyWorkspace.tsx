import React from "react";
import logo from "../../assets/images/subjectlogo.png";

interface props {}

const FlashcardsEmptyWorkspace: React.FC<props> = ({}) => {
  return (
    <>
      <div className="flashcards_empty_workspace">
        <img src={logo} height={200}></img>
        <h1>No decks found</h1>
        <p>Create your first deck to start</p>
        <button onClick={() => {}}>+ Add Deck</button>
      </div>
    </>
  );
};

export default FlashcardsEmptyWorkspace;
