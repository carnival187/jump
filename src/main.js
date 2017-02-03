import Game from './js/Game.js';

let canvas = document.createElement('canvas');

canvas.width = 500;
canvas.height = 300;

document.body.appendChild(canvas);

const GAME = new Game(canvas);

GAME.start();

console.log('tesdt');

