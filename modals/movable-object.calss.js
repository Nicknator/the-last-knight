class Movableobject {
    x = 0;
    y = 320;
    width = 100;
    height = 150;
    img;
    imageCashe = {};
    currentImage = 0;
    speed = 0.15
    enemySpeed = 0.15
    otherDirection = false;
    speedY = 0;
    acceleration = 2.4;
    energy = 100;
    lastHit = 0;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    }

    showDrawFrame(ctx) {
        if (this instanceof Character || this instanceof SkeletonEnemy || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "red";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }





    constructor(startX) {
        if (startX !== undefined) {
            this.x = startX;
        }
    }



    moveRight() {
        console.log('Moving right');
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft() {
        this.x -= this.speed;

    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCashe[path];
        this.currentImage++;
    }


    // Ritter.isColliding(enemy)
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 10;
        console.log("damage");
        if (this.energy <= 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime()- this.lastHit;
        timepassed = timepassed/1000;
        return timepassed < 0.2;
    }



    isDead() {
        return this.energy == 0;

    }







}




