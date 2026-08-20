class BackgroundObject extends Movableobject {
    width = 720;
    height = 480;

    /**
     * Creates a new static background layer asset for world decoration mapping.
     * @param {string} imagePath - The relative file path to the target texture asset.
     * @param {number} x - The horizontal placement index coordinate on the map grid.
     */
    constructor(imagePath, x) {
        super()
        this.loadImage(imagePath);
        this.x = x;
        this.y = 0;
    }
}
