function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    // Configurar el área de dibujo como un cuadrado de 500x500px
    myView._canvas.width = 500;
    myView._canvas.height = 500;

    let ctx = myView._canvas.getContext('2d');
    let centroX = myView._canvas.width / 2;   // 250
    let centroY = myView._canvas.height / 2;  // 250

    // Array de puntajes (del centro hacia afuera o viceversa)
    // [1000 (centro), 750, 500, 100, 50 (exterior)]
    let puntajes = [1000, 750, 500, 100, 50];
    let espaciado = 25;
    let numCirculos = puntajes.length; // 5 círculos

    // 1. Dibujar los círculos concéntricos y rellenar/escribir los textos de puntaje
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Dibujamos de afuera hacia adentro para que los círculos más chicos queden arriba
    for (let i = 0; i < numCirculos; i++) {
        let radio = (numCirculos - i) * espaciado; // radios: 125, 100, 75, 50, 25
        let puntajeActual = puntajes[i];

        // Dibujar círculo
        ctx.beginPath();
        ctx.arc(centroX, centroY, radio, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();

        // Escribir el puntaje correspondiente en la parte superior de cada anillo
        // Ubicamos el texto justo en el borde superior del radio correspondiente
        let posYTexto = centroY - radio + (espaciado / 2);
        ctx.fillText(puntajeActual, centroX, posYTexto);
    }

    // Dibujar un círculo central sólido o punto para el 1000 
    ctx.beginPath();
    ctx.arc(centroX, centroY, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    // Inyectamos la vista en el contenedor de la página
    document.getElementById('app').appendChild(myView);
}

main();