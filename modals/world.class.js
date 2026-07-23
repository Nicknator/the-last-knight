class World {

    character = new Character();
    statusbar = new Statusbar(this.character);
    level = level1;
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
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);

        self = this;
        requestAnimationFrame(function () {
            self.draw();
        })// bind(this)); statt self = this geht auch.


    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.showDrawFrame(this.ctx)
        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }


    letEnemiesWalkPast() {
        this.level.enemies.forEach((enemy) => {
            enemy.isAttacking = false;
        });
    }


    handleEnemyAttack(enemy) {
        enemy.isAttacking = true;
        if (this.keyboard.down) { console.log("Schieldblock"); }
        else {
            this.character.hit(5);
            this.statusbar.setPercentage(this.character.energy);
            // console.log("Collsion with Character, energy", this.character.energy);
        }
    }

    attackEnemy(enemy) {
        enemy.hit(30);
        console.log("Skelett Energie:", enemy.energy);

        if (enemy.energy === 0) {
            let index = this.level.enemies.indexOf(enemy);
            setTimeout(() => {
                this.level.enemies.splice(index, 1);
            }, 1000);
        }
    }




    checkCollisions() {
        setInterval(() => {
            if (this.character.energy === 0) {
                this.letEnemiesWalkPast(); return;
            }
            this.level.enemies.forEach((enemy) => {

                if (this.character.isColliding(enemy) && this.keyboard.attack) {
                    this.attackEnemy(enemy);
                }

                else if (this.character.isColliding(enemy)) {
                    this.handleEnemyAttack(enemy);
                }
                else {
                    enemy.isAttacking = false;
                }

                if (this.character.x > enemy.x) {
                    enemy.otherDirection = true;
                }
                else {
                    enemy.otherDirection = false;
                }
            });

        }, 300);
    }








}

