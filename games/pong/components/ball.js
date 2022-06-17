const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;

export default class Ball {
    constructor(ballElement, arena) {
        this.ballElement = ballElement;
        this.arena = arena;
        this.reset();
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--x"));
    }

    set x(value) {
        this.ballElement.style.setProperty("--x", value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--y"));
    }

    set y(value) {
        this.ballElement.style.setProperty("--y", value);
    }

    rect() {
        return this.ballElement.getBoundingClientRect();
    }

    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0, y: 0 };

        while (Math.abs(this.direction.x) <= 0.1 || Math.abs(this.direction.x) >= 0.9 ||
            Math.abs(this.direction.y) <= 0.1 || Math.abs(this.direction.y) >= 0.9) {
            const vector = randomNumberBetween(0, 2 * Math.PI);
            this.direction = { x: Math.cos(vector), y: Math.sin(vector) }
        }
        
        this.velocity = INITIAL_VELOCITY;
    }

    update(delta, playerPaddleRect, computerPaddleRect) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCREASE * delta;

        const rect = this.rect();

        if (rect.bottom >= this.arena.getBoundingClientRect().bottom || 
            rect.top <= this.arena.getBoundingClientRect().top) {
            this.direction.y *= -1;
        }

        if (isCollision(rect, playerPaddleRect) || isCollision(rect, computerPaddleRect)) {
            this.direction.x *= -1;
        }

        // When player wins...
        if (rect.right >= this.arena.getBoundingClientRect().right) {
            return 0;
        }

        // When computer wins...
        else if (rect.left <= this.arena.getBoundingClientRect().left) {
            return 1;
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function isCollision(rect1, rect2) {
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    );
}