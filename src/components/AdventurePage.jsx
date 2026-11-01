import { useState } from 'react';
import Header from './Header';
import ChoiceReader from '../utils/ChoiceReader';
import DiceRoll from './DiceRoll';
import IllustrationPage from './IllustrationPage';
import parseFormattedText from '../utils/parseFormattedText';
import goldSVG from '../images/icons/gold_icon.svg';
import cloverSVG from '../images/icons/clover_icon.svg';
import heartSVG from '../images/icons/heart_Icon.svg';

const STAT_NAMES = { Sta: 'STAMINA', Skill: 'SKILL', Luck: 'LUCK', Gold: 'GOLD' };
const STAT_ICONS = { Sta: heartSVG, Luck: cloverSVG, Gold: goldSVG };


const AdventurePage = ({ playerState, setPlayerState, dieOne, dieTwo, currentPage, handleChoice, testYourLuck, testYourSkill, pendingTest, pageContentParagraphs }) => {

    console.log(playerState)

    // Pages with an image open on the full-size illustration, like the book; Next reveals the text
    const [showText, setShowText] = useState(currentPage.image === undefined);

    if (!showText) {
      return (
        <IllustrationPage
            header={<Header playerState={playerState} setPlayerState={setPlayerState} className='left-col'/>}
            currentPage={currentPage}
            handleChoice={handleChoice}
            onNext={() => setShowText(true)}
        />
      );
    }

    return (
        <div className='ui-container'>
          <Header playerState={playerState} setPlayerState={setPlayerState} className='left-col'/>
          <div className="page-container border">
            <h1 className='title'>{currentPage.title}</h1>
            {pageContentParagraphs.map((paragraph, index) => (
              <p className='text-content' key={index}>{parseFormattedText(paragraph)}</p>
            ))}

            {(currentPage.onEnter || [])
              .filter((effect) => effect.stat)
              .map((effect, index) => {
                const gain = effect.change > 0;
                const arrow = gain ? '▲' : '▼';
                const colorClass = !gain ? 'red' : effect.stat === 'Gold' ? 'gold' : 'green';

                return (
                  <p key={index} className={`stat-change bold ${colorClass}`}>
                    {STAT_ICONS[effect.stat] &&
                      <span className='stat-change-icon'>
                        <img src={STAT_ICONS[effect.stat]} alt='' />
                        <span className={`stat-badge ${gain ? 'green' : 'red'}`} aria-hidden='true'>{arrow}</span>
                      </span>
                    }
                    {gain ? '+' : '−'}{Math.abs(effect.change)} {STAT_NAMES[effect.stat]}
                    {!STAT_ICONS[effect.stat] &&
                      <span className={`stat-arrow ${gain ? 'green' : 'red'}`} aria-hidden='true'>{arrow}</span>
                    }
                  </p>
                );
              })}

            {currentPage.items &&
              <div className='take-item-container'>
                {currentPage.items.map((item) => {
                  const taken = playerState.takenOnPage.includes(item);
                  return (
                    <button key={item} disabled={taken} onClick={() => setPlayerState({ type: 'TAKE_ITEM', item })}>
                      {taken ? `${item} taken` : `Take ${item}`}
                    </button>
                  );
                })}
              </div>
            }

            {currentPage.type === 'stats' &&
            <div>
              {<div>Die One: {dieOne !== null ? <span className="red bold"> {dieOne} </span> : 'Not rolled yet'}</div>}
              {<div>Die Two: {dieTwo !== null ? <span className="green bold"> {dieTwo} </span> : 'Not rolled yet'}</div>}
              <p></p>
              {
                <div>TOTAL:&nbsp;<span className="red bold">{dieOne !== null ? dieOne : '0'}</span> + 
                           &nbsp;<span className="green bold">{dieTwo !== null ? dieTwo : '0'}</span> +
                           &nbsp;<span className="blue bold">{currentPage.base}</span> =
                           &nbsp;{dieOne + dieTwo + currentPage.base}</div>}
                </div>
            }

            {pendingTest
              ? <DiceRoll test={pendingTest} onContinue={() => handleChoice({ to: pendingTest.to })} />
              : <ChoiceReader currentPage={currentPage} handleChoice={handleChoice} testYourLuck={testYourLuck} testYourSkill={testYourSkill} rolled={dieOne !== null}/>
            }

            <div>
                {!pendingTest && (currentPage.image !== undefined || currentPage.previous !== undefined) && <button id='button-back' onClick={() => currentPage.image !== undefined ? setShowText(false) : handleChoice({ to: currentPage.previous })}>
                  Back
                </button>}

                {currentPage.next !== undefined && (currentPage.type !== 'stats' || dieOne !== null) &&
                  <button id='button-next' onClick={() => handleChoice({ to: currentPage.next })}>Next</button>}
            </div>
          </div>
        </div>
    );
};

export default AdventurePage;