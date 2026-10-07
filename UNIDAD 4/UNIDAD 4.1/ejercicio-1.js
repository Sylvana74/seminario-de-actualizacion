function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    // Lógica del Ejercicio 1: Cruz diagonal
    let ctx = myView._canvas.getContext('2d');
    let w = myView._canvas.width;
    let h = myView._canvas.height;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, h);
    ctx.moveTo(w, 0);
    ctx.lineTo(0, h);
    ctx.stroke();
    ctx.closePath();

   document.getElementById('app').appendChild(myView)
}
main();
