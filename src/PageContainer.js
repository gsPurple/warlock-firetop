import React, { useState } from 'react';
import GameMenu from './GameMenu';
import { infoPages } from './utils/infoPagesObj';
import { STARTADV, BACKTOMENU, ADVENTUREMODE, ADVSTARTPAGE } from './utils/constantsfile';
import { ROLLSTA, ROLLSKI, ROLLLUK } from './utils/constantsfile';
import './styles/page-container.css';
import Header from './Header';
import ChoiceReader from './utils/ChoiceReader';
import rollDie from './utils/rollDie';

function PageContainer() {
  const [currentPageIndex, setCurrentPageIndex] = useState(null);
  const [currentMode, setCurrentMode] = useState(null);
  const [dieOne, setDieOne] = useState(null);
  const [dieTwo, setDieTwo] = useState(null);

  const [playerState, setPlayerState] = useState({
    initSta: '00',
    currentSta: '00',
    initSkill: '00',
    currentSkill: '00',
    initLuck: '00',
    currentLuck: '00',
    gold: '0',
    provisions: '00',
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
        case ROLLSTA:
        case ROLLSKI:
        case ROLLLUK:
          console.log(choice)

          let d1 = rollDie();
          let d2 = rollDie();
          setDieOne(d1);
          setDieTwo(d2);

          let statValue = d1 + d2 + parseInt(currentPage.pageContent.match(/\d+/g));
          
          let newState;
          if(choice === ROLLSTA) {
            newState = {initSta: statValue, currentSta: statValue}
          }
          else if (choice === ROLLSKI) {
            newState = {initSkill: statValue, currentSkill: statValue}
          }
          else {
            newState = {initLuck: statValue, currentLuck: statValue}
          }

          setPlayerState(prevState => ({
            ...prevState,
            ...newState
          }));
          
          choiceIndex = "";
          currentPage.next = currentPage.current + 1;
          currentPage.choices = 0;
          break;
        default:
          if(currentPage.stats) {
            setDieOne(null)
            setDieTwo(null)
          }
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
        <div className='ui-container'>
          <Header playerData={playerState} className='left-col'/>
          <div className="page-container border">
            <h1 className='title'>{currentPage.title}</h1>
            {pageContentParagraphs.map((paragraph, index) => (
              <p className='text-content' key={index}>{paragraph}</p>
            ))}

            {currentPage.stats &&
            <div>
              {<div>Die One: {dieOne !== null ? <span className="red bold"> {dieOne} </span> : 'Not rolled yet'}</div>}
              {<div>Die Two: {dieTwo !== null ? <span className="green bold"> {dieTwo} </span> : 'Not rolled yet'}</div>}
              <p></p>
              {
                <div>TOTAL:&nbsp;<span className="red bold">{dieOne !== null ? dieOne : '0'}</span> + 
                           &nbsp;<span className="green bold">{dieTwo !== null ? dieTwo : '0'}</span> +
                           &nbsp;<span className="blue bold">{currentPage.pageContent.match(/\d+/g)}</span> = 
                           &nbsp;{dieOne + dieTwo + parseInt(currentPage.pageContent.match(/\d+/g))}</div>}
                </div>
              }
          
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
