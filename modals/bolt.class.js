class Bolt extends Movableobject {

    /**
     * Initializes a new flying bolt projectile with spawning coordinates and direction flags.
     * @param {number} startX - The initial horizontal X-axis grid coordinate on the map.
     * @param {number} startY - The initial vertical Y-axis grid coordinate on the map.
     * @param {boolean} shootLeft - True if the projectile travels towards the left direction.
     * @param {Object} world - The reference instance linking back to the central game world.
     */
    constructor(startX, startY, shootLeft, world) {
        super();
        this.loadImage('img/2.character/shoot_crossbow/bolt.png');
        this.x = startX;
        this.y = startY;
        this.width = 30;
        this.height = 10;
        this.otherDirection = shootLeft;
        this.world = world;
        this.isDead = false;
        this.isFlyingUp = false;
        this.animate();
    }

    /**
      * Starts the projectile flight physics tracking loop to calculate vector shifts and target homing.
      */
    animate() {
        setInterval(() => {
            let speedX = this.otherDirection ? -this.boltSpeed : this.boltSpeed;
            let speedY = 0;
            this.isFlyingUp = false;
            let dragon = this.world?.level?.enemies?.find(e => e.constructor.name === 'Endboss' && e.energy > 0 && Math.abs(e.x - this.x) < 500);
            if (dragon) {
                speedY = -this.boltSpeed;
                this.isFlyingUp = true;
            }
            this.x += speedX;
            this.y += speedY;
        }, 1000 / 60);
    }

    /**
     * Overrides the standard drawing method to inject an autonomous 45-degree rotation map calculation.
     * @param {CanvasRenderingContext2D} ctx - The canvas graphics engine context file.
     */
    draw(ctx) {
        if (this.isFlyingUp) {
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            ctx.rotate((this.otherDirection ? 45 : -45) * Math.PI / 180);
            ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
            super.draw(ctx);
            ctx.restore();
        } else {
            super.draw(ctx);
        }
    }
}
