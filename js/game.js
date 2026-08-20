let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false; 

/**
 * Initialisiert das Canvas-Spielfeld und den 2D-Kontext.
 * Lädt den gespeicherten Mute-Status aus dem Local Storage.
 */
async function init() {
    canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 1440;
    canvas.height = 960;
    ctx.scale(2, 2);
    isMuted = localStorage.getItem('gameMuted') === 'true';
    if (isMuted) {
        document.getElementById('muteBtn').src = "img/6_button/mute_on.png";
    }
}

/**
 * Aktiviert oder deaktiviert den Vollbildmodus für den Spiel-Container.
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
 * Startet das Spiel, blendet das Hauptmenü aus und initialisiert die Spielewelt.
 * Berücksichtigt den geladenen Stummschaltungs-Status.
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
 * Blendet den Game-Over-Bildschirm ein.
 */
function showGameOverScreen() {
    document.getElementById('gameOverScreen').style.display = 'flex';
}

/**
 * Schaltet den globalen Ton um und speichert den Status im Local Storage.
 */
function toggleMute() {
    let muteImg = document.getElementById('muteBtn');
    isMuted = !isMuted;
    localStorage.setItem('gameMuted', isMuted);

    if (isMuted) {
        muteImg.src = "img/6_button/mute_on.png";
        if (world && world.sound) world.sound.muteAll();
    } else {
        muteImg.src = "img/6_button/mute_off.png";
        if (world && world.sound) world.sound.unmuteAll();
    }
}

/**
 * Startet das Spiel nach einem Game Over komplett neu, ohne die Seite neu zu laden.
 * Bereinigt alte Intervalle und erzeugt frische Gegner-Instanzen.
 */
function restartGame() {
    document.getElementById('gameOverScreen').style.display = 'none';
    for (let i = 1; i < 9999; i++) { window.clearInterval(i); }
    
    // Frische Gegner für das Level generieren
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

/**
 * TASTATUR-STEUERUNG (KEYBOARD LISTENERS)
 */
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
