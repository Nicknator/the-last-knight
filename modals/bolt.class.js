class Bolt extends Movableobject {

    /**
     * Creates a new traveling crossbow bolt projectile instance.
     * @param {number} startX - The horizontal initial spawn coordinate.
     * @param {number} startY - The vertical initial spawn coordinate.
     * @param {boolean} shootLeft - Flag indicating if the projectile travels leftwards.
     */
    constructor(startX, startY, shootLeft) { 
        super();
        this.loadImage('img/2.character/shoot_crossbow/bolt.png');
        this.x = startX; 
        this.y = startY; 
        this.width = 30;
        this.height = 10;
        this.animate();
        this.otherDirection = shootLeft; 
        this.isDead = false; 
    }

    /**
     * Starts the ballistic movement rendering interval, driving coordinates horizontally based on direction flags.
     */
    animate() {
        setInterval(() => {
            if(this.otherDirection === false){
                 this.x += this.boltSpeed; 
            }
            else{
                this.x -= this.boltSpeed;      
            }
        }, 1000 / 60);
    }
}
