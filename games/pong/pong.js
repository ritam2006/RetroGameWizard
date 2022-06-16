import Ball from './components/ball.js';
import Paddle from './components/paddle.js';

const arena = document.querySelector('.arena');
const ball = new Ball(document.querySelector('.ball'), arena);
const playerPaddle = new Paddle(document.getElementById('player-paddle'), arena);
const computerPaddle = new Paddle(document.getElementById('computer-paddle'), arena);

const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');

let lastTime = 0;
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime;
        const victor = ball.update(delta, playerPaddle.rect(), computerPaddle.rect());
        computerPaddle.computerUpdate(delta, ball.y);

        // When player wins...
        if (victor === 1) {
            ball.reset();
            computerPaddle.reset();
            playerScore.textContent = parseInt(playerScore.textContent) + 1;
        }

        // When computer wins...
        else if (victor === 2) {
            ball.reset();
            computerPaddle.reset();
            computerScore.textContent = parseInt(computerScore.textContent) + 1;
        }
    }

    lastTime = time
    window.requestAnimationFrame(update);
}

document.addEventListener('mousemove', e => {
    playerPaddle.playerUpdate(e);
});

window.requestAnimationFrame(update);