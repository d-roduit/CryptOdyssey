import * as Map from './map.js';

/* eslint-disable max-len */
export const character = {
    x: 250, // horizontal position
    y: 300, // vertical position
    width: 64,
    height: 64,
    frameX: 0, // horizontal coordinate of frame we cut out from our spritesheet
    frameY: 10, // vertical coordinate
    speed: 6, // how many pixels we move per frame of animation
    moving: false, // use this to switch between standing and moving animation
};

// ----------Spritesheets------------------

// Male character
export const tilesheetMale = new Image();
tilesheetMale.src = 'assets/game/images/character_boy_main.png';

// ----------Draw Sprite--------------------
export const drawSprite = (context, img, sX, sY, sW, sH, dX, dY, dW, dH) => {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};

// -------------Keys events----------------
const keys = [];
// callback function. Function that will run whatever code we put in it. e = event object.
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    keys[e.key] = true; // when a key is pressed, we add it to our array
    character.moving = true;
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
export const movePlayer = (canvas) => {
    if (keys.ArrowUp && character.y > 0 && !arrayAlreadyHasArray(Map.collisionBlocksUp, [character.x, character.y])) {
        character.y -= character.speed;
        character.frameY = 8;
        character.moving = true;
    }
    if (keys.ArrowLeft && character.x > 0 && !arrayAlreadyHasArray(Map.collisionBlocksLeft, [character.x, character.y])) {
        character.x -= character.speed;
        character.frameY = 9;
        character.moving = true;
    }
    if (keys.ArrowDown && character.y < canvas.height - character.height && !arrayAlreadyHasArray(Map.collisionBlocksDown, [character.x, character.y])) {
        character.y += character.speed;
        character.frameY = 10;
        character.moving = true;
    }
    if (keys.ArrowRight && character.x < canvas.width - character.width && !arrayAlreadyHasArray(Map.collisionBlocksRight, [character.x, character.y])) {
        character.x += character.speed;
        character.frameY = 11;
        character.moving = true;
    }
};

export const handlePlayerFrame = () => {
    if (character.frameX < 8 && character.moving) {
        character.frameX += 1;
    } else {
        character.frameX = 0;
    }
};
