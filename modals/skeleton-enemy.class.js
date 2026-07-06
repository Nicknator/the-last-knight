class SkeletonEnemy extends Movableobject {
    y = 320;
  
    IMAGES_WALKING = [
        'img/3_enemies_skeleton/2.walk/skeleton-walk-frame1.png',
        'img/3_enemies_skeleton/2.walk/skeleton-walk-frame2.png',
        // 'img/3_enemies_skeleton/2.walk/skeleton-walk-frame3.png',
        'img/3_enemies_skeleton/2.walk/skeleton-walk-frame4.png',
        // 'img/3_enemies_skeleton/2.walk/skeleton-walk-frame5.png',
        'img/3_enemies_skeleton/2.walk/skeleton-walk-frame6.png',

    ];


    constructor(startX) {
        super(startX);
        this.loadImage('img/3_enemies_skeleton/2.walk/skeleton-walk-frame1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.moveLeft();
        this.x = 200 + Math.random() * 400;

        this.enemySpeed= 0.05+ Math.random() *0.25
    }


    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCashe[path];


            this.currentImage++;
        }, 500);
    }





}
