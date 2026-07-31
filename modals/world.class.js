class World {
    character = new Character();
    healthStatusbar = new StatusbarHealth();
    ammoStatusbar = new StatusbarAMMO();
    coinStatusbar = new StatusbarCoin();


    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 100;
    flyBolt = [];
    lastShotImageNumber = -1;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCharacterCollisions();
            this.checkCrossbowAttack();
            this.checkSwordAttack();
            this.checkAmmoPickups();
            this.checkCoinCollisions();
        }, 200);

        setInterval(() => {
            this.checkBoltCollisions();
        }, 1000 / 60);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.lootBolts);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.flyBolt);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthStatusbar);
        this.addToMap(this.ammoStatusbar);
        this.addToMap(this.coinStatusbar);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
        
    }

    checkCrossbowAttack() {
        let i = this.character.currentImage % this.character.IMAGES_SHOOT.length;
        if (this.keyboard.shoot_crossbow && i === 2 && this.character.currentImage !== this.lastShotImageNumber && this.character.ammo > 0) {
            this.spawnBoltProjectile();
        }
    }

    spawnBoltProjectile() {
        let dx = this.character.otherDirection ? -30 : 80;
        this.flyBolt.push(new Bolt(this.character.x + dx, this.character.y + 45, this.character.otherDirection));
        this.lastShotImageNumber = this.character.currentImage;
        this.character.ammo--;

        this.ammoStatusbar.setPercentage(this.character.ammo * 20);
    }


    checkSwordAttack() {
        if (this.keyboard.attack) {
            console.log("Schwert-Angriff ausgeführt!");
            //Sound hier rein
        }
    }

    checkCharacterCollisions() {
        if (this.character.energy === 0) {
            this.letEnemiesWalkPast();
            return;
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
    }

    checkAmmoPickups() {
        this.level.lootBolts.forEach((boltItem) => {
            if (this.character.isColliding(boltItem)) {
                // console.log("colliding");
                this.character.ammo++;
                this.ammoStatusbar.setPercentage(this.character.ammo * 20);

                let index = this.level.lootBolts.indexOf(boltItem);
                if (index > -1) {
                    this.level.lootBolts.splice(index, 1);
                    // console.log("Ammo gelöscht!");
                }
            }
        });
    }


    checkCoinCollisions(){
        this.level.coins.forEach((coinItem)=>{
            if(this.character.isColliding(coinItem) && this.character.coins < 5){
                console.log("Coin looting");
                this.character.coins++;
                console.log(this.character.coins);

                this.coinStatusbar.setPercentage(this.character.coins * 20);

                let index = this.level.coins.indexOf(coinItem);
                if (index > -1) {
                    this.level.coins.splice(index, 1);
                    
                }

            }
        });
    }



    checkBoltCollisions() {
        this.flyBolt.forEach((bolt) => {
            this.level.enemies.forEach((enemy) => {
                if (bolt.isColliding(enemy)) {
                    this.attackEnemy(enemy, 30);
                    bolt.isDead = true;
                }
            });
        });
        this.flyBolt = this.flyBolt.filter(bolt => !bolt.isDead);
    }


    addToMap(mo) {
        if (mo.otherDirection) { this.flipImage(mo); }
        mo.draw(this.ctx);
        mo.showDrawFrame(this.ctx);
        if (mo.otherDirection) { this.flipImageBack(mo); }
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
        objects.forEach((object) => { this.addToMap(object); });
    }

    letEnemiesWalkPast() {
        this.level.enemies.forEach((enemy) => { enemy.isAttacking = false; });
    }

    handleEnemyAttack(enemy) {
        enemy.isAttacking = true;
        if (this.keyboard.down) {
            console.log("Schieldblock");
        } else {
            this.character.hit(5);
            this.healthStatusbar.setPercentage(this.character.energy);
        }
    }

    attackEnemy(enemy, damageAmount) {
        if (enemy.energy <= 0) return;

        enemy.hit(damageAmount);
        console.log("Enemy Energie:", enemy.energy);
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
}
