import React, { useState } from 'react';
import GameMenu from './GameMenu';
import { infoPages } from './utils/infoPagesObj';
import { STARTADV, BACKTOMENU, ADVENTUREMODE } from './utils/constantsfile';
import { ADVSTARTPAGE } from './utils/constantsfile';
import './styles/page-container.css';
import Header from './Header';
import ChoiceReader from './utils/ChoiceReader';

function PageContainer() {
  const [currentPageIndex, setCurrentPageIndex] = useState(null);
  const [currentMode, setCurrentMode] = useState(null);

  const [playerState, setPlayerState] = useState({
    initSta: 0,
    currentSta: 0,
    initSkill: 0,
    currentSkill: 0,
    initLuck: 0,
    currentLuck: 0,
    inventory: ['Sword', 'Shield', 'Leather Armour'],
  });

  const handleChoice = (choice) => {
    let choiceIndex;

    switch(choice) {
        case BACKTOMENU:
          choiceIndex = null;
          break;
        case STARTADV:
          setCurrentMode(ADVENTUREMODE);
          choiceIndex = ADVSTARTPAGE;
          break;
        default:
            choiceIndex = choice;
    }
    
    if(typeof choiceIndex !== 'string') {
      setCurrentPageIndex(choiceIndex);
    }        
  };

  if (currentPageIndex === null) {
    return <GameMenu onSelectOption={handleChoice} />;
  }

  const currentPage = infoPages[currentPageIndex];

  const pageContentParagraphs = currentPage.pageContent.split('\n');


  switch(currentMode) {
    case ADVENTUREMODE:
      
      return (
        <div>
          <Header playerData={playerState} />
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

    default:
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
  }
  
}

export default PageContainer;
