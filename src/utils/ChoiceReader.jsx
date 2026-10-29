import React from 'react';

function ChoiceReader({ currentPage, handleChoice, testYourLuck, rolled }) {
  // A stat page's roll button disappears once the dice have been rolled
  const showChoices = !(currentPage.type === 'stats' && rolled);

  return (
    <div className='navigation-button-container'>
      {showChoices && currentPage.choices &&
        currentPage.choices.map((choice, index) => (
          <button key={index} onClick={() => handleChoice(choice)}>
            {typeof choice.to === 'number' ? `${choice.label} - ${choice.to}` : choice.label}
          </button>
        ))}

      {currentPage.type === 'luck' &&
        <button onClick={() => testYourLuck()}>
          Test your Luck
        </button>
      }
    </div>
  );
}

export default ChoiceReader;
