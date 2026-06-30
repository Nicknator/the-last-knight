class World {
    character = new Character();
    enemies = [
        new SkeletonEnemy(),
        new SkeletonEnemy(),
        new SkeletonEnemy(),
    ];
    ctx;
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high'; 
        this.draw();
    }

    draw() {
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

    }
}