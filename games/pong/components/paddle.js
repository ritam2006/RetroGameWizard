export default class Paddle {
    constructor(paddleElement) {
        this.paddleElement = paddleElement;
        this.height = paddleElement.clientHeight;
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue("--position"));
    }

    set position(value) {
        this.paddleElement.style.setProperty("--position", value);
    }
}