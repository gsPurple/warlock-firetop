import React from 'react';
import ChoiceReader from './utils/ChoiceReader';


const MenuPage = ({ playerState, currentPage, handleChoice, pageContentParagraphs }) => {

    console.log(playerState)
    
    return (
        <div>
          <div className="page-container border">
            <h1 className='title'>{currentPage.title}</h1>
            {pageContentParagraphs.map((paragraph, index) => (
              <p className='text-content' key={index}>{paragraph}</p>
            ))}
          
            <div className='navigation-button-container'>
              <ChoiceReader currentPage={currentPage} handleChoice={handleChoice} />
            </div>

            <div>
                {currentPage.previous !== undefined && <button id='button-back' onClick={() => handleChoice(currentPage.previous)}>
                  Back
                </button>}
    
                {currentPage.next !== undefined && <button id='button-next' onClick={() => handleChoice(currentPage.next)}>Next</button>}
            </div>
          </div>
        </div>
    );
};

export default MenuPage;