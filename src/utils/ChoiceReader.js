import React from 'react';

function ChoiceReader({ currentPage, handleChoice }) {
  return (
    <div>
      
      {Array.isArray(currentPage.choices) &&
        currentPage.choices.map((choice, index) => (
          <button key={index} onClick={() => handleChoice(choice)}>
            {choice}
          </button>
        ))}
    </div>
  );
}

export default ChoiceReader;
