class Movableobject extends DrawableObject {
    speed = 0.15
    enemySpeed = 0.15
    otherDirection = false;
    speedY = 0;
    acceleration = 2.4;
    energy = 100;
    lastHit = 0;
    boltSpeed=20;
    

    applyGravity() {
        setInterval(() => {

            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.y = 320;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    
    isAboveGround() {
        return this.y < 320
    }

    animate() {
        this.x -= this.speed;
    }


    moveRight() {
        // console.log('Moving right');
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {

        if (!this.isAboveGround()) {
            this.speedY = 30;
        }
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    
    // Knight.isColliding(enemy)
    isColliding(mo) {
        if (this.otherDirection) {
            let abstandX = Math.abs(this.x - mo.x);
            return abstandX < (this.width + mo.width) / 2 && // Horizontal nah genug?
                this.y + this.height > mo.y &&
                this.y < mo.y + mo.height;
        }
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }


    hit(damageAmount) {
        this.energy -= damageAmount;    
        if (this.energy <= 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 500;
        return timepassed < 0.2;
    }


    isDead() {
        return this.energy === 0;
    }
    
















}




