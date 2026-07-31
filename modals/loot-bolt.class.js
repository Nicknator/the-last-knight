class LootBolt extends Movableobject {

    constructor() {
        super();
        this.loadImage('img/2.character/shoot_crossbow/bolt.png');
       
        this.y =400;
        this.width = 30;
        this.height = 20;
        this.x = 200 + Math.random() * 600;
    }

  
}