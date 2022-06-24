const SPEED = 0.015;

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
        if (this.outOfBounds(e.offsetY)) {
            return;
        }

        this.position = (e.offsetY / this.arena.clientHeight) * 100;
    }

    computerUpdate(delta, ballHeight) {
        if (this.outOfBounds((ballHeight / 100) * this.arena.clientHeight)) {
            return;
        }

        this.position += SPEED * delta * (ballHeight - this.position);
    }

    outOfBounds(positionY) {
        return (
            positionY - this.height / 2 < 0 ||
            positionY + this.height / 2 > this.arena.clientHeight
        );
    }
}