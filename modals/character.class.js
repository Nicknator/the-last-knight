class Character extends Movableobject {
    y = 220;
    world;
    ammo = 5;
    coins = 0;
    speed = 5;
    wasAboveGround = false;
    deathResetDone = false;
    hurtResetDone = false;

    IMAGES_IDLE = [
        'img/2.character/idle/knight-idle-frame-origen.png',
    ];

    IMAGES_WALKING = [
        'img/2.character/walk/knight-idle-frame.png',
        'img/2.character/walk/knight-idle-frame2.png',
        'img/2.character/walk/knight-idle-frame3.png',
        'img/2.character/walk/knight-idle-frame4.png',
        'img/2.character/walk/knight-idle-frame5.png',
        'img/2.character/walk/knight-idle-frame6.png',
        'img/2.character/walk/knight-idle-frame7.png',
        'img/2.character/walk/knight-idle-frame8.png',
    ];

    IMAGES_ATTACK = [
        'img/2.character/attack/attack1.png',
        'img/2.character/attack/attack2.png',
        'img/2.character/attack/attack3.png',
        'img/2.character/attack/attack4.png',
    ];

    IMAGES_PROTECTION = [
        'img/2.character/protection/protection1.png',
    ];

    IMAGES_JUMPING = [
        'img/2.character/jum/jump6.png',
        'img/2.character/jum/jump1.png',
        'img/2.character/jum/jump4.png',
        'img/2.character/jum/jump5.png',
        'img/2.character/jum/jump6.png',
    ];

    IMAGES_DEAD = [
        'img/2.character/dead/dead1.png',
        'img/2.character/dead/dead2.png',
        'img/2.character/dead/dead3.png',
        'img/2.character/dead/dead4.png',
        'img/2.character/dead/dead5.png',
        'img/2.character/dead/dead6.png',
    ];

    IMAGES_HURT = [
        'img/2.character/hurt/hurt1.png',
        'img/2.character/hurt/hurt2.png',
    ];

    IMAGES_SHOOT = [
        'img/2.character/shoot_crossbow/crossbow1.png',
        'img/2.character/shoot_crossbow/crossbow2.png',
        'img/2.character/shoot_crossbow/crossbow3.png',
        'img/2.character/shoot_crossbow/crossbow4.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_PROTECTION);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SHOOT);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.world || !this.world.keyboard) return;
            this.horizontalMovementRight();
            this.horizontalMovementLeft();
            this.verticalHorizontal();
            this.world.camera_x = -this.x + 280;
        }, 1000 / 60);

        this.characterAnimationInterval = setInterval(() => {
            if (!this.world || !this.world.keyboard) return;
            if (this.onDeath()) return;
            if (this.handleStateAnimations()) return;
            if (this.crossBowShooting()) return;
            this.animateWalk();
        }, 100);
    }

    horizontalMovementRight() {
        if (this.world.keyboard.right && !this.world.keyboard.down && this.x < this.world.level.level_end_x) {
            this.moveRight();
        }
    }

    horizontalMovementLeft() {
        if (this.world.keyboard.left && this.x > -425 && !this.world.keyboard.down) {
            this.moveLeft();
            this.otherDirection = true;
        }
    }

    verticalHorizontal() {
        if (this.world.keyboard.up && !this.isAboveGround()) {
            this.jump();
            this.world.sound.jumpSound();
        }
        if (!this.isAboveGround() && this.wasAboveGround) {
            this.world.sound.jumpGroundSound();
        }
        this.wasAboveGround = this.isAboveGround();
    }

    onDeath() {
        if (this.isDead()) {
            if (!this.deathResetDone) {
                this.currentImage = 0;
                this.deathResetDone = true;
                this.world.sound.deadSound();
            }
            this.playAnimation(this.IMAGES_DEAD);
            if (this.currentImage >= this.IMAGES_DEAD.length) {
                clearInterval(this.characterAnimationInterval);
            }
            return true;
        }
        return false;
    }

    handleStateAnimations() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            return true;
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
            return true;
        } else if (this.world.keyboard.attack) {
            this.playAnimation(this.IMAGES_ATTACK);
            return true;
        } else if (this.world.keyboard.down) {
            this.playAnimation(this.IMAGES_PROTECTION);
            return true;
        }
        return false;
    }

    crossBowShooting() {
        if (this.world.keyboard.shoot_crossbow) {
            if (!this.lastShootTime) this.lastShootTime = 0;
            let now = new Date().getTime();
            if (now - this.lastShootTime > 250) {
                this.playAnimation(this.IMAGES_SHOOT);
                this.lastShootTime = now;
                this.world.sound.loadingCrossbowSound();
            } else {
                let i = this.currentImage % this.IMAGES_SHOOT.length;
                this.loadImage(this.IMAGES_SHOOT[i]);
            }
            return true;
        }
        return false;
    }

    animateWalk() {
        if (this.world.keyboard.right || this.world.keyboard.left) {
            this.playAnimation(this.IMAGES_WALKING);
            if (this.currentImage % 2 === 0) {
                this.world.sound.playNextStep();
            }
        } else {
            this.world.sound.stopSteps();
        }
    }

    getAttackDimensions(file, data) {
        let i = this.currentImage % this.IMAGES_ATTACK.length;
        if (i === 0) { data.w = 140; data.h = 130; data.y = this.y + 5; }
        else if (i === 2) { data.w = 120; data.h = 180; data.y = this.y - 45; }
        else if (i === 3) { data.w = 120; data.h = 125; data.y = this.y + 10; }
        else if (i === 1) { data.w = 120; data.h = 130; data.y = this.y + 5; }
        data.x = this.x - ((data.w - this.width) / 2);
    }
}
