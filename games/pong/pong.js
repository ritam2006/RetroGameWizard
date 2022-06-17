import Ball from './components/ball.js';
import Paddle from './components/paddle.js';

const options = document.querySelector('.options');
const pause = document.querySelector('.fa-pause');
const play = document.createElement('i');
play.classList.add('fa-solid');
play.classList.add('fa-play');
let isPaused = false;

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
        if (victor === 0) {
            ball.reset();
            computerPaddle.reset();
            playerScore.textContent = parseInt(playerScore.textContent) + 1;
        }

        // When computer wins...
        else if (victor === 1) {
            ball.reset();
            computerPaddle.reset();
            computerScore.textContent = parseInt(computerScore.textContent) + 1;
        }
    }

    lastTime = time
    if (!isPaused) {
        window.requestAnimationFrame(update);
    } 
}

document.addEventListener('mousemove', e => {
    playerPaddle.playerUpdate(e);
});

let startTime;
let endTime;

pause.addEventListener('click', pauseGame);
play.addEventListener('click', unpauseGame);

function pauseGame() {
    isPaused = true;
    startTime = new Date();
    options.removeChild(pause);
    options.appendChild(play);
}

function unpauseGame() {
    isPaused = false;
    endTime = new Date();
    lastTime += endTime - startTime;
    options.removeChild(play);
    options.appendChild(pause);
    window.requestAnimationFrame(update);
}

window.addEventListener('keydown', e => {
    if (e.key === ' ') {
        if (isPaused) {
            unpauseGame();
        }

        else {
            pauseGame();
        }
    }
});

window.requestAnimationFrame(update);