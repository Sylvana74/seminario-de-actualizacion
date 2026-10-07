function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    // 1. Configurar el área de dibujo como un cuadrado de 500x500px
    myView._canvas.width = 500;
    myView._canvas.height = 500;

    let ctx = myView._canvas.getContext('2d');
    let centroX = myView._canvas.width / 2;   // 250
    let centroY = myView._canvas.height / 2;  // 250

    // El radio máximo parte desde la mitad del ancho/alto del cuadrado (250px)
    let radioMaximo = centroX;
    let espaciado = 25;

    ctx.beginPath();

    // 2. Dibujar círculos concéntricos espaciados en 25px c/u usando arc()
    for (let radio = radioMaximo; radio > 0; radio -= espaciado) {
        // arc(x, y, radio, anguloInicio, anguloFin)
        // Usamos Math.PI * 2 para completar la circunferencia completa (360 grados)
        ctx.moveTo(centroX + radio, centroY); // Evita líneas cruzadas no deseadas entre círculos
        ctx.arc(centroX, centroY, radio, 0, Math.PI * 2);
    }

    ctx.stroke();
    ctx.closePath();

    // Inyectamos la vista en el contenedor de la página
    document.getElementById('app').appendChild(myView);
}

main();
