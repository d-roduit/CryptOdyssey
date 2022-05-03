import Map from './map.js';

/* eslint-disable max-len */
const character = {
    x: 1000, // horizontal position
    y: 300, // vertical position
    width: 64,
    height: 64,
    frameX: 0, // horizontal coordinate of frame we cut out from our spritesheet
    frameY: 10, // vertical coordinate
    speed: 6, // how many pixels we move per frame of animation
    moving: false, // use this to switch between standing and moving animation
    isInMarketZone: false,
    isInMineZone: false,
};

// ----------Spritesheets------------------

// Male character
const tilesheetMale = new Image();
tilesheetMale.src = 'assets/game/images/character_boy_main.png';

// ----------Draw Sprite--------------------
const drawSprite = (context, img, sX, sY, sW, sH, dX, dY, dW, dH) => {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};

// -------------Keys events----------------
const keys = [];
// callback function. Function that will run whatever code we put in it. e = event object.
window.addEventListener('keydown', (e) => {
    keys[e.key] = true; // when a key is pressed, we add it to our array
    if (keys.w || keys.a || keys.s || keys.d) {
        character.moving = true;
    }
});

window.addEventListener('keyup', (e) => {
    delete keys[e.key]; // we remove the key from our array
    character.moving = false;
});

// Check if array contains array
const arrayAlreadyHasArray = (arr, subarr) => {
    for (let i = 0; i < arr.length; i += 1) {
        let checker = false;
        for (let j = 0; j < arr[i].length; j += 1) {
            if (arr[i][j] === subarr[j]) {
                checker = true;
            } else {
                checker = false;
                break;
            }
        }
        if (checker) {
            return true;
        }
    }
    return false;
};

// -------------Move player-----------------
const movePlayer = (canvas) => {
    if (keys.w && character.y > 0 && !arrayAlreadyHasArray(Map.collisionBlocksUp, [character.x, character.y])) {
        character.y -= character.speed;
        character.frameY = 8;
        character.moving = true;
    }
    if (keys.a && character.x > 448 && !arrayAlreadyHasArray(Map.collisionBlocksLeft, [character.x, character.y])) {
        character.x -= character.speed;
        character.frameY = 9;
        character.moving = true;
    }
    if (keys.s && character.y < canvas.height - 612 - character.height && !arrayAlreadyHasArray(Map.collisionBlocksDown, [character.x, character.y])) {
        character.y += character.speed;
        character.frameY = 10;
        character.moving = true;
    }
    if (keys.d && character.x < canvas.width - character.width && !arrayAlreadyHasArray(Map.collisionBlocksRight, [character.x, character.y])) {
        character.x += character.speed;
        character.frameY = 11;
        character.moving = true;
    }
};

const handlePlayerFrame = () => {
    if (character.frameX < 8 && character.moving) {
        character.frameX += 1;
    } else {
        character.frameX = 0;
    }
};

// ----------------Open interface--------------

// define market zone
const defineMarketZone = (posTopLeftX, posTopLeftY, posBottomRightX, posBottomRightY) => {
    const charPosX = character.x + character.width / 2;
    const charPosY = character.y + character.height;
    if (charPosX > posTopLeftX && charPosX < posBottomRightX && charPosY > posTopLeftY && charPosY < posBottomRightY) {
        character.isInMarketZone = true;
    } else {
        character.isInMarketZone = false;
    }
};

// define market zone
const defineMineZone = (posTopLeftX, posTopLeftY, posBottomRightX, posBottomRightY) => {
    const charPosX = character.x + character.width / 2;
    const charPosY = character.y + character.height;
    if (charPosX > posTopLeftX && charPosX < posBottomRightX && charPosY > posTopLeftY && charPosY < posBottomRightY) {
        character.isInMineZone = true;
    } else {
        character.isInMineZone = false;
    }
};

export default {
    character,
    tilesheetMale,
    drawSprite,
    movePlayer,
    handlePlayerFrame,
    defineMarketZone,
    defineMineZone,
};
