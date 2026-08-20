class SkeletonEnemy extends Movableobject {
    y = 320;

    IMAGES_IDLE = [
        'img/3_enemies_skeleton/2.walk/skeleton-walk-frame1.png'
    ];

    IMAGES_WALKING = [
        'img/3_enemies_skeleton/2.walk/skeleton-walk-frame1.png',
        'img/3_enemies_skeleton/2.walk/skeleton-walk-frame2.png',
        'img/3_enemies_skeleton/2.walk/skeleton-walk-frame4.png',
        'img/3_enemies_skeleton/2.walk/skeleton-walk-frame6.png',
    ];

    IMAGES_ATTACK = [
        'img/3_enemies_skeleton/3.attack/skeleton-attack1.png',
        'img/3_enemies_skeleton/3.attack/skeleton-attack2.png',
        'img/3_enemies_skeleton/3.attack/skeleton-attack3.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_skeleton/4.dead/dead1.png',
        'img/3_enemies_skeleton/4.dead/dead2.png',
    ];

    /**
     * Creates a new skeleton enemy instance, preloads textures, and initializes runtime speed attributes.
     * @param {number} startX - The base horizontal spawn coordinate on the map canvas.
     */
    constructor(startX) {
        super(startX);
        this.loadImage(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.moveLeft();
        this.x = startX + Math.random() * 200;
        this.enemySpeed = 0.05 + Math.random() * 0.25;
        this.energy = 90;
    }

    /**
     * Initializes the combat strike loops and maps state calculations at structured timeframes.
     */
    animate() {
        setInterval(() => {
            if (this.isAttacking && this.energy > 0) {
                this.playAnimation(this.IMAGES_ATTACK);
            }
        }, 500);

        setInterval(() => {
            if (this.isDead()) return this.handleDeathAnimation();
            if (!this.isAttacking) this.handleMovement();          
        }, 500);
    }

    /**
     * Runs through defeat sprite configurations sequentially and locks character assets upon completion.
     * @returns {boolean|void} True if the processing execution path breaks early.
     */
    handleDeathAnimation() {
        if (!this.isDeadAnimationFinished) {
            let i = this.currentImage % this.IMAGES_DEAD.length;
            this.playAnimation(this.IMAGES_DEAD);    
            if (i === this.IMAGES_DEAD.length - 1) {
                this.isDeadAnimationFinished = true; 
            }
        }
    }

    /**
     * Processes horizontal layout modifications moving frame animations along specific direction flags.
     */
    handleMovement() {
        this.playAnimation(this.IMAGES_WALKING);
        let moveDistance = this.enemySpeed * 30;
        this.x += this.otherDirection ? moveDistance : -moveDistance;
    }

    /**
     * Restructures frame boundary mappings for the skeleton during its melee slashing sequence.
     * @param {string} file - The file path description string of the target sprite texture.
     * @param {Object} data - The measurement container object holding canvas coordinate keys.
     */
    getAttackDimensions(file, data) {
        let i = this.currentImage % this.IMAGES_ATTACK.length;
        if (i === 0) { data.w = 180; data.h = 145; data.y = this.y - 0; }
        else if (i === 1) { data.w = 110; data.h = 190; data.y = this.y - 45; }
        else if (i === 2) { data.w = 130; data.h = 145; data.y = this.y - 0; }
        data.x = this.x - ((data.w - this.width) / 2);
    }
}
