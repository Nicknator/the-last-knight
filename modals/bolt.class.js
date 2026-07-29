class Bolt extends Movableobject {

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


    animate() {
        setInterval(() => {
            if(this.otherDirection === false){
                 this.x += 20; 
            }
            else{
                this.x -= 20;      
            }
           
        }, 1000 / 60);
    }
}
