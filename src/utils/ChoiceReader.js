import React from 'react';

function ChoiceReader({ currentPage, handleChoice }) {
  return (
    <div>
      {Array.isArray(currentPage.choices) &&
        currentPage.choices.map((choice, index) => {

          let choiceNum = 'choice' + index;

          return (
            <button key={index} onClick={() => handleChoice(currentPage[choiceNum])}>
              {choice}
            </button>
          );
        })}
    </div>
  );
}

export default ChoiceReader;
