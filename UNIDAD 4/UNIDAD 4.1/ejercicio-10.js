// ejercicio-10.js - Líneas quebradas con distintos lineCap y lineJoin
function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    let ctx = myView._canvas.getContext('2d');

    ctx.lineWidth = 22; // Grosor pronunciado para notar los efectos
    ctx.strokeStyle = '#333333';

    // 1. Primera línea quebrada: Extremo 'butt' y unión 'miter' (por defecto)
    ctx.beginPath();
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.moveTo(100, 100);
    ctx.lineTo(250, 200);
    ctx.lineTo(400, 100);
    ctx.stroke();
    ctx.closePath();

    // 2. Segunda línea quebrada: Extremo 'round' y unión 'round'
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(100, 250);
    ctx.lineTo(250, 350);
    ctx.lineTo(400, 250);
    ctx.stroke();
    ctx.closePath();

    // 3. Tercera línea quebrada: Extremo 'square' y unión 'bevel'
    ctx.beginPath();
    ctx.lineCap = 'square';
    ctx.lineJoin = 'bevel';
    ctx.moveTo(100, 400);
    ctx.lineTo(250, 500);
    ctx.lineTo(400, 400);
    ctx.stroke();
    ctx.closePath();

    document.getElementById('app').appendChild(myView);
}

main();