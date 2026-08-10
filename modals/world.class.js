class World {
    character = new Character();
    healthStatusbar = new StatusbarHealth();
    ammoStatusbar = new StatusbarAMMO();
    coinStatusbar = new StatusbarCoin();
    sound = new Sound();
    enemyProjectiles = [];


    fireParticles = [];

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
            this.dragonFireAttack();

        }, 200);

        setInterval(() => {
            this.checkBoltCollisions();
            this.simulateFireParticles();
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
        this.fireParticles.forEach(particle => particle.draw(this.ctx));

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


    dragonFireAttack() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.energy > 0) {
                enemy.checkPlayerDistance(this.character.x);
            }
        });
    }

    simulateFireParticles() {
        let bossIsAttacking = false;

        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.isAttacking) {
                bossIsAttacking = true;
                for (let i = 0; i < 6; i++) {
                    this.fireParticles.push(new FireParticle(enemy));
                }
            }
        });

        this.fireParticles.forEach((particle) => {
            particle.update();

            let distToCharacter = Math.abs(particle.x - this.character.x);
            if (distToCharacter < 40 && particle.y > this.character.y && particle.y < this.character.y + this.character.height && !this.character.isHurt()) {
                this.character.hit(1);
                this.healthStatusbar.setPercentage(this.character.energy);
            }
        });

        if (bossIsAttacking) {
            this.fireParticles = this.fireParticles.filter(p => p.life > 0);
        } else {
            this.fireParticles = [];
        }
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
        }
    }

    checkCharacterCollisions() {
        if (this.character.energy === 0) {
            this.letEnemiesWalkPast();
            this.sound.deadSound();
            return;
        }
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                let xDistance = Math.abs(this.character.x - enemy.x);
                if (enemy.y === 50 && xDistance < 200 && this.keyboard.attack) {
                    this.attackEnemy(enemy, 30);
                    this.sound.attackSound();
                }
            }
            else if (this.character.isColliding(enemy)) {
                if (this.keyboard.attack) {
                    if (enemy.energy > 0) {
                        this.attackEnemy(enemy, 30);
                        this.sound.attackSound();
                    }
                } else {
                    this.handleEnemyAttack(enemy);
                }
            } else {
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
                this.character.ammo++;
                this.ammoStatusbar.setPercentage(this.character.ammo * 20);
                let index = this.level.lootBolts.indexOf(boltItem);
                if (index > -1) {
                    this.level.lootBolts.splice(index, 1);
                }
            }
        });
    }


    checkCoinCollisions() {
        this.level.coins.forEach((coinItem) => {
            if (this.character.isColliding(coinItem) && this.character.coins < 5) {
                console.log("Coin looting");
                this.character.coins++;
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
                    if (enemy instanceof Endboss) {
                        enemy.hit(20);
                        this.sound.boltHitSound();
                        bolt.isDead = true;
                    } else {
                        this.attackEnemy(enemy, 30);
                        this.sound.boltHitSound();
                        bolt.isDead = true;
                    }
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
        let currentAttackFrame = enemy.currentImage % enemy.IMAGES_ATTACK.length;
        if (currentAttackFrame === 0) {
            enemy.damageDealt = false;
        }
        if (currentAttackFrame === 2 && !enemy.damageDealt) {
            
            if (this.keyboard.down && this.character.isColliding(enemy)) {
                this.sound.shieldBlockSound();
                console.log("Schildblock!");
                enemy.damageDealt = true; 
            }
            else if (this.character.isColliding(enemy)) {
                this.character.hit(5);
                this.healthStatusbar.setPercentage(this.character.energy);
                this.sound.attackFromEnemySound();
                enemy.damageDealt = true; 
            }
        }
    }
 


    attackEnemy(enemy, damageAmount) {
        if (enemy.energy <= 0) return;

        if (typeof enemy.hit === 'function') {
            enemy.hit(damageAmount);
        } else {
            enemy.energy -= damageAmount;
        }

        console.log("Enemy Energie:", enemy.energy);
        if (enemy.energy === 0) {
            setTimeout(() => {
                let index = this.level.enemies.indexOf(enemy);
                if (index > -1) {
                    this.level.enemies.splice(index, 1);
                    console.log("Gegner endgültig aus dem Speicher gelöscht!");
                }
            }, 1000);
        }
    }
}
