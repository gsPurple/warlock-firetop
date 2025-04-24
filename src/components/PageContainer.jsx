import React, { useReducer, useState } from 'react';
import { infoPages } from '../utils/infoPagesObj';
import * as constants from '../utils/constantsfile';
import '../styles/page-container.css';
import GameMenu from './GameMenu';
import AdventurePage from './AdventurePage';
import BattlePage from './BattlePage';
import MenuPage from './MenuPage';
import rollDie from '../utils/rollDie';

const playerStateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PLAYER_STATE':
      return {
        ...state,
        ...action.payload,
      };
      case 'ROLL_STAT':
        return {
          ...state,
          [`init${action.stat}`]: action.value,
          [`current${action.stat}`]: action.value, // Update currentStat as well
        };
    case 'ADD_ITEM':
      return {
        ...state,
        inventory: [...state.inventory, action.item],
      };
    default:
      return state;
  }
};


const initialState = {
  initSta: '00',
  currentSta: '00',
  initSkill: '00',
  currentSkill: '00',
  initLuck: '00',
  currentLuck: '00',
  gold: '0',
  provisions: '00',
  inventory: ['Sword', 'Shield', 'Leather Armour', 'Lantern'],
};

function PageContainer() {
  const [currentPageIndex, setCurrentPageIndex] = useState(null);
  const [currentMode, setCurrentMode] = useState(null);
  const [dieOne, setDieOne] = useState(null);
  const [dieTwo, setDieTwo] = useState(null);

  const [state, dispatch] = useReducer(playerStateReducer, initialState);

  const currentPage = infoPages[currentPageIndex];

  const handleChoice = (choice) => {
    console.log("Handle choice: " + choice);
    let choiceIndex;

    switch (choice) {
      case "DEV":
        dispatch({
          type: 'SET_PLAYER_STATE',
          payload: {
            initSta: '15',
            currentSta: '12',
            initSkill: '12',
            currentSkill: '6',
            initLuck: '10',
            currentLuck: '3',
            gold: '15',
            provisions: '5',
            inventory: ['Debug','Sword', 'Shield', 'Leather Armour','Lantern', 'Potion of Skill x2', 'Potion of Fortune', 'Potion of Strength x2'],
          },
        });
        setCurrentMode(constants.ADVENTUREMODE);
        choiceIndex = 17;
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

        dispatch({
          type: 'ROLL_STAT',
          stat: choice === constants.ROLLSTA ? 'Sta' : (choice === constants.ROLLSKI ? 'Skill' : 'Luck'),
          value: statValue,
        });

        choiceIndex = "";
        currentPage.next = currentPage.current + 1;
        currentPage.choices = 0;
        break;
      case constants.SKILLPOTION:
        dispatch({
          type: 'ADD_ITEM',
          item: constants.SKILLPOTION + " x2",
        });
        choiceIndex = 10;
        break;
      case constants.STRPOTION:
        dispatch({
          type: 'ADD_ITEM',
          item: constants.STRPOTION + " x2",
        });
        choiceIndex = 10;
        break;
      case constants.FORTPOTION:
        dispatch({
          type: 'ADD_ITEM',
          item: constants.FORTPOTION + " x2",
        });
        choiceIndex = 10;
        break;
      default:
        if (choice > 1) {
          if (currentPage.stats) {
            setDieOne(null);
            setDieTwo(null);
          }
        }

        choiceIndex = choice;
    }

    if (typeof choiceIndex !== 'string') {
      setCurrentPageIndex(choiceIndex);
    }
  };

  if (currentPageIndex === null) {
    return <GameMenu onSelectOption={handleChoice} />;
  }

  const pageContentParagraphs = currentPage.pageContent.split('\n');

  const testYourLuck = () => {
    const dieOne = rollDie();
    const dieTwo = rollDie();
    const result = dieOne + dieTwo;

    if (result <= state.currentLuck) {
      console.log("LUCK TEST VALUE ---> Lucky");
      setCurrentPageIndex(currentPage.lucky);
    } else {
      console.log("LUCK TEST VALUE ---> Unlucky");
      setCurrentPageIndex(currentPage.unlucky);
    }

    if (parseInt(state.currentLuck) > 0) {
      dispatch({
        type: 'SET_PLAYER_STATS',
        payload: { currentLuck: state.currentLuck - 1 },
      });
    }

    console.log("Roll result: " + result + " current luck: " + state.currentLuck);
  };

  switch (currentMode) {
    case constants.ADVENTUREMODE:
      return currentPage.battle ? (
        <BattlePage 
          playerState={state}
          setPlayerState={dispatch}
          currentPage={currentPage}
          pageContentParagraphs={pageContentParagraphs}
          dieOne={dieOne}
          dieTwo={dieTwo}
          handleChoice={handleChoice}
          testYourLuck={testYourLuck}
        />
      ) : (
        <AdventurePage 
          playerState={state}
          setPlayerState={dispatch}
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
          playerState={state}
          currentPage={currentPage}
          pageContentParagraphs={pageContentParagraphs}
          handleChoice={handleChoice}
        />
      );
  }
}

export default PageContainer;
