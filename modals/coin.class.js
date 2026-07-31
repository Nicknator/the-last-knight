class Coin extends Movableobject {

    constructor() {
        super();
        this.loadImage("img/coin/coin.png");
        this.y = 380;
        this.width = 30;
        this.height = 30;
        this.x = 800 + Math.random() * 600;
    }


}