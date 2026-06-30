let canvas;
let world;


async function init() {
    canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

   
    canvas.width = 1440;  
    canvas.height = 960;  

    
    canvas.style.width = "720px";
    canvas.style.height = "480px";


    ctx.scale(2, 2);

 
    world = new World(canvas);
}