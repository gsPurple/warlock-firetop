import React, { useState } from 'react';
import './styles/game-menu.css';
import { HOWTO, HINTS, STARTADV } from './utils/constantsfile';

function GameMenu({ onSelectOption }) {
  const handleButtonSelection = (index) => {
    onSelectOption(index);
  };

  return (
    <div className='border'>
      <h1 className='title'>The Warlock of Firetop Mountain</h1>
      <div className='button-container'>
        <button onClick={() => handleButtonSelection(HOWTO)}>HOW TO PLAY</button>
        <button onClick={() => handleButtonSelection(HINTS)}>HINTS ON PLAY</button>
        <button onClick={() => handleButtonSelection(STARTADV)}>START YOUR ADVENTURE</button>
      </div>
    </div>
  );
}

export default GameMenu;
