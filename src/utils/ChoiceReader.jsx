import React from 'react';

function ChoiceReader({ currentPage, handleChoice, testYourLuck}) {
  return (
    <div className='navigation-button-container'>
      {Array.isArray(currentPage.choices) &&
        currentPage.choices.map((choice, index) => {

          let choiceNum = 'choice' + index;

          return (
            <button key={index} onClick={() => handleChoice(currentPage[choiceNum])}>
              {choice}
            </button>
          );
        })}
      
      {(currentPage.canTestLuck) && 
        <button onClick={() => testYourLuck()}>
          Test your Luck
        </button>
      }
    </div>
  );
}

export default ChoiceReader;
