class Endboss extends Movableobject {
    height = 400;
    width = 500;
    y = -30;
    energy = 200; 
    isAttacking = false; 
    attackCooldown = false; 
    isHurtState = false; 

    gravityTriggered = false; 

    IMAGES_WALKING = [
        'img/4_enemie_boss/3_fly/flying-dragon1.png',
        'img/4_enemie_boss/3_fly/flying-dragon2.png',
        'img/4_enemie_boss/3_fly/flying-dragon3.png',
        'img/4_enemie_boss/3_fly/flying-dragon4.png',
    ];

    IMAGE_DEAD_GROUND = 'img/4_enemie_boss/4_dead/dead-dragon.png'; 
    IMAGE_HURT = 'img/4_enemie_boss/5_hurt/hurt-dragon.png'; 

    constructor() {
        super();
        // 🚀 DIE RETTUNG FÜR DIE FLÜGEL: Lädt exakt das ERSTE Bild als Startpunkt!
        this.loadImage(this.IMAGES_WALKING[0]); 
        this.loadImages(this.IMAGES_WALKING); 
        this.fireImg = new Image();
        this.x = 1600;
        this.animate();
    }

    isAboveGround() {
        return this.y < 120;
    }

    draw(ctx) {
        if (this.isDead() && this.y < 120) {
            ctx.save();
            ctx.filter = "brightness(3) drop-shadow(0px 0px 30px rgba(0, 150, 255, 1))"; 
            super.draw(ctx);
            ctx.restore();
        } 
        else {
            super.draw(ctx); 
            if (this.isAttacking && !this.isDead()) {
                ctx.drawImage(this.fireImg, -100, 160, 200, 80); 
            }
        }
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                if (this.y >= 120) {
                    this.y = 120; 
                    this.speedY = 0; 
                    this.loadImage(this.IMAGE_DEAD_GROUND); 
                }
            } 
            else if (this.isHurtState) {
                this.loadImage(this.IMAGE_HURT); 
            } 
            else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    hit(damageAmount) {
        if (this.isDead()) return;
        this.energy -= damageAmount;
        console.log("Drachen-Energie:",this.energy);
        if (this.energy <= 0) {
            this.energy = 0;
            this.isAttacking = false; 
            if (!this.gravityTriggered) {
                this.gravityTriggered = true; 
                this.speedY = 0; 
                this.applyGravity(); 
            }
        } else {
            this.isHurtState = true;
            setTimeout(() => { this.isHurtState = false; }, 400);
        }
    }

    checkPlayerDistance(characterX) {
        if (this.isDead()) return; 
        let distance = this.x - characterX;
        if (distance < 200 && !this.isAttacking && !this.attackCooldown) {
            this.isAttacking = true; 

            setTimeout(() => {
                this.isAttacking = false; 
                this.attackCooldown = true; 
                this.y = 50; 

                setTimeout(() => {
                    this.attackCooldown = false;
                    if (!this.isDead()) this.y = -30; 
                }, 3000); 

            }, 3000);
        } 
        else if (distance >= 200 && !this.attackCooldown) {
            this.isAttacking = false;
        }
    }
}
