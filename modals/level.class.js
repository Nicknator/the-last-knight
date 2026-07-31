class Level {
    enemies;
    lootBolts;
    coins;
    clouds;
    backgroundObjects;
    level_end_x = 2220

    constructor(enemies, lootBolts, coins, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.lootBolts = lootBolts;
        this.coins = coins;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        
    }
}

