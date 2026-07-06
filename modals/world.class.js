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
        new BackgroundObject('img/5_background/winter-location.png', -720), // Links vom Start
        new BackgroundObject('img/5_background/winter-location.png', 0),    // Startbildschirm
        new BackgroundObject('img/5_background/winter-location.png', 720),  // Rechts davon
        new BackgroundObject('img/5_background/winter-location2.png', 1440), // Noch weiter rechts
        new BackgroundObject('img/5_background/winter-location.png', 2160), // Beliebig erweiterbar
    ]


    ctx;
    canvas;
    keyboard;
    camera_x = 100;
    constructor(canvas, keyboard) {


        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();

    }

    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        // if( this.backgroundImg.complete){
        //     this.ctx.drawImage(this.backgroundImg, 0, 0, 720, 480);
        // }

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

        this.ctx.translate(-this.camera_x, 0);





        self = this;
        requestAnimationFrame(function () {
            self.draw();

        })// bind(this)); statt self = this geht auch.

    }




    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);


        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }



    addObjectsToMap(objects) {
        objects.forEach((object) => {


            this.addToMap(object);
        });
    }



}

