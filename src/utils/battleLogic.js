import rollDie from './rollDie';

// playerAttackMod: flat modifier to the player's Attack Strength for this fight (a page's playerAttackMod)
export function resolveRound(playerSkill, enemySkill, playerAttackMod = 0) {
    const playerDice = [rollDie(), rollDie()];
    const enemyDice = [rollDie(), rollDie()];
    const playerRoll = playerDice[0] + playerDice[1];
    const enemyRoll = enemyDice[0] + enemyDice[1];

    const playerAttack = playerRoll + parseInt(playerSkill) + playerAttackMod;
    const enemyAttack = enemyRoll + parseInt(enemySkill);

    let outcome = 'miss';
    if (playerAttack > enemyAttack) outcome = 'playerWins';
    else if (enemyAttack > playerAttack) outcome = 'enemyWins';

    return { playerDice, enemyDice, playerRoll, enemyRoll, playerAttack, enemyAttack, outcome };
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
