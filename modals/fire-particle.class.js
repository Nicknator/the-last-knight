class FireParticle {
    constructor(enemy) {
        this.boss = enemy; 
        this.offsetX = Math.random() * 10 - 5;
        this.offsetY = Math.random() * 10 - 5;
        this.spreadY = Math.random() * 8 - 4; 
        this.flightDist = 0; 
        this.startSize = Math.random() * 15 + 10; 
        this.size = this.startSize;
        this.life = 1.0; 
        this.decay = Math.random() * 0.02 + 0.015; 
    }

    update() {
        this.flightDist += 14; 
        this.life -= this.decay;
        this.size = this.startSize + (this.flightDist * 0.25);
        if (this.boss.otherDirection) {
            this.x = this.boss.x + 380 + this.offsetX + this.flightDist; 
        } else {
            this.x = this.boss.x + 160 - this.offsetX - this.flightDist; 
        }
        this.y = this.boss.y + 160 + this.offsetY + this.flightDist + (this.spreadY * (this.flightDist * 0.1)); 
    }

    draw(ctx) {
        if (this.life <= 0) return;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter'; 
        ctx.globalAlpha = this.life;
        let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');   
        gradient.addColorStop(0.15, 'rgba(255, 210, 0, 0.9)'); 
        gradient.addColorStop(0.4, 'rgba(255, 60, 0, 0.5)');   
        gradient.addColorStop(0.8, 'rgba(120, 0, 0, 0.15)'); 
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');          
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
    }
}
