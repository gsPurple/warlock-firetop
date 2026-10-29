import rollDie from './rollDie';

function testSkill(currentSkill) {
    const dieOne = rollDie();
    const dieTwo = rollDie();
    const result = dieOne + dieTwo;
    const success = result <= parseInt(currentSkill);

    return { dieOne, dieTwo, result, success };
}

export default testSkill;
