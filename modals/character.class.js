class Character extends Movableobject {
    y = 320; // Schön auf den braunen Weg angepasst

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
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.world || !this.world.keyboard) return;

            if (this.world.keyboard.right) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.world.keyboard.left) {
                this.x -= this.speed;
                this.otherDirection= true;

            }this.world.camera_x= -this.x
        }, 1000 / 60)

        setInterval(() => {
            if (!this.world || !this.world.keyboard) return;

            if (this.world.keyboard.right ||world.keyboard.left ) {

                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCashe[path];
                this.currentImage++;
            }

        }, 100); // 150ms sorgt für eine wunderschöne, flüssige Bewegung!
    }

    jump() {
        // Schwerkraft kommt hier später rein
    }
}
