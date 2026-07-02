class BackgroundObject extends Movableobject {
    width = 720;
    height = 120;
    

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
        
    }

    
    

      
}