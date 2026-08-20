class Movableobject extends DrawableObject {
    speed = 0.15
    enemySpeed = 0.15
    otherDirection = false;
    speedY = 0;
    acceleration = 2.4;
    energy = 100;
    lastHit = 0;
    boltSpeed = 20;


    /**
    * Applies gravitational acceleration forces by calculating vertical position changes over time intervals.
    */
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

    /**
    * Determines if the object is currently positioned above the base ground coordinate line.
    * @returns {boolean} True if the current Y-coordinate is less than the ground level.
    */
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
    /**
     * Analyzes boundary cross-overs to determine if an actively tracking entity collides with another element.
     * @param {MovableObject} mo - The target object bounding box framework to verify overlaps against.
     * @returns {boolean} True if structural coordinate intersections are registered.
     */
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

    /**
    * Reduces active vitality quantities and logs precise timing stamps for invulnerability calculations.
    * @param {number} damageAmount - The numeric reduction metric subtracted upon successful impacts.
    */
    hit(damageAmount) {
        this.energy -= damageAmount;
        if (this.energy <= 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }
    /**
    * Validates if the object resides within post-impact flash time frames using timestamp differences.
    * @returns {boolean} True if the time elapsed since the last hit is under 400 milliseconds.
    */

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 400;
    }

    /**
    * Confirms whether structural vitality resources have dropped to zero boundaries.
    * @returns {boolean} True if the energy attribute has reached zero.
    */

    isDead() {
        return this.energy === 0;
    }

}




