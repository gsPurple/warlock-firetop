import React from 'react';
import '../styles/game-menu.css';
import { HOWTO, HINTS, STARTADV } from '../utils/constantsfile';

function GameMenu({ onSelectOption }) {
  const handleButtonSelection = (choice) => {
    onSelectOption(choice);
  };

  return (
    <div className='border'>
      <h1 className='title'>The Warlock of Firetop Mountain</h1>
      <div className='button-container'>
        <button onClick={() => handleButtonSelection({ to: HOWTO })}>HOW TO PLAY</button>
        <button onClick={() => handleButtonSelection({ to: HINTS })}>HINTS ON PLAY</button>
        <button onClick={() => handleButtonSelection({ action: STARTADV })}>START YOUR ADVENTURE</button>
        <button onClick={() => handleButtonSelection({ action: "DEV" })}>DEV</button>
      </div>
    </div>
  );
}

export default GameMenu;
