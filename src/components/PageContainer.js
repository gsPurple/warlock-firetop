import React, { useState } from 'react';
import GameMenu from './GameMenu';
import { infoPages } from '../utils/infoPagesObj';
import * as constants from '../utils/constantsfile';
import '../styles/page-container.css';
import AdventurePage from './AdventurePage';
import BattlePage from './BattlePage';
import MenuPage from './MenuPage';
import rollDie from '../utils/rollDie';

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
    inventory: ['Sword', 'Shield', 'Leather Armour', 'Lantern'],
  });

  const addItemToInventory = (item) => {
    setPlayerState(prevState => ({
      ...prevState,
      inventory: [...prevState.inventory, item]
    }));
  };

  const handleChoice = (choice) => {
    console.log("Handle choice: " + choice)

    let choiceIndex;

    switch(choice) {
        case "DEV":
          console.log("DEV PAGE")
          setPlayerState((prevState) => ({
            ...prevState,
            initSta: '15',
            currentSta: '12',
            initSkill: '12',
            currentSkill: '6',
            initLuck: '10',
            currentLuck: '3',
            gold: '15',
            provisions: '5',
            inventory: ['Debug','Sword', 'Shield', 'Leather Armour','Lantern', 'Potion of Skill x2', 'Potion of Fortune', 'Potion of Strength x2'],
          }));
          
          setCurrentMode(constants.ADVENTUREMODE);

          choiceIndex = 12;
          break;
        case constants.BACKTOMENU:
          choiceIndex = null;
          break;
        case constants.STARTADV:
          setCurrentMode(constants.ADVENTUREMODE);
          choiceIndex = constants.ADVSTARTPAGE;
          break;
        case constants.ROLLSTA:
        case constants.ROLLSKI:
        case constants.ROLLLUK:
          let d1 = rollDie();
          let d2 = rollDie();
          setDieOne(d1);
          setDieTwo(d2);

          let statValue = d1 + d2 + parseInt(currentPage.pageContent.match(/\d+/g));
          
          let newState;
          if(choice === constants.ROLLSTA) {
            newState = {initSta: statValue, currentSta: statValue}
          }
          else if (choice === constants.ROLLSKI) {
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
        case constants.SKILLPOTION:
          addItemToInventory(constants.SKILLPOTION + " x2")
          choiceIndex = 10;
          break;
        case constants.STRPOTION:
          addItemToInventory(constants.STRPOTION + " x2")
          choiceIndex = 10;
          break;
        case constants.FORTPOTION:
          addItemToInventory(constants.FORTPOTION + " x2")
          choiceIndex = 10;
          break;
        default:
          if(choice > 1) {
            if(currentPage.stats) {
              setDieOne(null)
              setDieTwo(null)
            }
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

  const testYourLuck = () => {
    const dieOne = rollDie()
    const dieTwo = rollDie()
    const result = dieOne + dieTwo;
  
    if (result <= playerState.currentLuck) {
      console.log("LUCK TEST VALUE ---> Lucky");
      setCurrentPageIndex(currentPage.lucky);
    } else {
      console.log("LUCK TEST VALUE ---> Unlucky");
      setCurrentPageIndex(currentPage.unlucky);
    }
  
    if (parseInt(playerState.currentLuck) > 0) {
      setPlayerState((prevState) => ({
        ...prevState,
        currentLuck: parseInt(prevState.currentLuck) - 1,
      }));
    }
  
    console.log("Roll result: " + result + " current luck: " + playerState.currentLuck);
  };

  switch(currentMode) {
    case constants.ADVENTUREMODE:      
    return currentPage.battle ? (
      <BattlePage 
        playerState={playerState}
        setPlayerState={setPlayerState}
        currentPage={currentPage} 
        pageContentParagraphs={pageContentParagraphs}
        dieOne={dieOne} 
        dieTwo={dieTwo} 
        handleChoice={handleChoice}
        testYourLuck={testYourLuck}
      />
    ) : (
      <AdventurePage 
        playerState={playerState}
        setPlayerState={setPlayerState}
        currentPage={currentPage} 
        pageContentParagraphs={pageContentParagraphs}
        dieOne={dieOne} 
        dieTwo={dieTwo} 
        handleChoice={handleChoice}
        testYourLuck={testYourLuck}
      />
    );

    default:
      return (
        <MenuPage 
          playerState={playerState} 
          currentPage={currentPage} 
          pageContentParagraphs={pageContentParagraphs}
          handleChoice={handleChoice}
        />
      );
  }
  
}

export default PageContainer;
