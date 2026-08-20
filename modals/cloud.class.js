class Cloud extends Movableobject {
    y = 1;

    /**
     * Creates a new instance of a floating background cloud asset.
     */
    constructor() {
        super();
        this.loadImage('img/5_background/layers/cloud/1.png');
        this.x = Math.random() * 2160;
        this.width = 120;
        this.height = 50;
        this.animate();
    }
 
    /**
     * Starts the horizontal scrolling motion loop and resets the coordinate cycle upon screen escape bounds.
     */
    animate() {
        setInterval(() => {
            if (this.x < -this.width) {
                this.x = 2160;
            }
            this.x -= 0.1;
        }, 1000 / 60);
    }
}
