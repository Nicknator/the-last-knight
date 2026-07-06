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
    if(e.key==='d'){
        keyboard.right=true;
        console.log(keyboard);

    } 
    if(e.key==='s'){
        keyboard.down=true;
        console.log(keyboard);

    } 
    if(e.key==='a'){
        keyboard.left=true;
        console.log(keyboard);

    } 
    if(e.key==='w'){
        keyboard.up=true;
        console.log(keyboard);

    } 
    if(e.key===' '){
        e.preventDefault(); 
        keyboard.space=true;
        console.log(keyboard);
    } 


});



window.addEventListener('keyup', (e) => {
    if(e.key==='d'){
        keyboard.right=false;
        console.log(keyboard);

    } 
    if(e.key==='s'){
        keyboard.down=false;
        console.log(keyboard);

    } 
    if(e.key==='a'){
        keyboard.left=false;
        console.log(keyboard);

    } 
    if(e.key==='w'){
        keyboard.up=false;
        console.log(keyboard);

    } 
    if(e.key===' '){
        e.preventDefault(); 
        keyboard.space=false;
        console.log(keyboard);
    } 


});


