class World {

    character = new Character();

    enemies = [
        new SkeletonEnemy(300),
        new SkeletonEnemy(350),
        new SkeletonEnemy(450),
    ];

    clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ]

    backgroundObjects = [
        new BackgroundObject('img/5_background/winter-location.png', 0),
    ]

    ctx;
    canvas;
    keyboard;
    constructor(canvas,keyboard) {


        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        
    }

    setWorld(){
        this.character.world = this;
    }   


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // if( this.backgroundImg.complete){
        //     this.ctx.drawImage(this.backgroundImg, 0, 0, 720, 480);
        // }




        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);




        self = this;
        requestAnimationFrame(function () {
            self.draw();

        })// bind(this)); statt self = this geht auch.

    }



    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

    }


    addObjectsToMap(objects) {
        objects.forEach((object) => {

            this.addToMap(object);
        });
    }



}

