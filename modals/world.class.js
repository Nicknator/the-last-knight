class World {
    character = new Character();
    healthStatusbar = new StatusbarHealth();
    bossStatusbar = new StatusbarHealth();
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

    /**
     * Initializes the game world and sets up the 2D rendering context.
     * @param {HTMLCanvasElement} canvas - The HTML canvas element.
     * @param {Object} keyboard - The keyboard input mapping state.
     */
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

    /**
     * Links the world reference to the active entities and triggers background ambient loops.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
        if (this.endboss) this.endboss.world = this;
        this.sound.iceWindSound();
        setInterval(() => {
            if (Math.random() < 0.2) this.sound.glaciersBreakingSound();
        }, 10000);
    }

    /**
     * Starts the central runtime intervals managing logic updates, projectile physics, and combat.
     */
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

    /**
     * Clears the game field and redraws all active game elements in the current frames.
     */
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

    /**
     * Iterates and renders the movable game entities onto the map grid layout.
     */
    drawGameObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.lootBolts);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.fireParticles.forEach(particle => particle.draw(this.ctx));
        this.addObjectsToMap(this.flyBolt);
        this.bosshealthBar();
    }

    /**
     * Updates and draws the health bar over the active endboss.
     */
    bosshealthBar() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                this.bossStatusbar.x = enemy.x + 150; 
                this.bossStatusbar.y = enemy.y + 40; 
                this.bossStatusbar.setPercentage(enemy.energy / 2);
                this.addToMap(this.bossStatusbar);
            }
        });
    }

    /**
     * Displays the graphical status bars pinned as fixed HUD items on top of the screen.
     */
    drawStatusBars() {
        this.addToMap(this.healthStatusbar);
        this.addToMap(this.ammoStatusbar);
        this.addToMap(this.coinStatusbar);
    }

    /**
     * Handles orientation mirror processing and initiates the drawing sequence of an object.
     * @param {MovableObject} mo - The target game entity to render.
     */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        mo.showDrawFrame(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    /**
     * Mirrors the canvas context state rendering calculations when entity faces leftwards.
     * @param {MovableObject} mo - The targeted active entity.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Reverts horizontal inversion configurations applied to the image layer coordinates.
     * @param {MovableObject} mo - The targeted active entity.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Maps through collection sets of map objects to execute the pipeline loop sequentially.
     * @param {Array} objects - Collection set containing active entities.
     */
    addObjectsToMap(objects) {
        objects.forEach((object) => this.addToMap(object));
    }

    /**
     * Verifies conditions required for the character to release a loaded crossbow bolt projectile.
     */
    checkCrossbowAttack() {
        let i = this.character.currentImage % this.character.IMAGES_SHOOT.length;
        if (this.keyboard.shoot_crossbow && i === 2 && this.character.currentImage !== this.lastShotImageNumber && this.character.ammo > 0) {
            this.spawnBoltProjectile();
        }
    }

    /**
     * Instantiates an active bolt item traveling based on character look direction flags.
     */
    spawnBoltProjectile() {
        let dx = this.character.otherDirection ? -30 : 80;
        this.flyBolt.push(new Bolt(this.character.x + dx, this.character.y + 45, this.character.otherDirection));
        this.lastShotImageNumber = this.character.currentImage;
        this.character.ammo--;
        this.ammoStatusbar.setPercentage(this.character.ammo * 20);
    }

    /**
 * Constantly monitors horizontal coordinate cross-overs between the character and enemy arrays.
 */
    checkCharacterCollisions() {
        if (this.character.energy === 0) return this.handleCharacterDeath();
        this.level.enemies.forEach((enemy) => {
            if (enemy.energy > 0) {
                this.checkEnemyCombat(enemy);
                if (!(enemy instanceof Endboss)) {
                    enemy.otherDirection = this.character.x > enemy.x;
                }
            }
        });
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.isDeadAnimationFinished);
    }

    /**
     * Manages character exhaustion states, plays respective defeat audio clips, and prompts HUDs.
     */
    handleCharacterDeath() {
        this.letEnemiesWalkPast();
        this.sound.deadSound();
        showGameOverScreen();
    }

    /**
     * Segregates combat behavior depending on object inheritance checking blueprints.
     * @param {MovableObject} enemy - The encountered target enemy.
     */
    checkEnemyCombat(enemy) {
        let xDistance = Math.abs(this.character.x - enemy.x);
        if (enemy instanceof Endboss) {
            this.checkEndbossMelee(enemy);
        } else if (this.keyboard.attack || this.character.isColliding(enemy) || xDistance < 130) {
            this.handleRegularEnemyCollision(enemy);
        } else {
            enemy.isAttacking = false;
        }
    }

    /**
     * Manages melee hitbox strikes registered against the boss enemy layer during active values.
     * @param {Endboss} enemy - The boss level entity.
     */
    checkEndbossMelee(enemy) {
        let xDistance = Math.abs(this.character.x - enemy.x);
        if (enemy.y === 50 && xDistance < 200 && this.keyboard.attack && enemy.energy > 0) {
            enemy.hit(30);
            this.sound.attackSound();
        }
    }

    /**
     * Settles active sword hits launched against common moving skeleton frameworks.
     * @param {MovableObject} enemy - The regular skeleton object.
     */
    handleRegularEnemyCollision(enemy) {
        let xDistance = Math.abs(this.character.x - enemy.x);
        if (this.keyboard.attack && enemy.energy > 0 && xDistance < 130) {
            enemy.hit(30);
            this.sound.attackSound();
            this.sound.skeletonHurtSound();
        } else if (enemy.energy > 0 && this.character.isColliding(enemy)) {
            this.handleEnemyAttack(enemy);
        } else {
            enemy.isAttacking = false;
        }
    }

    /**
     * Engages combat phase timelines, resetting flags or verifying shield defense metrics.
     * @param {MovableObject} enemy - The actively striking monster entity.
     */
    handleEnemyAttack(enemy) {
        enemy.isAttacking = true;
        let frame = enemy.currentImage % enemy.IMAGES_ATTACK.length;
        if (frame === 0) enemy.damageDealt = false;
        if (frame === 2 && !enemy.damageDealt && this.character.isColliding(enemy)) {
            if (this.keyboard.down && this.character.otherDirection == enemy.otherDirection) {
                this.sound.shieldBlockSound();
            } else if (!this.character.isHurt()) {
                this.character.hit(20);
                this.healthStatusbar.setPercentage(this.character.energy);
                this.sound.attackFromEnemySound();
            }
            enemy.damageDealt = true;
        }
    }

    /**
     * Instructs level monsters to bypass combat triggers upon hero processing termination states.
     */
    letEnemiesWalkPast() { this.level.enemies.forEach((enemy) => enemy.isAttacking = false); }

    /**
     * Tracks bolt item pathways to verify if flying projectiles crash into enemy hitboxes.
     */
    checkBoltCollisions() {
        this.flyBolt.forEach((bolt) => {
            this.level.enemies.forEach((enemy) => {
                if (bolt.isColliding(enemy)) this.handleBoltHit(bolt, enemy);
            });
        });
        this.flyBolt = this.flyBolt.filter(bolt => !bolt.isDead);
    }

    /**
     * Computes projectile damage impact reductions applied onto enemies alongside audio updates.
     * @param {Bolt} bolt - The traveling ammunition item.
     * @param {MovableObject} enemy - The impacted monster target.
     */
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

    /**
    * Controls the dragon fire attack trigger states depending on character vitality.
    */
    dragonFireAttack() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                if (this.character.energy <= 0) {
                    enemy.isAttacking = false;
                } else { enemy.checkPlayerDistance(this.character.x); }
            }
        });
    }

    /**
 Loops through level enemies to detect and trigger active dragon fire attacks.
 */
    simulateFireParticles() {
        let bossIsAttacking = false;
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.isAttacking && this.character.energy > 0) {
                bossIsAttacking = true;
                this.spawnBossFire(enemy);
            }
        });
        this.updateActiveParticles();
        if (!bossIsAttacking || this.character.energy <= 0) {
            this.fireParticles = [];
        }
    }

    /**
     * Spawns a dedicated burst cluster of fresh fire particles.
     * @param {Endboss} enemy - The reference instance of the active dragon boss.
     */
    spawnBossFire(enemy) {
        for (let i = 0; i < 6; i++) {
            this.fireParticles.push(new FireParticle(enemy));
        }
    }

    /**
     * Updates physics vectors for all particles and triggers their individual collision checks.
     */
    updateActiveParticles() {
        this.fireParticles.forEach((particle) => {
            particle.update();
            this.checkParticleCollision(particle);
        });
        if (this.character.energy > 0) {
            this.fireParticles = this.fireParticles.filter(p => p.life > 0);
        }
    }

    /**
     * Evaluates direct combat collision bounds between one particle and the character.
     * @param {FireParticle} particle - The specific particle being tested against the player.
     */
    checkParticleCollision(particle) {
        let distX = Math.abs(particle.x - this.character.x);
        let boundsY = particle.y > this.character.y && particle.y < this.character.y + this.character.height;
        if (distX < 40 && boundsY && !this.character.isHurt()) {
            this.character.hit(10);
            this.healthStatusbar.setPercentage(this.character.energy);
        }
    }

    /**
     * Detects if character triggers coordinate overlaps over ammunition bundle pickups.
     */
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

    /**
     * Manages coin inventory logic and updates indicators upon character intercept metrics.
     */
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
