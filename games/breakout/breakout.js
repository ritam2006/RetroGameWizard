import Paddle from './components/paddle.js';
import Ball from './components/ball.js';
import Block from './components/block.js';

const arena = document.querySelector('.arena');
const paddle = new Paddle(document.querySelector('.paddle'), arena);
const ball = new Ball(document.querySelector('.ball'), arena);
const wrapper = document.querySelector('.wrapper');
let blocks = [];

let lastTime = 0;
function update(time) {
    let result;
    if (lastTime !== 0) {
        const delta = time - lastTime;
        result = ball.update(delta, paddle, blocks);

        if (result === "lost") {
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

    if (result === "lost") {
        lastTime = 0;
        setTimeout(() => window.requestAnimationFrame(update), 200);
    }

    else {
        window.requestAnimationFrame(update);
    }
}

function createBlocks() {
    const columns = parseInt(getComputedStyle(wrapper).getPropertyValue('--columns'));
    const rows = 6;
    for (let i = 0; i < rows * columns; i++) {
        const blockElement = document.createElement('div');
        blockElement.classList.add('block');
        const block = new Block(blockElement);
        blocks[i] = block;
    }
    
    blocks.forEach(block => {
        wrapper.appendChild(block.blockElement);
    });
}

arena.addEventListener('mousemove', e => paddle.update(e));

createBlocks();
setTimeout(() => window.requestAnimationFrame(update), 200);