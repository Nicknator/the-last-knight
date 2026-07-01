class Cloud extends Movableobject {
    y = 20;

    constructor() {
        super();

        this.loadImage('img/5_background/layers/cloud/1.png');

        this.x = Math.random() * 500;

        this.width = 400;
        this.height = 150;
        this.speed = 0.1;

     


    }

       animate(){
            this.x -= this.speed;

        }
}