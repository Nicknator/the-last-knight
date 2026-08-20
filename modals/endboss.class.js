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

    /**
     * Creates a new instance of the dragon Endboss and preloads assets and position flags.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.fireImg = new Image();
        this.x = 1600;
        this.animate();
    }

    /**
     * Evaluates if the dragon is hovering above its custom flight floor boundaries.
     * @returns {boolean} True if the Y-coordinate sits below the flight floor index.
     */
    isAboveGround() {
        return this.y < 120;
    }

    /**
     * Handles canvas context filters and draws either the main boss sprite or active combat particles.
     * @param {CanvasRenderingContext2D} ctx - The target canvas rendering element reference.
     */
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

    /**
     * Initializes behavioral cycles evaluating active health layers to fire movements or animations.
     */
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

    /**
     * Manages ground impact calculations upon health depletion and triggers transition locks.
     */
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

    /**
     * Cycles flight animations and manages relative coordinate tracking to trigger sound audio clips.
     */
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

    /**
     * Processes damage deductions onto the dragon's vitality pool and handles transient stun timers.
     * @param {number} damageAmount - The numerical value subtracted from active health layers.
     */
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

    /**
     * Engages the core gravitational falling physics loop to bring down the defeated boss asset.
     */
    triggerGravity() {
        if (!this.gravityTriggered) {
            this.gravityTriggered = true;
            this.speedY = 0;
            this.applyGravity();
        }
    }

    /**
     * Measures horizontal vector absolute spreads to determine if the boss engages proximity attacks.
     * @param {number} characterX - The horizontal coordinate key position of the player ritter.
     */
    checkPlayerDistance(characterX) {
        if (this.isDead()) return;
        this.currentDistance = Math.abs(this.x - characterX);
        if (this.currentDistance < 200 && !this.isAttacking && !this.attackCooldown) {
            this.triggerFireAttack();
        } else if (this.currentDistance >= 200 && !this.attackCooldown) {
            this.isAttacking = false;
        }
    }

    /**
     * Coordinates active fire sequence durations, shifts combat height levels, and sets cooldown buffers.
     */
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
