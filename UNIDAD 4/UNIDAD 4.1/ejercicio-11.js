// ejercicio-11.js - Grilla de diagonales alternando continuas y punteadas
function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    let ctx = myView._canvas.getContext('2d');
    let width = myView._canvas.width;   // 800px
    let height = myView._canvas.height; // 600px

    let espaciado = 15;
    let contador = 0;

    // Recorremos con un offset para cubrir toda el área de dibujo con líneas diagonales
    for (let offset = -height; offset < width + height; offset += espaciado) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#2c3e50';

        // Alternamos entre línea continua y línea punteada
        if (contador % 2 === 0) {
            ctx.setLineDash([]);        // Línea sólida / continua
        } else {
            ctx.setLineDash([8, 6]);    // Línea punteada: 8px de trazo, 6px de espacio[cite: 5]
        }

        // Trazar línea diagonal de arriba a abajo
        ctx.moveTo(offset, 0);
        ctx.lineTo(offset + height, height);
        ctx.stroke();
        ctx.closePath();

        contador++;
    }

    document.getElementById('app').appendChild(myView);
}

main();