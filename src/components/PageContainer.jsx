import React, { useEffect, useReducer, useState } from 'react';
import { pages } from '../utils/infoPagesObj';
import * as constants from '../utils/constantsfile';
import '../styles/page-container.css';
import '../styles/death-transition.css';
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
    case 'CHANGE_STAT': {
      // stat is 'Sta', 'Skill' or 'Luck' (never below 0, gains never pass the initial value)
      // or 'Gold' (never below 0, no upper limit)
      if (action.stat === 'Gold') {
        return { ...state, gold: Math.max(parseInt(state.gold) + action.change, 0) };
      }
      const current = parseInt(state[`current${action.stat}`]);
      const initial = parseInt(state[`init${action.stat}`]);
      const changed = action.change > 0 ? Math.min(current + action.change, Math.max(initial, current)) : Math.max(current + action.change, 0);
      return {
        ...state,
        [`current${action.stat}`]: changed,
      };
    }
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

// Death transition timings in ms, measured from the killing blow. The red flash starts
// immediately (see death-transition.css); the death screen takes over after a pause.
const DEATH_SWITCH = 1500;
const DEATH_END = 1600;

function PageContainer() {
  const [currentPageId, setCurrentPageId] = useState(null);
  const [currentMode, setCurrentMode] = useState(null);
  const [dieOne, setDieOne] = useState(null);
  const [dieTwo, setDieTwo] = useState(null);
  const [pendingTest, setPendingTest] = useState(null); // luck/skill roll waiting for the player to continue
  const [dying, setDying] = useState(false); // killing blow landed, transition to the death screen running

  useEffect(() => {
    if (!dying) return;

    const toDeathScreen = setTimeout(() => setCurrentMode(constants.DEATHMODE), DEATH_SWITCH);
    const end = setTimeout(() => setDying(false), DEATH_END);

    return () => {
      clearTimeout(toDeathScreen);
      clearTimeout(end);
    };
  }, [dying]);

  const [state, dispatch] = useReducer(playerStateReducer, initialState);

  const currentPage = pages[currentPageId] && { title: String(currentPageId), ...pages[currentPageId] };

  // Applies a page's onEnter or a choice's effects: { addItem } or { stat, change }
  const applyEffects = (effects = []) => {
    let stamina = parseInt(state.currentSta);

    effects.forEach((effect) => {
      if (effect.addItem) {
        dispatch({ type: 'ADD_ITEM', item: effect.addItem });
      }
      if (effect.stat) {
        dispatch({ type: 'CHANGE_STAT', stat: effect.stat, change: effect.change });
        if (effect.stat === 'Sta') {
          stamina = Math.max(stamina + effect.change, 0);
        }
      }
    });

    // Losing the last STAMINA outside a battle is a death too
    if (stamina <= 0 && parseInt(state.currentSta) > 0) {
      setDying(true);
    }
  };

  // Dice only matter on the page they were rolled on, so they are cleared on every move.
  // A page's onEnter effects are applied here, once per arrival
  const goTo = (pageId) => {
    setDieOne(null);
    setDieTwo(null);
    setPendingTest(null);
    setCurrentPageId(pageId);
    applyEffects(pages[pageId]?.onEnter);
  };

  const handleChoice = (choice) => {
    console.log("Handle choice: " + (choice.action || choice.to));

    applyEffects(choice.effects);

    switch (choice.action) {
      case "DEV":
        dispatch({
          type: 'SET_PLAYER_STATE',
          payload: {
            initSta: '15',
            currentSta: '2',
            initSkill: '12',
            currentSkill: '6',
            initLuck: '10',
            currentLuck: '4',
            gold: '15',
            provisions: '5',
            inventory: ['Debug','Sword', 'Shield', 'Leather Armour','Lantern', 'Potion of Skill x2', 'Potion of Fortune', 'Potion of Strength x2'],
          },
        });
        setCurrentMode(constants.ADVENTUREMODE);
        goTo(343);
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
    const { dieOne, dieTwo, result, lucky } = testLuck(state.currentLuck);

    console.log("LUCK TEST VALUE ---> " + (lucky ? "Lucky" : "Unlucky"));
    setPendingTest({
      stat: 'LUCK',
      target: parseInt(state.currentLuck),
      dieOne,
      dieTwo,
      result,
      passed: lucky,
      passText: 'You were Lucky!',
      failText: 'You were Unlucky!',
      to: lucky ? currentPage.lucky : currentPage.unlucky,
    });

    if (parseInt(state.currentLuck) > 0) {
      dispatch({
        type: 'SET_PLAYER_STATE',
        payload: { currentLuck: state.currentLuck - 1 },
      });
    }

    console.log("Roll result: " + result + " current luck: " + state.currentLuck);
  };

  const testYourSkill = () => {
    const { dieOne, dieTwo, result, success } = testSkill(state.currentSkill);

    console.log("SKILL TEST VALUE ---> " + (success ? "Success" : "Failure") + " (rolled " + result + " vs skill " + state.currentSkill + ")");
    setPendingTest({
      stat: 'SKILL',
      target: parseInt(state.currentSkill),
      dieOne,
      dieTwo,
      result,
      passed: success,
      passText: 'Success!',
      failText: 'Failure!',
      to: success ? currentPage.success : currentPage.fail,
    });
  };

  const renderScreen = () => {
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
          onPlayerDeath={() => setDying(true)}
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
          pendingTest={pendingTest}
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
  };

  return (
    <>
      {renderScreen()}
      {dying && <div className='death-flash' />}
    </>
  );
}

export default PageContainer;
