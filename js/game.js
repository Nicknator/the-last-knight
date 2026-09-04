let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;

/**
 * Initializes the game canvas, scales the 2D context, and restores the mute state from local storage.
 */
async function init() {
    canvas = document.getElementById('canvas');
    if (!canvas) return; 
    let ctx = canvas.getContext('2d');
    canvas.width = 1440;
    canvas.height = 960;
    ctx.scale(2, 2);
    localMuteState();
}

/**
 * Shuts down the primary start screen, builds the game engine instance, and enforces mute persistence.
 */
function startGame() {
    let startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'none';
    initLevel();
    world = new World(canvas, keyboard);
    syncWorldMuteState();
    bindMobileTouchButtons();
    document.getElementById('mobileGamepadGrid').classList.remove('d-none');
    
}

/**
 * Synchronizes the game world audio volume states based on current global muting configurations.
 */
function syncWorldMuteState() {
    if (world && world.sound) {
        world.sound.isMuted = isMuted;
        if (isMuted) {
            world.sound.muteAll();
        } else {
            world.sound.unmuteAll();
        }
    }
}

/**
 * Hydrates the mute state tracker from local storage files and synchronizes button texture maps.
 */
function localMuteState() {
    isMuted = localStorage.getItem('gameMuted') === 'true';
    if (isMuted) {
        document.getElementById('muteBtn').src = "img/8_other/mute_off.png";
    }
}

/**
 * Toggles fullscreen mode for the game container and locks screen orientation to landscape.
 */
function fullScreen() {
    let container = document.getElementById('gameContainer');
    if (!document.fullscreenElement) {
        container.requestFullscreen().then(() => {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').catch(() => {});
            }
        }).catch(() => {});
    } else {
        document.exitFullscreen();
    }
}

/**
 * Changes display layout rules to flex to present the game over screen interface.
 */
function showGameOverScreen() {
    document.getElementById('gameOverScreen').style.display = 'flex';
    document.getElementById('mobileGamepadGrid').classList.add('d-none');

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
 * Completely resets the game runtime by forcing a clean web page document reload.
 */
function restartGame() {
    window.location.reload();
}

/**
 * KEYBOARD CONTROLS (LISTENERS)
 */
window.addEventListener('keydown', (e) => {
    if (world && world.character && world.character.energy <= 0) return;
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
    if (world && world.character && world.character.energy <= 0) return;
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

window.addEventListener('resize', () => {
   
});

/**
 * Binds smartphone onscreen touch controller elements to digital input variables.
 */
function bindMobileTouchButtons() {
    setupBtnTouch('btnLeft', 'left');
    setupBtnTouch('btnRight', 'right');
    setupBtnTouch('btnJump', 'up');
    setupBtnTouch('btnAttack', 'attack');
    setupBtnTouch('btnDown', 'down');
    setupBtnTouch('btnCrossbow', 'shoot_crossbow');
}

/**
 * Attaches touchstart and touchend listener logic onto a specific DOM button element.
 * @param {string} elementId - The target HTML button element identifier key.
 * @param {string} keyboardKey - The mapping key string within the global keyboard state object.
 */
function setupBtnTouch(elementId, keyboardKey) {
    let btn = document.getElementById(elementId);
    if (!btn) return;
    btn.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault(); 
        keyboard[keyboardKey] = true;
    }, { passive: false }); 
    btn.addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard[keyboardKey] = false;
    }, { passive: false });
}

