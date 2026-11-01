import { useState } from 'react';
import Header from './Header';
import EnemyList from './EnemyList';
import BattleRound from './BattleRound';
import { QuickRoll } from './DiceRoll';
import Modal from '../utils/Modal';
import testLuck from '../utils/testLuck';
import { resolveRound, getDamage } from '../utils/battleLogic';
import parseFormattedText from '../utils/parseFormattedText';
import IllustrationPage from './IllustrationPage';
import swordImg from '../images/decor/wofmsword.png';

const BattlePage = ({ playerState, setPlayerState, currentPage, pageContentParagraphs, handleChoice, onPlayerDeath }) => {

    console.log("A battle has started...")

    const parsedEnemies = currentPage.enemies.map((enemy) => {
        const [name, skillStr, staStr] = enemy.split("-");
        return { name, skill: parseInt(skillStr), initSta: parseInt(staStr) };
    });

    const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
    const [enemyStaminas, setEnemyStaminas] = useState(parsedEnemies.map((enemy) => enemy.initSta));
    const [roundMessage, setRoundMessage] = useState(null);
    const [round, setRound] = useState(null); // the last attack round, shown until the next Attack
    const [roundNumber, setRoundNumber] = useState(0);
    const [luckRoll, setLuckRoll] = useState(null); // Luck test in progress while its dice are on screen
    const [pendingWound, setPendingWound] = useState(null); // 'enemy' | 'player' | null
    const [enemyExpanded, setEnemyExpanded] = useState(false);
    const [escapeModalOpen, setEscapeModalOpen] = useState(false);
    // Pages with an image open on the full-size illustration, like adventure pages; Next reveals the battle
    const [showBattle, setShowBattle] = useState(currentPage.image === undefined);
    // null | { stage: 'choice' } | { stage: 'rolling', dice, lucky } | { stage: 'done', message, dead }
    const [escape, setEscape] = useState(null);

    const enemy = parsedEnemies[currentEnemyIndex];
    const enemySta = enemyStaminas[currentEnemyIndex];

    const playerSta = parseInt(playerState.currentSta);
    const isLastEnemy = currentEnemyIndex === parsedEnemies.length - 1;
    const battleOver = (isLastEnemy && enemySta <= 0) || playerSta <= 0;

    const decrementLuck = () => {
        if (parseInt(playerState.currentLuck) > 0) {
            setPlayerState({
                type: 'SET_PLAYER_STATE',
                payload: { currentLuck: playerState.currentLuck - 1 },
            });
        }
    };

    const applyDamage = (target, amount, luckMessage = '') => {
        if (target === 'enemy') {
            const newSta = Math.max(enemySta - amount, 0);
            const updatedStaminas = [...enemyStaminas];
            updatedStaminas[currentEnemyIndex] = newSta;
            setEnemyStaminas(updatedStaminas);

            if (newSta === 0 && !isLastEnemy) {
                const nextEnemy = parsedEnemies[currentEnemyIndex + 1];
                setRoundMessage(`You have defeated the ${enemy.name}! The ${nextEnemy.name} steps up to fight!`);
                setCurrentEnemyIndex(currentEnemyIndex + 1);
            } else {
                setRoundMessage(
                    newSta === 0
                        ? `You have defeated the ${enemy.name}!`
                        : `You wound the ${enemy.name} for ${amount} damage.${luckMessage}`
                );
            }
        } else {
            const newSta = Math.max(playerSta - amount, 0);
            setPlayerState({
                type: 'SET_PLAYER_STATE',
                payload: { currentSta: newSta },
            });
            setRoundMessage(`The ${enemy.name} wounds you for ${amount} damage.${luckMessage}`);
            if (newSta === 0) {
                onPlayerDeath();
            }
        }
        setPendingWound(null);
    };

    const handleAttack = () => {
        const result = resolveRound(playerState.currentSkill, enemy.skill);

        // Names and skills are copied in because the enemy can change before the panel is dismissed
        setRound({ ...result, enemyName: enemy.name, enemySkill: enemy.skill, playerSkill: parseInt(playerState.currentSkill) });
        setRoundNumber(roundNumber + 1);
        setRoundMessage(null);
        setPendingWound(result.outcome === 'miss' ? null : result.outcome === 'playerWins' ? 'enemy' : 'player');
    };

    const enemyDisplayData = parsedEnemies.map((parsedEnemy, index) => ({
        name: parsedEnemy.name,
        skill: parsedEnemy.skill,
        stamina: enemyStaminas[index],
    }));

    // What a Luck test would do to the pending wound, shown before the player chooses
    const luckHint = pendingWound === 'enemy'
        ? `Lucky: ${getDamage(true, true, true)} damage to the ${enemy.name}. Unlucky: only ${getDamage(true, true, false)}.`
        : `Lucky: you take only ${getDamage(false, true, true)} damage. Unlucky: you take ${getDamage(false, true, false)}.`;

    // The Luck test is rolled now but only applied once its dice have been shown
    const startLuckTest = () => {
        const { dieOne, dieTwo, lucky } = testLuck(playerState.currentLuck);
        setLuckRoll({ dice: [dieOne, dieTwo], lucky });
    };

    const finishLuckTest = () => {
        decrementLuck();
        applyDamage(
            pendingWound,
            getDamage(pendingWound === 'enemy', true, luckRoll.lucky),
            luckRoll.lucky ? ' You were lucky!' : ' You were unlucky!'
        );
        setLuckRoll(null);
    };

    const resolveWound = () => applyDamage(pendingWound, 2);

    // Escaping: the creature gets one wound on you as you flee, and you may Test your Luck on it
    const canEscape = currentPage.escape !== undefined && !battleOver && !pendingWound && !escape;

    const startEscape = () => {
        setEscapeModalOpen(false);
        setEscape({ stage: 'choice' });
    };

    const applyEscapeWound = (amount, luckMessage = '') => {
        const newSta = Math.max(playerSta - amount, 0);
        setPlayerState({
            type: 'SET_PLAYER_STATE',
            payload: { currentSta: newSta },
        });
        setEscape({
            stage: 'done',
            dead: newSta === 0,
            message: `You flee, but the ${enemy.name} wounds you for ${amount} damage as you go.${luckMessage}`,
        });
        if (newSta === 0) {
            onPlayerDeath();
        }
    };

    const startEscapeLuckTest = () => {
        const { dieOne, dieTwo, lucky } = testLuck(playerState.currentLuck);
        setEscape({ stage: 'rolling', dice: [dieOne, dieTwo], lucky });
    };

    const finishEscapeLuckTest = () => {
        decrementLuck();
        applyEscapeWound(
            getDamage(false, true, escape.lucky),
            escape.lucky ? ' You were lucky!' : ' You were unlucky!'
        );
    };

    const escapeHint = `Lucky: you take only ${getDamage(false, true, true)} damage. Unlucky: you take ${getDamage(false, true, false)}.`;

    const escapeButton = canEscape && <button onClick={() => setEscapeModalOpen(true)}>Escape</button>;

    if (!showBattle) {
        return (
            <IllustrationPage
                header={<Header playerState={playerState} setPlayerState={setPlayerState} className='left-col'/>}
                currentPage={currentPage}
                handleChoice={handleChoice}
                onNext={() => setShowBattle(true)}
            />
        );
    }

    return (
        <div className='ui-container'>
          <Modal
              showModal={escapeModalOpen}
              message={`Escape from the battle? The ${enemy.name} gets one wound on you as you flee: you lose 2 STAMINA, and may Test your Luck to try to reduce it.`}
              onClose={() => setEscapeModalOpen(false)}
              onConfirm={startEscape}
          />
          <Header
              playerState={playerState}
              setPlayerState={setPlayerState}
              enemies={enemyDisplayData}
              inBattle
              enemyExpanded={enemyExpanded}
              onEnemyToggle={() => setEnemyExpanded(!enemyExpanded)}
              className='left-col'
          />
          <div className="page-container border">
            <h1 className='title'>{currentPage.title}</h1>
            {pageContentParagraphs.map((paragraph, index) => (
              <p className='text-content' key={index}>{parseFormattedText(paragraph)}</p>
            ))}

            <div id="swordImgContainer">
                <img id="image" src={swordImg} alt="" />
            </div>

            <hr />

            <div>Enemy: {enemy.name}</div>
            <div>Skill: {enemy.skill}</div>
            <div>Stamina: {enemySta}</div>

            {round && !escape &&
                <BattleRound key={roundNumber} round={round} roundMessage={roundMessage}>
                    {pendingWound && luckRoll &&
                        <QuickRoll dice={luckRoll.dice} colorClass='green' onDone={finishLuckTest} />
                    }

                    {pendingWound && !luckRoll &&
                        <>
                            <p className='battle-luck-hint'>{luckHint}</p>
                            <button onClick={startLuckTest}>Test your Luck</button>
                            <button onClick={resolveWound}>
                                {pendingWound === 'enemy' ? 'Deal 2 damage' : 'Take 2 damage'}
                            </button>
                        </>
                    }

                    {!pendingWound && !battleOver &&
                        <>
                            <button onClick={handleAttack}>Attack</button>
                            {escapeButton}
                        </>
                    }
                </BattleRound>
            }

            {escape &&
                <div className='battle-round'>
                    <div className='battle-outcome' aria-live='polite'>
                        <div className='dice-verdict red'>You flee from the battle!</div>

                        {escape.stage === 'choice' &&
                            <>
                                <p className='battle-luck-hint'>{escapeHint}</p>
                                <div className='navigation-button-container battle-actions'>
                                    <button onClick={startEscapeLuckTest}>Test your Luck</button>
                                    <button onClick={() => applyEscapeWound(2)}>Take 2 damage</button>
                                </div>
                            </>
                        }

                        {escape.stage === 'rolling' &&
                            <QuickRoll dice={escape.dice} colorClass='green' onDone={finishEscapeLuckTest} />
                        }

                        {escape.stage === 'done' &&
                            <>
                                <p className='battle-result-text'>{escape.message}</p>
                                {!escape.dead &&
                                    <div className='navigation-button-container battle-actions'>
                                        <button onClick={() => handleChoice({ to: currentPage.escape })}>Continue</button>
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
            }

            <div className='navigation-button-container'>
                {!round && !battleOver && !escape &&
                    <>
                        <button onClick={handleAttack}>Attack</button>
                        {escapeButton}
                    </>
                }

                {isLastEnemy && enemySta <= 0 && currentPage.next !== undefined &&
                    <button id='button-next' onClick={() => handleChoice({ to: currentPage.next })}>Continue</button>
                }
            </div>
          </div>

          <div className='right-col'>
              <EnemyList enemies={enemyDisplayData} enemyVisible={enemyExpanded} />
          </div>
        </div>
    );
};

export default BattlePage;
