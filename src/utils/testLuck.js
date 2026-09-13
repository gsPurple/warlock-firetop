import rollDie from './rollDie';

function testLuck(currentLuck) {
    const dieOne = rollDie();
    const dieTwo = rollDie();
    const result = dieOne + dieTwo;
    const lucky = result <= parseInt(currentLuck);

    return { dieOne, dieTwo, result, lucky };
}

export default testLuck;
