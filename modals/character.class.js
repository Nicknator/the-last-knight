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
    world;
 

    constructor() {
        super(); // Aktiviert Movableobject
        this.loadImage('img/2.character/walk/knight-idle-frame.png');
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 5;
        this.applyGravity();
        this.animate();
       
    }

    animate() {
        setInterval(() => {
            if (!this.world || !this.world.keyboard) return;

            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.world.keyboard.left && this.x > -425 ) {
                this.x -= this.speed;
                this.otherDirection= true;

            }this.world.camera_x= -this.x +280
        }, 1000 / 60)

        setInterval(() => {
            if (!this.world || !this.world.keyboard) return;
            if (this.world.keyboard.right ||world.keyboard.left ) {
               this.playAnimation(this.IMAGES_WALKING);
            }

        }, 70); // 150ms sorgt für eine wunderschöne, flüssige Bewegung!
    }

     jump() {
     
        if (!this.isAboveGround()) {
            this.speedY = 25; 
        }
    }

}
