class World {
    arrowKey = {}

    character = new Character();

    enemies = [
        new SkeletonEnemy(300),
        new SkeletonEnemy(350),
        new SkeletonEnemy(450),
    ];

    clouds =[
        new Cloud(),
    ]


    ctx;
    canvas;
    constructor(canvas) {

        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';

        window.addEventListener("keydown", (e) => {
            this.arrowKey[e.key] = true;
        });

        window.addEventListener("keyup", (e) => {
            this.arrowKey[e.key] = false;
        });

        this.draw();
    }

    draw() {

        const speed = this.character.speed || 5;
        if (this.arrowKey["ArrowLeft"]) this.character.x -= speed;
        if (this.arrowKey["ArrowRight"]) this.character.x += speed;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);


        this.enemies.forEach((enemy) => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });


        this.enemies.forEach((enemy) => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
        


        this.clouds.forEach((cloud) => {
            cloud.animate();
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        });



        self = this;
        requestAnimationFrame(function () {
            self.draw();

        })// bind(this)); statt self = this geht auch.

    }



}

