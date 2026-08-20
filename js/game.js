let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false; 

/**
 * Initializes the game canvas, scales the 2D context, and restores the mute state from local storage.
 */
async function init() {
    canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 1440;
    canvas.height = 960;
    ctx.scale(2, 2);

    isMuted = localStorage.getItem('gameMuted') === 'true';
    if (isMuted) {
        document.getElementById('muteBtn').src = "img/8_other/mute_on.png";
    } 
}

/**
 * Toggles the screen state between default layout display and canvas container fullscreen view.
 */
function fullScreen() {
    let container = document.getElementById('gameContainer');
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            console.error(`Fehler beim Aktivieren: ${err.message}`);
        });
    } else { 
        document.exitFullscreen();
    }
}

/**
 * Shuts down the primary start screen, builds the game engine instance, and enforces mute persistence.
 */
function startGame() {
    let startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'none';
    world = new World(canvas, keyboard);
    if (isMuted && world.sound) {
        world.sound.muteAll();
    }
}

/**
 * Changes display layout rules to flex to present the game over screen interface.
 */
function showGameOverScreen() {
    document.getElementById('gameOverScreen').style.display = 'flex';
}

/**
 * Inverts the global muting tracking states, swaps icon graphic paths, and stores data in storage files.
 */
function toggleMute() {
    let muteImg = document.getElementById('muteBtn');
    isMuted = !isMuted;
    localStorage.setItem('gameMuted', isMuted);

    if (isMuted) {
        muteImg.src = "img/8_other/mute_off.png";
        if (world && world.sound) world.sound.muteAll();
    } else {
        muteImg.src = "img/8_other/mute_on.png";
        if (world && world.sound) world.sound.unmuteAll();
    }
}

/**
 * Completely resets runtime clock intervals and builds fresh enemy sets without triggering web document reloads.
 */
function restartGame() {
    document.getElementById('gameOverScreen').style.display = 'none';
    for (let i = 1; i < 9999; i++) { window.clearInterval(i); }
    
    level1.enemies = [
        new SkeletonEnemy(600),
        new SkeletonEnemy(900),
        new SkeletonEnemy(1300),
        new Endboss()
    ];
    
    world = new World(canvas, keyboard);
    if (isMuted && world.sound) {
        world.sound.muteAll();
    }
}

// ==========================================
// KEYBOARD CONTROLS (LISTENERS)
// ==========================================

window.addEventListener('keydown', (e) => {
    if (e.key === 'd') keyboard.right = true;
    if (e.key === 's') keyboard.down = true;
    if (e.key === 'a') keyboard.left = true;
    if (e.key === 'w') keyboard.up = true;
    if (e.key === 'e') keyboard.attack = true;
    if (e.key === 'f') keyboard.shoot_crossbow = true;
    if (e.key === 'r') keyboard.shoot_crossbow2 = true;
    if (e.key === ' ') {
        e.preventDefault();
        keyboard.space = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'd') keyboard.right = false;
    if (e.key === 's') keyboard.down = false;
    if (e.key === 'a') keyboard.left = false;
    if (e.key === 'w') keyboard.up = false;
    if (e.key === 'e') keyboard.attack = false;
    if (e.key === 'f') keyboard.shoot_crossbow = false;
    if (e.key === 'r') keyboard.shoot_crossbow2 = false;
    if (e.key === ' ') {
        e.preventDefault();
        keyboard.space = false;
    }
});
