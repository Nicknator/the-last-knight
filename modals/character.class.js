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

    world;


    constructor() {
        super(); // Aktiviert Movableobject
        this.loadImage('img/2.character/walk/knight-idle-frame.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
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
            if (this.world.keyboard.up && !this.isAboveGround() ) {
                this.jump();

            }

            this.world.camera_x = -this.x + 280
        }, 1000 / 60)

        setInterval(() => {
            if (!this.world || !this.world.keyboard) return;

            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }

            else {


                if (this.world.keyboard.right || this.world.keyboard.left) {
                    this.playAnimation(this.IMAGES_WALKING);
                }

            }
            




        }, 70); // 150ms sorgt für eine wunderschöne, flüssige Bewegung!
    }

    jump() {

        if (!this.isAboveGround()) {
            this.speedY = 25;
        }
    }

}
