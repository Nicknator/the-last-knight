class SkeletonEnemy extends Movableobject {
    y = 320;

    IMAGES_IDLE = [
        'img/3_enemies_skeleton/2.walk/skeleton-walk-frame1.png'
    ];



    IMAGES_WALKING = [
        'img/3_enemies_skeleton/2.walk/skeleton-walk-frame1.png',
        'img/3_enemies_skeleton/2.walk/skeleton-walk-frame2.png',
        // 'img/3_enemies_skeleton/2.walk/skeleton-walk-frame3.png',
        'img/3_enemies_skeleton/2.walk/skeleton-walk-frame4.png',
        // 'img/3_enemies_skeleton/2.walk/skeleton-walk-frame5.png',
        'img/3_enemies_skeleton/2.walk/skeleton-walk-frame6.png',

    ];

    IMAGES_ATTACK = [
        // 'img/3_enemies_skeleton/3.attack/skeleton-attack3.png',
        'img/3_enemies_skeleton/3.attack/skeleton-attack1.png',
        'img/3_enemies_skeleton/3.attack/skeleton-attack2.png',
        'img/3_enemies_skeleton/3.attack/skeleton-attack3.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_skeleton/4.dead/dead1.png',
        'img/3_enemies_skeleton/4.dead/dead2.png',
    ]


    constructor(startX) {
        super(startX);
        this.loadImage(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.moveLeft();
        this.x = 200 + Math.random() * 600;
        this.enemySpeed = 0.05 + Math.random() * 0.25
        this.energy = 90;
        // console.log(this.energy);
    }

    animate() {
        setInterval(() => {
            if (this.isAttacking === true && this.energy >0) {
                this.playAnimation(this.IMAGES_ATTACK);
            }

        }, 200);


        setInterval(() => {

          if(this.energy==0){
            this.playAnimation(this.IMAGES_DEAD);
          }

            if (this.isAttacking === false) {
                this.playAnimation(this.IMAGES_WALKING);

                if (this.otherDirection == true) {
                    this.x += this.enemySpeed * 30;
                }
                else {
                    this.x -= this.enemySpeed * 30;
                }
            }

        }, 500);



    }




}
