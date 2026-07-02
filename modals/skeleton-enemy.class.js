class SkeletonEnemy extends Movableobject {
    y = 245;
    
    constructor(startX) {
        
        super(startX); 
        
      
        this.loadImage('img/3_enemies_skeleton/2.walk/skeleton-walk-frame1.png');

        this.x = 200 + Math.random() * 400;

        
    }
}
