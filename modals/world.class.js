class World {

    character = new Character();
    statusbar = new Statusbar(this.character);
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 100;
    flyBolt = [];
   

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.rangedCombat(this.flyBolt);
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
        this.addObjectsToMap(this.flyBolt);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        })// bind(this)); statt self = this geht auch.
    }

    rangedCombat() {
        this.lastShotImageNumber = -1;
        setInterval(() => {
            let i = this.character.currentImage % this.character.IMAGES_SHOOT.length;
            if (this.keyboard.shoot_crossbow && i === 2 && this.character.currentImage !== this.lastShotImageNumber) {
                this.helbRangedCombatFunction();
            }
        }, 100);
    }

    helbRangedCombatFunction() {
        let dx = this.character.otherDirection ? -30 : 80;
        this.flyBolt.push(new Bolt(this.character.x + dx, this.character.y + 45, this.character.otherDirection));
        this.lastShotImageNumber = this.character.currentImage;
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

    attackEnemy(enemy, damageAmount) {
        if (enemy.energy <= 0) return; 

        enemy.hit(damageAmount);
        console.log("Skelett Energie:", enemy.energy);
        if (enemy.energy === 0) {
            setTimeout(() => {
                let index = this.level.enemies.indexOf(enemy);
                if (index > -1) {
                    this.level.enemies.splice(index, 1);
                    console.log("Skelett endgültig aus dem Speicher gelöscht!");
                }
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
                    this.attackEnemy(enemy, 30);
                }
                else if (this.character.isColliding(enemy)) {
                    this.handleEnemyAttack(enemy);
                }
                else {
                    enemy.isAttacking = false;
                }

                if (this.character.x > enemy.x) {
                    enemy.otherDirection = true;
                } else {
                    enemy.otherDirection = false;
                }
            });
        }, 300);

        setInterval(() => {
            this.flyBolt.forEach((bolt) => {

                this.level.enemies.forEach((enemy) => {
                    if (bolt.isColliding(enemy) && this.keyboard.shoot_crossbow ) {
                        this.attackEnemy(enemy, 45);
                        bolt.isDead = true;
                    }
                  
                });
            });
            this.flyBolt = this.flyBolt.filter(bolt => !bolt.isDead);
        }, 1000 / 60);
    }




}

