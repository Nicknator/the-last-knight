class Character extends Movableobject {
    y = 220;
    world;

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

    ]



    IMAGES_JUMPING = [
        'img/2.character/jum/jump6.png',
        'img/2.character/jum/jump1.png',
        // 'img/2.character/jum/jump3.png',
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
        'img/2.character/shoot_crossbow/shoot1.png',
        'img/2.character/shoot_crossbow/shoot2.png',
        'img/2.character/shoot_crossbow/shoot3.png',
        'img/2.character/shoot_crossbow/shoot4.png',
    ]



    constructor() {
        super(); // Aktiviert Movableobject
        this.loadImage(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_PROTECTION);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SHOOT);
        this.speed = 5;
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.world || !this.world.keyboard) return;

            if (this.world.keyboard.right && !this.world.keyboard.down && this.x < this.world.level.level_end_x) {
                this.moveRight();
            }

            if (this.world.keyboard.left && this.x > -425 && !this.world.keyboard.down) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.up && !this.isAboveGround()) {
                this.jump();
            }

            if (this.world.keyboard.attack) {
                // this.attack();
                // console.log("zustand");
            }

            if (this.world.keyboard.down) {
                console.log("Block");
            }

            if (this.world.keyboard.shoot_crossbow) {
                // console.log("shoot");

            }

            this.world.camera_x = -this.x + 280
        }, 1000 / 60)


        this.deathResetDone = false;

        this.characterAnimationInterval = setInterval(() => {
            if (!this.world || !this.world.keyboard) return;

            if (this.isDead()) {
                if (!this.deathResetDone) {
                    this.currentImage = 0;
                    this.deathResetDone = true;
                }

                this.playAnimation(this.IMAGES_DEAD);

                if (this.currentImage >= this.IMAGES_DEAD.length) {
                    clearInterval(this.characterAnimationInterval);
                    console.log("Ritter liegt komplett flach. Animation gestoppt.");
                }

                return;
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);

            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
            else if (this.world.keyboard.attack) {
                this.playAnimation(this.IMAGES_ATTACK);
                console.log("attack")
            }

            else if (this.world.keyboard.down) {
                this.playAnimation(this.IMAGES_PROTECTION);
            }
            

            else if (this.world.keyboard.shoot_crossbow) {
                if (!this.lastShootTime) this.lastShootTime = 0;
                let now = new Date().getTime();

                if (now - this.lastShootTime > 250) {
                    this.playAnimation(this.IMAGES_SHOOT);
                    this.lastShootTime = now;
                } else {
                    let i = this.currentImage % this.IMAGES_SHOOT.length;
                    this.loadImage(this.IMAGES_SHOOT[i]);
                }
            }


            else {
                if (this.world.keyboard.right || this.world.keyboard.left) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 70);
    }



    // getAttackDimensions(file, data) {
    //     if (file === 'attack1.png') { data.w = 120; data.h = 130; data.y = this.y + 5; }
    //     else if (file === 'attack2.png') { data.w = 120; data.h = 180; data.y = this.y - 45; }
    //     else if (file === 'attack3.png') { data.w = 120; data.h = 125; data.y = this.y + 10; }
    //     else if (file === 'attack4.png') { data.w = 140; data.h = 130; data.y = this.y + 5; }
    //     data.x = this.x - ((data.w - this.width) / 2);
    // }



    getAttackDimensions(file, data) {
        let i = this.currentImage % this.IMAGES_ATTACK.length;
        if (i === 0) { data.w = 140; data.h = 130; data.y = this.y + 5; }  //0
        else if (i === 2) { data.w = 120; data.h = 180; data.y = this.y - 45; }
        else if (i === 3) { data.w = 120; data.h = 125; data.y = this.y + 10; }
        else if (i === 1) { data.w = 120; data.h = 130; data.y = this.y + 5; }
        data.x = this.x - ((data.w - this.width) / 2);
    }






}
