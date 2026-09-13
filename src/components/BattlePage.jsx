import React, { useState } from 'react';
import Header from './Header';
import EnemyList from './EnemyList';
import testLuck from '../utils/testLuck';
import { resolveRound, getDamage } from '../utils/battleLogic';

const BattlePage = ({ playerState, setPlayerState, currentPage, pageContentParagraphs, handleChoice, onPlayerDeath }) => {

    console.log("A battle has started...")

    const parsedEnemies = currentPage.enemies.map((enemy) => {
        const [name, skillStr, staStr] = enemy.split("-");
        return { name, skill: parseInt(skillStr), initSta: parseInt(staStr) };
    });

    const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
    const [enemyStaminas, setEnemyStaminas] = useState(parsedEnemies.map((enemy) => enemy.initSta));
    const [roundMessage, setRoundMessage] = useState(null);
    const [pendingWound, setPendingWound] = useState(null); // 'enemy' | 'player' | null
    const [enemyExpanded, setEnemyExpanded] = useState(false);

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
        const round = resolveRound(playerState.currentSkill, enemy.skill);

        if (round.outcome === 'miss') {
            setRoundMessage(`Both attacks miss (You: ${round.playerAttack}, ${enemy.name}: ${round.enemyAttack}).`);
            return;
        }

        setRoundMessage(`(You: ${round.playerAttack}, ${enemy.name}: ${round.enemyAttack})`);
        setPendingWound(round.outcome === 'playerWins' ? 'enemy' : 'player');
    };

    const enemyDisplayData = parsedEnemies.map((parsedEnemy, index) => ({
        name: parsedEnemy.name,
        skill: parsedEnemy.skill,
        stamina: enemyStaminas[index],
    }));

    const resolveWound = (useLuck) => {
        let damage = 2;
        let luckMessage = '';

        if (useLuck) {
            const { lucky } = testLuck(playerState.currentLuck);
            decrementLuck();
            damage = getDamage(pendingWound === 'enemy', true, lucky);
            luckMessage = lucky ? ' You were lucky!' : ' You were unlucky!';
        }

        applyDamage(pendingWound, damage, luckMessage);
    };

    return (
        <div className='ui-container'>
          <Header
              playerState={playerState}
              setPlayerState={setPlayerState}
              enemies={enemyDisplayData}
              enemyExpanded={enemyExpanded}
              onEnemyToggle={() => setEnemyExpanded(!enemyExpanded)}
              className='left-col'
          />
          <div className="page-container border">
            <h1 className='title'>{currentPage.title}</h1>
            {pageContentParagraphs.map((paragraph, index) => (
              <p className='text-content' key={index}>{paragraph}</p>
            ))}

            {(currentPage.image !== null && currentPage.image !== undefined) &&
                <div id="swordImgContainer">
                    <img
                        id="image"
                        src={`/src/images/decor/${currentPage.image}`}
                        alt={currentPage.image}
                    />
                </div>

            }

            <hr />

            <div>Enemy: {enemy.name}</div>
            <div>Skill: {enemy.skill}</div>
            <div>Stamina: {enemySta}</div>

            {roundMessage && <p>{roundMessage}</p>}

            <div className='navigation-button-container'>
                {!battleOver && !pendingWound &&
                    <button onClick={handleAttack}>Attack</button>
                }

                {pendingWound &&
                    <>
                        <button onClick={() => resolveWound(true)}>Test your Luck</button>
                        <button onClick={() => resolveWound(false)}>Continue to Next Turn</button>
                    </>
                }

                {isLastEnemy && enemySta <= 0 && currentPage.next !== undefined &&
                    <button id='button-next' onClick={() => handleChoice(currentPage.next)}>Continue</button>
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
