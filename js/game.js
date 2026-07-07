let canvas;
let world;
let keyboard = new Keyboard();

async function init() {
    canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = 1440;
    canvas.height = 960;

    canvas.style.width = "720px";
    canvas.style.height = "480px";

    ctx.scale(2, 2);

    world = new World(canvas, keyboard);
}




// Wir loggen JEDE Taste, die gedrückt wird, ohne Filter!
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
    if (e.key === ' ') {
        e.preventDefault();
        keyboard.space = false;
    }


});


