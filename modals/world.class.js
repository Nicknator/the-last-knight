class World {
    arrowKey = {}

    character = new Character();

    enemies = [
        new SkeletonEnemy(300),
        new SkeletonEnemy(350),
        new SkeletonEnemy(450),
    ];

    clouds = [
        new Cloud(),
    ]

    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0)
    ]

    //  backgroundImg = new Image();





    ctx;
    canvas;
    constructor(canvas) {

        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';

        // this.backgroundImg.src = 'img/5_background/winter-location.png';


        window.addEventListener("keydown", (e) => {
            this.arrowKey[e.key] = true;
        });

        window.addEventListener("keyup", (e) => {
            this.arrowKey[e.key] = false;
        });

        this.draw();
    }






    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // if( this.backgroundImg.complete){
        //     this.ctx.drawImage(this.backgroundImg, 0, 0, 720, 480);
        // }

        const speed = this.character.speed || 5;
        if (this.arrowKey["ArrowLeft"]) this.character.x -= speed;
        if (this.arrowKey["ArrowRight"]) this.character.x += speed;


        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.backgroundObjects);



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
            if (object.constructor.name === 'Cloud') {
                object.animate();
            }
            this.addToMap(object);
        });
    }



}

