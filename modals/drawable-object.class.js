class DrawableObject {
    constructor() {
        // Hier setzen wir Standardwerte anstelle des sofortigen Zeichnens,
        // damit beim späteren Zeichnen keine Fehler entstehen.
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
        this.img = null; 
        
        
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
}
