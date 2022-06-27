import Paddle from './components/paddle.js';
import Ball from './components/ball.js';
import Block from './components/block.js';

const options = document.querySelector('.options');
const pause = document.querySelector('.fa-pause');
const play = document.createElement('i');
play.classList.add('fa-solid');
play.classList.add('fa-play');
let isPaused = false;

const arena = document.querySelector('.arena');
const paddle = new Paddle(document.querySelector('.paddle'), arena);
const ball = new Ball(document.querySelector('.ball'), arena);
const wrapper = document.querySelector('.wrapper');
let blocks = [];

createBlocks();

let lastTime = 0;
function update(time) {
    let result;
    if (lastTime !== 0 && !isPaused) {
        const delta = time - lastTime;
        result = ball.update(delta, paddle, blocks);

        if (result === 'win') {
            paddle.reset();
            ball.reset();

            while (wrapper.firstChild) {
                wrapper.removeChild(wrapper.firstChild);
            }

            blocks = [];
            createBlocks();
        }

        else if (result === 'lost') {
            paddle.reset();
            ball.reset();

            while (wrapper.firstChild) {
                wrapper.removeChild(wrapper.firstChild);
            }

            blocks = [];
            createBlocks();
        }
    }

    lastTime = time;

    if (result === 'lost' || result === 'won') {
        lastTime = 0;
        setTimeout(() => window.requestAnimationFrame(update), 200);
    }

    else {
        window.requestAnimationFrame(update);
    }
}

function createBlocks() {
    const columns = parseInt(getComputedStyle(wrapper).getPropertyValue('--columns'));
    const rows = 5;
    for (let i = 0; i < rows * columns; i++) {
        const blockElement = document.createElement('div');
        blockElement.classList.add('block');
        wrapper.appendChild(blockElement);
        const block = new Block(blockElement);
        blocks[i] = block;
    }
}

arena.addEventListener('mousemove', e => paddle.update(e));

pause.addEventListener('click', pauseGame);
play.addEventListener('click', unpauseGame);

function pauseGame() {
    isPaused = true;
    options.removeChild(pause);
    options.appendChild(play);
}

function unpauseGame() {
    isPaused = false;
    options.removeChild(play);
    options.appendChild(pause);
}

window.addEventListener('keydown', e => {
    if (e.key === ' ') {
        isPaused ? unpauseGame() : pauseGame();
    }
});

setTimeout(() => window.requestAnimationFrame(update), 200);