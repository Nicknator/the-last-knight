class Cloud extends Movableobject {
    y = 1;

    constructor() {
        super();
        this.loadImage('img/5_background/layers/cloud/1.png');
        this.x = Math.random() * 720;
        this.width = 120;
        this.height = 50;
        this.animate();
    }




animate(){ 
    setInterval(() => {
        if(this.x < -this.width){
            this.x = 720;
        }
        this.x -= 0.1;
    }, 1000 / 60);
}







}