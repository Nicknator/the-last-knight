class Endboss extends Movableobject {
    height = 400;
    width = 500;
    y = -30;
    energy = 200;
    isAttacking = false;
    attackCooldown = false;
    isHurtState = false;
    gravityTriggered = false;
    hasRoared = false;

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
        } else {
            super.draw(ctx);
            if (this.isAttacking && !this.isDead()) {
                ctx.drawImage(this.fireImg, -100, 160, 200, 80);
            }
        }
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.handleBossDeath();
            } else if (this.isHurtState) {
                this.loadImage(this.IMAGE_HURT);
            } else {
                this.handleBossMovement();
            }
        }, 300);
    }

      handleBossDeath() {
        if (this.deathStarted) return;
        if (this.y >= 120 && !this.isDeadAnimationFinished) {
            this.deathStarted = true; 
            this.y = 120;
            this.speedY = 0;
            this.loadImage(this.IMAGE_DEAD_GROUND);  
            setTimeout(() => {
                this.isDeadAnimationFinished = true;
            }, 1500);
        }
    }


    handleBossMovement() {
        this.playAnimation(this.IMAGES_WALKING);
        let frameCheck = this.currentImage % this.IMAGES_WALKING.length === 0;
        if (this.currentDistance < 600 && frameCheck && this.world?.sound) {
            this.world.sound.dragonWingSound();
            if (!this.hasRoared) {
                this.world.sound.dragonGrowlSound();
                this.hasRoared = true;
            }
        }
    }

    hit(damageAmount) {
        if (this.isDead()) return;
        this.energy -= damageAmount;
        if (this.energy <= 0) {
            this.energy = 0;
            this.isAttacking = false;
            this.triggerGravity();
        } else {
            this.isHurtState = true;
            setTimeout(() => { this.isHurtState = false; }, 400);
        }
    }

    triggerGravity() {
        if (!this.gravityTriggered) {
            this.gravityTriggered = true;
            this.speedY = 0;
            this.applyGravity();
        }
    }

    checkPlayerDistance(characterX) {
        if (this.isDead()) return;
        this.currentDistance = Math.abs(this.x - characterX);
        if (this.currentDistance < 200 && !this.isAttacking && !this.attackCooldown) {
            this.triggerFireAttack();
        } else if (this.currentDistance >= 200 && !this.attackCooldown) {
            this.isAttacking = false;
        }
    }

    triggerFireAttack() {
        this.isAttacking = true;
        if (this.world?.sound) this.world.sound.dragonFireSound();
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
}
