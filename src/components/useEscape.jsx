import { useState } from 'react';
import { QuickRoll } from './DiceRoll';
import Modal from '../utils/Modal';
import testLuck from '../utils/testLuck';
import { getEscapeDamage, applyShield, shieldNote } from '../utils/battleLogic';
import rollDie from '../utils/rollDie';
import { GOLDENCRESCENT } from '../utils/constantsfile';

// Escaping, shared by battle pages and plain pages that offer it (a page's `escape: <page id>`):
// the creature gets one wound on you as you flee, and you may Test your Luck on it.
// Returns:
//   fleeing    - true from the moment the player confirms, so the page can hide its own controls
//   escapeButton - the Escape button (false when it can't be offered right now)
//   escapeUI   - the confirmation modal and, once fleeing, the panel that resolves the wound
// foeName: who wounds you as you flee. canEscape: false while the page is busy (e.g. mid-wound in a battle).
const useEscape = ({ foeName, to, canEscape = true, playerState, setPlayerState, handleChoice, onPlayerDeath }) => {
    const [modalOpen, setModalOpen] = useState(false);
    // null | { stage: 'choice' } | { stage: 'rolling', dice, lucky } | { stage: 'done', message, dead }
    const [escape, setEscape] = useState(null);

    // lucky: result of a Luck test on the wound, or null if none was taken
    const flee = (lucky = null) => {
        let damage = getEscapeDamage(lucky);
        let shieldMessage = '';
        if (playerState.inventory.includes(GOLDENCRESCENT)) {
            const shieldRoll = rollDie();
            damage = applyShield(damage, shieldRoll);
            shieldMessage = shieldNote(shieldRoll);
        }
        const newSta = Math.max(parseInt(playerState.currentSta) - damage, 0);
        const luckMessage = lucky === null ? '' : lucky ? ' You were lucky!' : ' You were unlucky!';

        setPlayerState({ type: 'FLEE', lucky, damage });
        setEscape({
            stage: 'done',
            dead: newSta === 0,
            message: `${damage > 0 ? `You flee, but the ${foeName} wounds you for ${damage} damage as you go.` : `You flee, and the ${foeName}'s blow is absorbed by your shield.`}${luckMessage}${shieldMessage}`,
        });
        if (newSta === 0) {
            onPlayerDeath();
        }
    };

    const startEscape = () => {
        setModalOpen(false);
        setEscape({ stage: 'choice' });
    };

    // The Luck test is rolled now but only applied once its dice have been shown
    const startLuckTest = () => {
        const { dieOne, dieTwo, lucky } = testLuck(playerState.currentLuck);
        setEscape({ stage: 'rolling', dice: [dieOne, dieTwo], lucky });
    };

    const hint = `Lucky: you take only ${getEscapeDamage(true)} damage. Unlucky: you take ${getEscapeDamage(false)}.`;

    const escapeButton = canEscape && !escape && <button onClick={() => setModalOpen(true)}>Escape</button>;

    const escapeUI = (
        <>
            <Modal
                showModal={modalOpen}
                message={`Escape? The ${foeName} gets one wound on you as you flee: you lose 2 STAMINA, and may Test your Luck to try to reduce it.`}
                onClose={() => setModalOpen(false)}
                onConfirm={startEscape}
            />

            {escape &&
                <div className='battle-round'>
                    <div className='battle-outcome' aria-live='polite'>
                        <div className='dice-verdict red'>You flee!</div>

                        {escape.stage === 'choice' &&
                            <>
                                <p className='battle-luck-hint'>{hint}</p>
                                <div className='navigation-button-container battle-actions'>
                                    <button onClick={startLuckTest}>Test your Luck</button>
                                    <button onClick={() => flee()}>Take 2 damage</button>
                                </div>
                            </>
                        }

                        {escape.stage === 'rolling' &&
                            <QuickRoll dice={escape.dice} colorClass='green' onDone={() => flee(escape.lucky)} />
                        }

                        {escape.stage === 'done' &&
                            <>
                                <p className='battle-result-text'>{escape.message}</p>
                                {!escape.dead &&
                                    <div className='navigation-button-container battle-actions'>
                                        <button onClick={() => handleChoice({ to })}>Continue</button>
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
            }
        </>
    );

    return { fleeing: escape !== null, escapeButton, escapeUI };
};

export default useEscape;
