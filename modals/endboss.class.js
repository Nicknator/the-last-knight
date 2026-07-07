class Endboss extends Movableobject {
    height= 400;
    width= 500;
    y=-30



    IMAGES_WALKING = [
        'img/4_enemie_boss/3_fly/flying-dragon1.png',
        'img/4_enemie_boss/3_fly/flying-dragon2.png',
        'img/4_enemie_boss/3_fly/flying-dragon3.png',
        'img/4_enemie_boss/3_fly/flying-dragon4.png',

    ]

    constructor() {
        super()
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 1800;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

}