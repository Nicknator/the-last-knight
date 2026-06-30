class Movableobject {
    x = 20;
    y = 100;

    width= 100;
    height = 150;

    img;
    // loadImage('img/test.png');
    loadImage(path){
        this.img = new Image();  // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
        
        
    }



    moveRight() {
        console.log('Moving right')

    }

 

    moveLeft() {

    }
}


    // width= 140;  passt
    // height = 200;