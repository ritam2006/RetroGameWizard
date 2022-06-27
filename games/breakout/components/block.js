export default class Block {
    constructor(blockElement) {
        this.blockElement = blockElement;
        this.width = blockElement.clientWidth;
    }

    get position() {
        return this.blockElement.offsetLeft + this.width / 2;
    }

    rect() {
        return this.blockElement.getBoundingClientRect();
    }
}