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
    acceleration = 2.4;

    applyGravity() {
        setInterval(() => {
            // Wenn er in der Luft ist: Physik berechnen!
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                console.log(this.y);
            } else {
                // 💡 DIE RETTUNG: Wenn er den Boden berührt oder durchbricht...
                this.y = 320;      // 1. Drücke ihn fest auf den Boden
                this.speedY = 0;   // 2. Lösche die Fallgeschwindigkeit, damit er wieder bereit zum Springen ist!
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 320
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
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCashe[path];
        this.currentImage++;
    }
}



