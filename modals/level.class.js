class Level {
    enemies;
    lootBolts;
    coins;
    clouds;
    backgroundObjects;
    level_end_x = 2220

    /**
     * Creates a new level instance containing all spawning entities and layout elements.
     * @param {Array} enemies - Collection set of monsters and bosses active on the map.
     * @param {Array} lootBolts - Array of collectable crossbow ammunition bundles.
     * @param {Array} coins - Array of collectable golden coin items.
     * @param {Array} clouds - Collection of decorative floating weather assets.
     * @param {Array} backgroundObjects - Static layer graphics creating the frozen landscape scene.
     */
    constructor(enemies, lootBolts, coins, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.lootBolts = lootBolts;
        this.coins = coins;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
