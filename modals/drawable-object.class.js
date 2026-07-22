class DrawableObject {

    constructor() {
        // Hier setzen wir Standardwerte anstelle des sofortigen Zeichnens,
        // damit beim späteren Zeichnen keine Fehler entstehen.
        this.x = 0;
        this.y = 320;
        this.width = 100;
        this.height = 150;
        this.img;
        this.imageCache = {};
        this.currentImage = 0;



    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        if (this.img) {
            let data = { w: this.width, h: this.height, y: this.y, x: this.x };
            if (this.img.src && this.img.src.includes('character') && this.getAttackDimensions) {
                let file = this.img.src.split('/').pop();
                this.getAttackDimensions(file, data);
            }

            ctx.drawImage(this.img, data.x, data.y, data.w, data.h);
        }
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


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
