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
        // Nur zeichnen, wenn das Bild auch wirklich geladen wurde
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
