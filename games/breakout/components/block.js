export default class Block {
    constructor(blockElement) {
        this.blockElement = blockElement;
    }

    rect() {
        return this.blockElement.getBoundingClientRect();
    }
}