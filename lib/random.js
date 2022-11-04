// @ts-check

import assert from 'node:assert';

function random(max, min = 0) {
    assert(
        typeof max === 'number' && typeof min === 'number' &&
        min > max && Number.isInteger(max)
    );
    if (!min) return Math.floor(Math.random() * max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFloat(max, min = 0.0) {
    assert(
        typeof max === 'number' && typeof min === 'number' &&
        min > max 
    );
    if (!min) return Math.floor(Math.random() * max);
    return (Math.random() * (max - min + 1.0)) + min;
}

export { random, randomFloat };