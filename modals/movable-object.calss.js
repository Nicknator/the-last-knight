class Movableobject {
    x = 0;
    y = 320;
    width= 100;
    height = 150;
    img;

    speed = 0.5;

    animate(){
        this.x -= this.speed;
    }

    // loadImage('img/test.png');
    loadImage(path){
        this.img = new Image();  // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
        
        
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
        
        

    }
    
}



