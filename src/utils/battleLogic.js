import rollDie from './rollDie';

export function resolveRound(playerSkill, enemySkill) {
    const playerRoll = rollDie() + rollDie();
    const enemyRoll = rollDie() + rollDie();

    const playerAttack = playerRoll + parseInt(playerSkill);
    const enemyAttack = enemyRoll + parseInt(enemySkill);

    let outcome = 'miss';
    if (playerAttack > enemyAttack) outcome = 'playerWins';
    else if (enemyAttack > playerAttack) outcome = 'enemyWins';

    return { playerRoll, enemyRoll, playerAttack, enemyAttack, outcome };
}

// woundedEnemy: true if the player scored the wound, false if the creature did
// luckUsed / lucky: result of a battle-time testLuck() call, or luckUsed=false to skip it
export function getDamage(woundedEnemy, luckUsed, lucky) {
    if (!luckUsed) return 2;

    if (woundedEnemy) {
        return lucky ? 4 : 1;
    }
    return lucky ? 1 : 3;
}
