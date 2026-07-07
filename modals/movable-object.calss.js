class Movableobject {
    x = 0;
    y = 320;
    width = 100;
    height = 150;
    img;
    imageCashe = {};
    currentImage = 0;
    speed = 0.05
    enemySpeed = 0.15
    otherDirection = false;
    speedY = 0;
    acceleration = 1;

    applyGravity() {
        setInterval(() => {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25);
    }

    animate() {
        this.x -= this.speed;
    }

    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image();  // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCashe[path] = img;
        });
    }

    constructor(startX) {
        if (startX !== undefined) {
            this.x = startX;
        }

    }



    moveRight() {
        console.log('Moving right');
    }


    moveLeft() {
        setInterval(() => {

            this.x -= this.enemySpeed;
        }, 1000 / 60);


    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCashe[path];
        this.currentImage++;
    }




}



