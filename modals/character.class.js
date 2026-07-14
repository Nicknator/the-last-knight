class Character extends Movableobject {
    y = 220; // Schön auf den braunen Weg angepasst

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

    world;

    constructor() {
        super(); // Aktiviert Movableobject
        this.loadImage('img/2.character/walk/knight-idle-frame.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.speed = 5;
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.world || !this.world.keyboard) return;

            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                this.moveRight();
            }
            if (this.world.keyboard.left && this.x > -425) {
                this.moveLeft();
                this.otherDirection = true;
            }
            if (this.world.keyboard.up && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 280
        }, 1000 / 60)


              // Oben im Constructor oder direkt hier merken wir uns, ob der Reset schon durch ist
        this.deathResetDone = false;

        this.characterAnimationInterval = setInterval(() => {
            if (!this.world || !this.world.keyboard) return;

            if (this.isDead()) {
                if (!this.deathResetDone) {
                    this.currentImage = 0; 
                    this.deathResetDone = true; // Riegel vorschieben, damit das Laufen vorher nicht gestört wird!
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
            else {
                if (this.world.keyboard.right || this.world.keyboard.left) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 70);
    }

    
    jump() {

        if (!this.isAboveGround()) {
            this.speedY = 25;
        }
    }




}
