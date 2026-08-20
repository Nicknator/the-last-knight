let canvas;
let world;
let keyboard = new Keyboard();

async function init() {
    canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 1440;
    canvas.height = 960;
    // canvas.style.width = "720px";
    // canvas.style.height = "480px";
    ctx.scale(2, 2);

}

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


function startGame() {
    startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'none';
    world = new World(canvas, keyboard);
}


function showGameOverScreen() {
    document.getElementById('gameOverScreen').style.display = 'flex';
}

let isMuted = false; // Startzustand: Ton ist an

function toggleMute() {
    let muteImg = document.getElementById('muteBtn');
    isMuted = !isMuted; 
    if (isMuted) {
        muteImg.src = "img/8_other/mute_off.png"; 
        if (world && world.sound) world.sound.muteAll(); 
    } else {
        muteImg.src = "img/8_other/mute_on.png"; 
        if (world && world.sound) world.sound.unmuteAll(); 
    }
}
 

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
}




window.addEventListener('keydown', (e) => {
    if (e.key === 'd') {
        keyboard.right = true;
    }
    if (e.key === 's') {
        keyboard.down = true;
    }
    if (e.key === 'a') {
        keyboard.left = true;
    }
    if (e.key === 'w') {
        keyboard.up = true;
    }
    if (e.key === 'e') {
        keyboard.attack = true;
    }
    if (e.key === 'f') {
        keyboard.shoot_crossbow = true;
    }
    if (e.key === 'r') {
        keyboard.shoot_crossbow2 = true;
    }

    if (e.key === ' ') {
        e.preventDefault();
        keyboard.space = true;
    }
});

    
window.addEventListener('keyup', (e) => {
    if (e.key === 'd') {
        keyboard.right = false;
    }
    if (e.key === 's') {
        keyboard.down = false;
    }
    if (e.key === 'a') {
        keyboard.left = false;
    }
    if (e.key === 'w') {
        keyboard.up = false;
    }
    if (e.key === 'e') {
        keyboard.attack = false;
    }

    if (e.key === 'f') {
        keyboard.shoot_crossbow = false;
    }
    if (e.key === 'r') {
        keyboard.shoot_crossbow2 = false;
    }

    if (e.key === ' ') {
        e.preventDefault();
        keyboard.space = false;
    }
});


