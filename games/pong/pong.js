import Ball from './components/ball.js';
import Paddle from './components/paddle.js';

const arena = document.querySelector('.arena');
const ball = new Ball(document.querySelector('.ball'), arena);
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));

let lastTime = 0;
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime;
        ball.update(delta);
    }

    lastTime = time
    window.requestAnimationFrame(update);
}

document.addEventListener('mousemove', e => {
    if (e.y >= arena.getBoundingClientRect().bottom || e.y <= arena.getBoundingClientRect().top ||
        e.x >= arena.getBoundingClientRect().right || e.x <= arena.getBoundingClientRect().left) {
        return;
    }

    const newPosition = e.y - arena.getBoundingClientRect().top;
    if (checkOutOfBounds(newPosition)) {
        return;
    }

    playerPaddle.position = (newPosition / arena.clientHeight) * 100;
});

function checkOutOfBounds(positionY) {
    return positionY + playerPaddle.height * 0.5 >= arena.clientHeight ||
        positionY - playerPaddle.height * 0.5 <= 0;
}

window.requestAnimationFrame(update);