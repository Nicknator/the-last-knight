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
        this.level.enemies.forEach(enemy => enemy.world = this);
        if (this.endboss) this.endboss.world = this;
        this.sound.iceWindSound();
        setInterval(() => {
            if (Math.random() < 0.2) this.sound.glaciersBreakingSound();
        }, 10000);
    }

    run() {
        setInterval(() => {
            this.checkCharacterCollisions();
            this.checkCrossbowAttack();
            this.checkAmmoPickups();
            this.checkCoinCollisions();
            this.dragonFireAttack();
        }, 200);

        setInterval(() => {
            this.checkBoltCollisions();
            this.simulateFireParticles();
        }, 1000 / 60);
    }


    // Graphics and drawing pipeline


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.drawGameObjects();
        this.ctx.restore();
        this.drawStatusBars();
        let self = this;
        requestAnimationFrame(() => self.draw());
    }

    drawGameObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.lootBolts);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.fireParticles.forEach(particle => particle.draw(this.ctx));
        this.addObjectsToMap(this.flyBolt);
    }

    drawStatusBars() {
        this.addToMap(this.healthStatusbar);
        this.addToMap(this.ammoStatusbar);
        this.addToMap(this.coinStatusbar);
    }

    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        mo.showDrawFrame(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
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
        objects.forEach((object) => this.addToMap(object));
    }


    // Chracter-logic, attack & collisions


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

    checkCharacterCollisions() {
        if (this.character.energy === 0) return this.handleCharacterDeath();
        this.level.enemies.forEach((enemy) => {
            if (enemy.energy > 0) {
                this.checkEnemyCombat(enemy);
                enemy.otherDirection = this.character.x > enemy.x;
            }
        });
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.isDeadAnimationFinished);
    }


    handleCharacterDeath() {
        this.letEnemiesWalkPast();
        this.sound.deadSound();
        showGameOverScreen();
    }

    checkEnemyCombat(enemy) {
        if (enemy instanceof Endboss) {
            this.checkEndbossMelee(enemy);
        } else if (this.character.isColliding(enemy)) {
            this.handleRegularEnemyCollision(enemy);
        } else {
            enemy.isAttacking = false;
        }
    }

    checkEndbossMelee(enemy) {
        let xDistance = Math.abs(this.character.x - enemy.x);
        if (enemy.y === 50 && xDistance < 200 && this.keyboard.attack && enemy.energy > 0) {
            enemy.hit(30);
            this.sound.attackSound();
        }
    }

    handleRegularEnemyCollision(enemy) {
        if (this.keyboard.attack && enemy.energy > 0) {
            enemy.hit(30);
            this.sound.attackSound();
            this.sound.skeletonHurtSound();
        } else if (enemy.energy > 0) {
            this.handleEnemyAttack(enemy);
        } else {
            enemy.isAttacking = false;
        }
    }

    handleEnemyAttack(enemy) {
        enemy.isAttacking = true;
        let frame = enemy.currentImage % enemy.IMAGES_ATTACK.length;
        if (frame === 0) enemy.damageDealt = false;
        if (frame === 2 && !enemy.damageDealt && this.character.isColliding(enemy)) {
            if (this.keyboard.down && this.character.otherDirection == enemy.otherDirection) {
                this.sound.shieldBlockSound();
            } else if (!this.character.isHurt()) {
                this.character.hit(10);
                this.healthStatusbar.setPercentage(this.character.energy);
                this.sound.attackFromEnemySound();
            } enemy.damageDealt = true;
        }
    }




    letEnemiesWalkPast() {
        this.level.enemies.forEach((enemy) => enemy.isAttacking = false);
    }

    // projectile logic (crossbow bolts & fire)

    checkBoltCollisions() {
        this.flyBolt.forEach((bolt) => {
            this.level.enemies.forEach((enemy) => {
                if (bolt.isColliding(enemy)) this.handleBoltHit(bolt, enemy);
            });
        });
        this.flyBolt = this.flyBolt.filter(bolt => !bolt.isDead);
    }

    handleBoltHit(bolt, enemy) {
        if (enemy.energy > 0) {
            if (enemy instanceof Endboss) {
                enemy.hit(10);
                this.sound.boltHitSound();
            } else {
                enemy.hit(30);
                this.sound.boltHitSound();
                this.sound.skeletonHurtSound();
            }
            bolt.isDead = true;
        }
    }

    dragonFireAttack() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.energy > 0) {
                enemy.checkPlayerDistance(this.character.x);
            }
        });
    }

    simulateFireParticles() {
        let bossAttacking = this.spawnBossParticles();
        this.updateAndCheckParticles();
        this.fireParticles = bossAttacking ? this.fireParticles.filter(p => p.life > 0) : [];
    }

    spawnBossParticles() {
        let bossIsAttacking = false;
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.isAttacking) {
                bossIsAttacking = true;
                for (let i = 0; i < 6; i++) this.fireParticles.push(new FireParticle(enemy));
            }
        });
        return bossIsAttacking;
    }

    updateAndCheckParticles() {
        this.fireParticles.forEach((particle) => {
            particle.update();
            let dist = Math.abs(particle.x - this.character.x);
            if (dist < 40 && particle.y > this.character.y && particle.y < this.character.y + this.character.height && !this.character.isHurt()) {
                this.character.hit(3);
                this.healthStatusbar.setPercentage(this.character.energy);
            }
        });
    }

    // Loot Logic (Coins & Items)
    
    checkAmmoPickups() {
        this.level.lootBolts.forEach((boltItem) => {
            if (this.character.isColliding(boltItem) && this.character.ammo < 5) {
                this.character.ammo++;
                this.ammoStatusbar.setPercentage(this.character.ammo * 20);
                let index = this.level.lootBolts.indexOf(boltItem);
                if (index > -1) {
                    this.level.lootBolts.splice(index, 1);
                    this.sound.lootBoltSound();
                }
            }
        });
    }

    checkCoinCollisions() {
        this.level.coins.forEach((coinItem) => {
            if (this.character.isColliding(coinItem) && this.character.coins < 5) {
                this.character.coins++;
                this.coinStatusbar.setPercentage(this.character.coins * 20);
                let index = this.level.coins.indexOf(coinItem);
                if (index > -1) {
                    this.level.coins.splice(index, 1);
                    this.sound.lootCoinSound();
                }
            }
        });
    }
}
