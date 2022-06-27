const VELOCITY = 0.08;

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

        const vector = randomNumberBetween(Math.PI / 3, 2 * Math.PI / 3);
        this.direction = { x: Math.cos(vector), y: Math.sin(vector) }
    }

    update(delta, paddle, activeBlocks) {
        this.x += this.direction.x * VELOCITY * delta;
        this.y += this.direction.y * VELOCITY * delta;

        const rect = this.rect();

        if (rect.left <= this.arena.getBoundingClientRect().left) {
            this.direction.x = Math.abs(this.direction.x);
        }

        else if (rect.right >= this.arena.getBoundingClientRect().right) {
            this.direction.x = -Math.abs(this.direction.x);
        }

        else if (rect.top <= this.arena.getBoundingClientRect().top) {
            this.direction.y = Math.abs(this.direction.y);
        }

        else if (rect.bottom >= this.arena.getBoundingClientRect().bottom) {
            return 'lost';
        }

        if (isCollision(rect, paddle.rect())) {
            let collisionPoint = this.arena.clientWidth / 100 * (this.x - paddle.position);
            collisionPoint /= (paddle.width / 2);
            const vector = (collisionPoint * Math.PI / 4) - Math.PI / 2;
            this.direction.x = Math.cos(vector);
            this.direction.y = Math.sin(vector);
        }

        for (let i = 0; i < activeBlocks.length; i++) {
            const block = activeBlocks[i];
            if (isCollision(rect, block.rect())) {
                let collisionPoint = (this.arena.clientWidth / 100) * this.x - block.position;
                collisionPoint /= (block.width / 2);
                let vector;
                this.direction.y > 0 ? 
                    vector = (collisionPoint * Math.PI / 4) - Math.PI / 2 :
                    vector = -(collisionPoint * Math.PI / 4) + Math.PI / 2;
                this.direction.x = Math.cos(vector);
                this.direction.y = Math.sin(vector);
                activeBlocks.splice(i, 1)
                block.blockElement.style.visibility = 'hidden';

                if (activeBlocks.length == 0) {
                    return 'win';
                }
            }
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