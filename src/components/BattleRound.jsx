import React from 'react';
import { DieFace, useTumble } from './DiceRoll';
import '../styles/dice-roll.css';

const BattleSide = ({ name, dice, skill, total, rolling, colorClass, winner }) => (
  <div className={`battle-side${!rolling && winner ? ' battle-winner' : ''}`}>
    <div className='battle-side-name'>{name}</div>
    <div className='dice-tray'>
      <DieFace value={dice[0]} rolling={rolling} colorClass={colorClass} />
      <DieFace value={dice[1]} rolling={rolling} colorClass={colorClass} />
    </div>
    <div className='battle-calc'>
      {rolling ? '\u00a0' : <>{dice[0]} + {dice[1]} + <span className='bold'>{skill}</span> SKILL</>}
    </div>
    <div className='battle-total'>{rolling ? '\u00a0' : `= ${total}`}</div>
  </div>
);

// One attack round: both sides' dice tumble, land, then the totals, who won and the
// children (the player's next actions) appear
const BattleRound = ({ round, roundMessage, children }) => {
  const { rolling, faces } = useTumble(4);

  const playerDice = rolling ? faces.slice(0, 2) : round.playerDice;
  const enemyDice = rolling ? faces.slice(2) : round.enemyDice;

  const verdicts = {
    playerWins: { className: 'green', text: `You wound the ${round.enemyName}!` },
    enemyWins: { className: 'red', text: `The ${round.enemyName} wounds you!` },
    miss: { className: '', text: 'Both attacks miss!' },
  };
  const verdict = verdicts[round.outcome];

  return (
    <div className='battle-round'>
      <div className='battle-sides'>
        <BattleSide
          name='You'
          dice={playerDice}
          skill={round.playerSkill}
          total={round.playerAttack}
          rolling={rolling}
          colorClass='blue'
          winner={round.outcome === 'playerWins'}
        />
        <div className='battle-vs'>VS</div>
        <BattleSide
          name={round.enemyName}
          dice={enemyDice}
          skill={round.enemySkill}
          total={round.enemyAttack}
          rolling={rolling}
          colorClass='red'
          winner={round.outcome === 'enemyWins'}
        />
      </div>

      {!rolling &&
        <div className='battle-outcome' aria-live='polite'>
          <div className={`dice-verdict ${verdict.className}`}>{verdict.text}</div>
          {roundMessage && <p className='battle-result-text'>{roundMessage}</p>}
          <div className='navigation-button-container battle-actions'>{children}</div>
        </div>
      }
    </div>
  );
};

export default BattleRound;
