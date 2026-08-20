class DrawableObject {
    /**
     * Initializes the base graphical object structure with default dimensions and caching containers.
     */
    constructor() {
        this.x = 0;
        this.y = 320;
        this.width = 100;
        this.height = 150;
        this.img;
        this.imageCache = {};
        this.currentImage = 0;
    }

    /**
     * Instantiates a single image layer from the specified asset path.
     * @param {string} path - The relative file path to the target image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Handles contextual translation changes and draws the active graphic frame onto the rendering layer.
     * @param {CanvasRenderingContext2D} ctx - The target canvas rendering element context reference.
     */
    draw(ctx) {
        if (this.img) {
            let data = { w: this.width, h: this.height, y: this.y, x: this.x };
            
            if (this.img.src && this.img.src.includes('attack') && this.getAttackDimensions) {
                let file = this.img.src.split('/').pop();
                this.getAttackDimensions(file, data);
            }

            ctx.drawImage(this.img, data.x, data.y, data.w, data.h);
        }
    }

    /**
     * Iterates through a path collection set to preload multiple texture frames into the engine cache.
     * @param {Array<string>} arr - The collection listing of asset image strings.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Renders an invisible or colored wireframe perimeter rect trace bounding box for boundary tracking debugging.
     * @param {CanvasRenderingContext2D} ctx - The target canvas rendering element context reference.
     */
    showDrawFrame(ctx) {
        if (this instanceof Character || this instanceof SkeletonEnemy || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "#ffffff00";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}
