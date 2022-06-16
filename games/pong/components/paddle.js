const SPEED = 0.008;

export default class Paddle {
    constructor(paddleElement, arena) {
        this.paddleElement = paddleElement;
        this.height = paddleElement.clientHeight;
        this.arena = arena;
        this.reset();
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue("--position"));
    }

    set position(value) {
        this.paddleElement.style.setProperty("--position", value);
    }

    reset() {
        this.position = 50;
    }

    rect() {
        return this.paddleElement.getBoundingClientRect();
    }

    playerUpdate(e) {
        if (e.y >= this.arena.getBoundingClientRect().bottom || e.y <= this.arena.getBoundingClientRect().top ||
            e.x >= this.arena.getBoundingClientRect().right || e.x <= this.arena.getBoundingClientRect().left) {
            return;
        }

        if (this.checkOutOfBounds(e.offsetY)) {
            return;
        }

        this.position = (e.offsetY / this.arena.clientHeight) * 100;
    }

    computerUpdate(delta, ballHeight) {
        if (this.checkOutOfBounds((ballHeight / 100) * this.arena.clientHeight)) {
            return;
        }

        this.position += SPEED * delta * (ballHeight - this.position);
    }

    checkOutOfBounds(positionY) {
        return positionY + this.height * 0.5 >= this.arena.clientHeight ||
            positionY - this.height * 0.5 <= 0;
    }
}