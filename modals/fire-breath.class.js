class FireBreath extends Movableobject {
    startX = 0; 
    startY = 0; 
    isDead = false; 
    rotation = 45; 

    constructor(bossX, bossY, offset = 0) {
        super();
        this.loadImage("img/4_enemie_boss/5_fire-breath/fire.png");
        this.startX = bossX + 100; 
        this.startY = bossY + 150; 
        this.x = this.startX - offset; 
        this.y = this.startY + offset; 
        this.width = 120; 
        this.height = 60;
        this.otherDirection = true;
        this.animate();
    }

    draw(ctx) {
        ctx.save(); 
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
        super.draw(ctx); 
        ctx.restore(); 
    }

    animate() {
        setInterval(() => {
            if (this.isDead) return;
            if (this.x < this.startX - 400) {
                this.x = this.startX; 
                this.y = this.startY; 
            } else {
                this.x -= 10; 
                this.y += 10; 
            }
        }, 1000 / 60);
    }
}
