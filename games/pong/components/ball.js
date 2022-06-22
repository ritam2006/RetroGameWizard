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

    update(delta, playerPaddle, computerPaddle, arenaHeight) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCREASE * delta;

        const rect = this.rect();
        const playerPaddleRect = playerPaddle.rect();
        const computerPaddleRect = computerPaddle.rect();

        if (rect.bottom >= this.arena.getBoundingClientRect().bottom) {
            console.log(this.direction.y);
            this.direction.y = -Math.abs(this.direction.y);
        }

        else if (rect.top <= this.arena.getBoundingClientRect().top) {
            console.log(this.direction.y);
            this.direction.y = Math.abs(this.direction.y);
        }

        if (isCollision(rect, playerPaddleRect)) {
            let collisionPoint = this.y - (playerPaddle.position);
            collisionPoint /= (playerPaddle.height / 2);
            const vector = collisionPoint * Math.PI / 4 * arenaHeight / 100;
            this.direction.x = Math.cos(vector);
            this.direction.y = Math.sin(vector);
        }

        if (isCollision(rect, computerPaddleRect)) {
            let collisionPoint = this.y - (computerPaddle.position);
            collisionPoint /= (computerPaddle.height / 2);
            const vector = collisionPoint * Math.PI / 4 * arenaHeight / 100;
            this.direction.x = -Math.cos(vector);
            this.direction.y = Math.sin(vector);
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
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}