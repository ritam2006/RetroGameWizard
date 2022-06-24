export default class Paddle {
    constructor(paddleElement, arena) {
        this.paddleElement = paddleElement;
        this.width = paddleElement.clientWidth;
        this.arena = arena;
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue("--position"));
    }

    set position(value) {
        this.paddleElement.style.setProperty("--position", value);
    }
    
    rect() {
        return this.paddleElement.getBoundingClientRect();
    }

    reset() {
        this.position = 50;
    }

    update(e) {
        if (this.outOfBounds(e.offsetX)) {
            return;
        }

        this.position = (e.offsetX / this.arena.clientWidth) * 100;
    }

    outOfBounds(positionX) {
        return (
            positionX - this.width / 2 < 0 ||
            positionX + this.width / 2 > this.arena.clientWidth
        );
    }
}