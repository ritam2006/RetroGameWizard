import Ball from './ball.js';

const ball = new Ball(document.querySelector('.ball'));

let lastTime = 0;
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime;
        ball.update(delta);
    }

    lastTime = time
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);