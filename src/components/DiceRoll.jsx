import { useEffect, useState } from 'react';
import rollDie from '../utils/rollDie';
import '../styles/dice-roll.css';

const ROLL_DURATION = 1100;
const FACE_INTERVAL = 90;
const LANDED_HOLD = 700; // how long QuickRoll keeps the landed dice on screen

// Pip positions on a 3x3 grid, numbered left to right, top to bottom
const PIPS = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
};

export const DieFace = ({ value, rolling, colorClass }) => (
  <div className={`die ${colorClass} ${rolling ? 'die-rolling' : 'die-landed'}`}>
    {PIPS[value].map((pip) => (
      <span key={pip} className='pip' style={{ gridArea: `p${pip}` }} />
    ))}
  </div>
);

// Tumbles `count` dice through random faces for a moment, then reports rolling = false
export const useTumble = (count) => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [rolling, setRolling] = useState(!reduceMotion);
  const [faces, setFaces] = useState(() => Array.from({ length: count }, rollDie));

  useEffect(() => {
    if (!rolling) return;

    const interval = setInterval(() => setFaces(Array.from({ length: count }, rollDie)), FACE_INTERVAL);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setRolling(false);
    }, ROLL_DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return { rolling, faces };
};

// Two dice that tumble, land, stay for a moment so the numbers can be read, then call onDone.
// Unlike DiceRoll it has no result text or button; the caller decides what to show afterwards
export const QuickRoll = ({ dice, colorClass, onDone }) => {
  const { rolling, faces } = useTumble(2);

  useEffect(() => {
    if (rolling) return;

    const timeout = setTimeout(onDone, LANDED_HOLD);
    return () => clearTimeout(timeout);
  }, [rolling]);

  return (
    <div className='dice-tray'>
      <DieFace value={rolling ? faces[0] : dice[0]} rolling={rolling} colorClass={colorClass} />
      <DieFace value={rolling ? faces[1] : dice[1]} rolling={rolling} colorClass={colorClass} />
    </div>
  );
};

// Shows a stat test (luck/skill): the dice tumble through random faces, land on the
// real roll, then the result and a Continue button appear
const DiceRoll = ({ test, onContinue }) => {
  const { rolling, faces } = useTumble(2);

  const shownOne = rolling ? faces[0] : test.dieOne;
  const shownTwo = rolling ? faces[1] : test.dieTwo;

  return (
    <div className='dice-roll'>
      <div className='dice-tray'>
        <DieFace value={shownOne} rolling={rolling} colorClass='red' />
        <DieFace value={shownTwo} rolling={rolling} colorClass='green' />
      </div>

      {!rolling &&
        <div className='dice-result'>
          <div>
            <span className='red bold'>{test.dieOne}</span> + <span className='green bold'>{test.dieTwo}</span> = <span className='bold'>{test.result}</span>
            &nbsp;vs {test.stat} <span className='blue bold'>{test.target}</span>
          </div>
          <div className={`dice-verdict ${test.passed ? 'green' : 'red'}`}>
            {test.passed ? test.passText : test.failText}
          </div>
          <button onClick={onContinue}>Continue</button>
        </div>
      }
    </div>
  );
};

export default DiceRoll;
