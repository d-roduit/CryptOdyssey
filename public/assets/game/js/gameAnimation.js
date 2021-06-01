/* eslint-disable max-len */
import * as Character from './character.js';
import * as Map from './map.js';

const canvas = document.getElementById('game-canvas');

const context = canvas.getContext('2d');

const canvasWidth = 960;
const canvasHeight = 512;

// ----------Animation loop-----------------
let fpsInterval;
let now;
let then;
let elapsed;
const tilesheetWidth = 32;

const animate = () => {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        context.canvas.width = canvasWidth;
        context.canvas.height = canvasHeight;

        // draw map
        for (let l = 0; l < Map.map.layers.length; l += 1) {
            for (let x = 0; x < Map.map.rows; x += 1) {
                for (let y = 0; y < Map.map.columns; y += 1) {
                    const tilesheetIndex = (Map.map.layers[l].data[y * Map.map.columns + x + 14]) - 1;
                    const tileX = x * Map.map.tsize;
                    const tileY = y * Map.map.tsize;
                    const sX = (tilesheetIndex % tilesheetWidth) * Map.map.tsize;
                    const sY = (Math.floor(tilesheetIndex / tilesheetWidth) * Map.map.tsize);

                    context.drawImage(Map.tilesheetMap, sX, sY, Map.map.tsize, Map.map.tsize, tileX, tileY, Map.map.tsize, Map.map.tsize);
                }
            }
        }

        // draw sprite
        const charSX = Character.character.width * Character.character.frameX;
        const charSY = Character.character.height * Character.character.frameY;
        Character.drawSprite(context, Character.tilesheetMale, charSX, charSY, Character.character.width, Character.character.height, Character.character.x, Character.character.y, Character.character.width, Character.character.height);

        // draw front layers
        for (let l = 0; l < Map.map.frontLayers.length; l += 1) {
            for (let x = 0; x < Map.map.rows; x += 1) {
                for (let y = 0; y < Map.map.columns; y += 1) {
                    const tilesheetIndex = (Map.map.frontLayers[l].data[y * Map.map.columns + x + 14]) - 1;
                    const tileX = x * Map.map.tsize;
                    const tileY = y * Map.map.tsize;
                    const sX = (tilesheetIndex % tilesheetWidth) * Map.map.tsize;
                    const sY = (Math.floor(tilesheetIndex / tilesheetWidth) * Map.map.tsize);

                    context.drawImage(Map.tilesheetMap, sX, sY, Map.map.tsize, Map.map.tsize, tileX, tileY, Map.map.tsize, Map.map.tsize);
                }
            }
        }

        Character.movePlayer(canvas);
        Character.handlePlayerFrame();
    }
};

// animation loop based on fps
export const startAnimating = (fps) => {
    fpsInterval = 1000 / fps; // how long we wait before we serve the next frame
    then = Date.now();
    animate();
};

// music
export const backgroundMusic = new Audio('assets/game/sounds/TownTheme.mp3');
