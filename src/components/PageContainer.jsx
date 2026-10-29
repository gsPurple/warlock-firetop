import React, { useReducer, useState } from 'react';
import { pages } from '../utils/infoPagesObj';
import * as constants from '../utils/constantsfile';
import '../styles/page-container.css';
import GameMenu from './GameMenu';
import AdventurePage from './AdventurePage';
import BattlePage from './BattlePage';
import MenuPage from './MenuPage';
import DeathPage from './DeathPage';
import rollDie from '../utils/rollDie';
import testLuck from '../utils/testLuck';
import testSkill from '../utils/testSkill';

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
  const [currentPageId, setCurrentPageId] = useState(null);
  const [currentMode, setCurrentMode] = useState(null);
  const [dieOne, setDieOne] = useState(null);
  const [dieTwo, setDieTwo] = useState(null);

  const [state, dispatch] = useReducer(playerStateReducer, initialState);

  const currentPage = pages[currentPageId] && { title: String(currentPageId), ...pages[currentPageId] };

  // Dice only matter on the stat roll pages, so they are cleared on every move
  const goTo = (pageId) => {
    setDieOne(null);
    setDieTwo(null);
    setCurrentPageId(pageId);
  };

  const handleChoice = (choice) => {
    console.log("Handle choice: " + (choice.action || choice.to));

    (choice.effects || []).forEach((effect) => {
      if (effect.addItem) {
        dispatch({ type: 'ADD_ITEM', item: effect.addItem });
      }
    });

    switch (choice.action) {
      case "DEV":
        dispatch({
          type: 'SET_PLAYER_STATE',
          payload: {
            initSta: '15',
            currentSta: '12',
            initSkill: '12',
            currentSkill: '6',
            initLuck: '10',
            currentLuck: '10',
            gold: '15',
            provisions: '5',
            inventory: ['Debug','Sword', 'Shield', 'Leather Armour','Lantern', 'Potion of Skill x2', 'Potion of Fortune', 'Potion of Strength x2'],
          },
        });
        setCurrentMode(constants.ADVENTUREMODE);
        goTo(278);
        break;
      case constants.BACKTOMENU:
        setCurrentMode(null);
        goTo(null);
        break;
      case constants.STARTADV:
        setCurrentMode(constants.ADVENTUREMODE);
        goTo(constants.ADVSTARTPAGE);
        break;
      case constants.ROLLSTAT: {
        const d1 = rollDie();
        const d2 = rollDie();
        setDieOne(d1);
        setDieTwo(d2);

        dispatch({
          type: 'ROLL_STAT',
          stat: currentPage.stat,
          value: d1 + d2 + currentPage.base,
        });
        break;
      }
      default:
        if (choice.to !== undefined) {
          goTo(choice.to);
        }
    }
  };

  if (currentPageId === null) {
    return <GameMenu onSelectOption={handleChoice} />;
  }

  if (!currentPage) {
    return (
      <div className="page-container border">
        <h1 className="title">{currentPageId}</h1>
        <p className="text-content">This page hasn't been written yet.</p>
        <button onClick={() => handleChoice({ action: constants.BACKTOMENU })}>Back to Menu</button>
      </div>
    );
  }

  const pageContentParagraphs = currentPage.text.split('\n');

  const testYourLuck = () => {
    const { result, lucky } = testLuck(state.currentLuck);

    if (lucky) {
      console.log("LUCK TEST VALUE ---> Lucky");
      goTo(currentPage.lucky);
    } else {
      console.log("LUCK TEST VALUE ---> Unlucky");
      goTo(currentPage.unlucky);
    }

    if (parseInt(state.currentLuck) > 0) {
      dispatch({
        type: 'SET_PLAYER_STATE',
        payload: { currentLuck: state.currentLuck - 1 },
      });
    }

    console.log("Roll result: " + result + " current luck: " + state.currentLuck);
  };

  const testYourSkill = () => {
    const { result, success } = testSkill(state.currentSkill);

    console.log("SKILL TEST VALUE ---> " + (success ? "Success" : "Failure") + " (rolled " + result + " vs skill " + state.currentSkill + ")");
    goTo(success ? currentPage.success : currentPage.fail);
  };

  switch (currentMode) {
    case constants.DEATHMODE:
      return <DeathPage handleChoice={handleChoice} />;
    case constants.ADVENTUREMODE:
      return currentPage.type === 'battle' ? (
        <BattlePage
          playerState={state}
          setPlayerState={dispatch}
          currentPage={currentPage}
          pageContentParagraphs={pageContentParagraphs}
          dieOne={dieOne}
          dieTwo={dieTwo}
          handleChoice={handleChoice}
          testYourLuck={testYourLuck}
          onPlayerDeath={() => setCurrentMode(constants.DEATHMODE)}
        />
      ) : (
        <AdventurePage
          key={currentPageId}
          playerState={state}
          setPlayerState={dispatch}
          currentPage={currentPage}
          pageContentParagraphs={pageContentParagraphs}
          dieOne={dieOne}
          dieTwo={dieTwo}
          handleChoice={handleChoice}
          testYourLuck={testYourLuck}
          testYourSkill={testYourSkill}
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
