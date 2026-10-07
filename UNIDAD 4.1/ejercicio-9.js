// ejercicio-9.js - Muestrario de líneas verticales de grosor creciente
function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    let ctx = myView._canvas.getContext('2d');
    let altoCanvas = myView._canvas.height; // 600px por defecto en la plantilla

    let xInicial = 50;
    let espaciado = 16;
    let grosorMaximo = 25;

    // Dibujamos líneas desde 1px hasta 25px de grosor
    for (let grosor = 1; grosor <= grosorMaximo; grosor++) {
        ctx.beginPath();
        ctx.lineWidth = grosor;
        
        // Posición x incrementa según el acumulado o calculada
        let x = xInicial + (grosor - 1) * espaciado;
        
        ctx.moveTo(x, 20);                  // Margen superior
        ctx.lineTo(x, altoCanvas - 20);     // Margen inferior
        ctx.stroke();
        ctx.closePath();
    }

    document.getElementById('app').appendChild(myView);
}

main();