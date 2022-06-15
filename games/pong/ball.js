const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;

export default class Ball {
    constructor(ballElement) {
        this.ballElement = ballElement;
        this.arena = ballElement.parentNode;
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

        while (Math.abs(this.direction.x) <= 0.1 || Math.abs(this.direction.y) >= 0.9) {
            const vector = randomNumberBetween(0, 2 * Math.PI);
            this.direction = { x: Math.cos(vector), y: Math.sin(vector) }
        }
        
        this.velocity = INITIAL_VELOCITY;
    }

    update(delta) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCREASE * delta;

        const rect = this.rect();
        const arena = this.ballElement.parentNode;

        if (rect.bottom >= this.arena.getBoundingClientRect().bottom || 
            rect.top <= this.arena.getBoundingClientRect().top) {
            this.direction.y *= -1;
        }

        if (rect.right >= this.arena.getBoundingClientRect().right || 
            rect.left <= this.arena.getBoundingClientRect().left) {
            this.direction.x *= -1;
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}