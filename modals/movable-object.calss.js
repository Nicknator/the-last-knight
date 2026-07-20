class Movableobject extends DrawableObject  {
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
                // console.log(this.y);
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

  
    moveRight() {
        // console.log('Moving right');
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft() {
        this.x -= this.speed;
    }

    attack(){
        
        

    }




     jump() {

        if (!this.isAboveGround()) {
            this.speedY = 25;
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
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
        this.energy -= 20;
        // console.log("damage");
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




