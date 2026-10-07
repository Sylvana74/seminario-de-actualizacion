// ejercicio-7.js - Gráfico de Torta básico con porcentajes
function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    let ctx = myView._canvas.getContext('2d');
    let centroX = myView._canvas.width / 2;
    let centroY = myView._canvas.height / 2;
    let radio = 150;

    let datos = [0.30, 0.50, 0.10, 0.10]; // Suman 1.0 (100%)

    function drawPieChart(context, cx, cy, r, data) {
        let anguloActual = 0;

        data.forEach((porcentaje) => {
            let anguloPorcion = porcentaje * (Math.PI * 2);
            let anguloFin = anguloActual + anguloPorcion;

            // 1. Dibujar la porción (slice)
            context.beginPath();
            context.moveTo(cx, cy); // Ir al centro
            context.arc(cx, cy, r, anguloActual, anguloFin);
            context.lineTo(cx, cy);
            context.closePath();
            context.stroke(); // Opcional: fill() si deseas rellenarlo

            // 2. Calcular posición para ubicar el texto del porcentaje en el medio de la porción
            let anguloMedio = anguloActual + (anguloPorcion / 2);
            // Ubicamos el texto a un radio intermedio (ej: 70% del radio total)
            let textoX = cx + (r * 0.7) * Math.cos(anguloMedio);
            let textoY = cy + (r * 0.7) * Math.sin(anguloMedio);

            context.font = '14px sans-serif';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText((porcentaje * 100) + '%', textoX, textoY);

            anguloActual = anguloFin; // Actualizamos el ángulo de inicio para la siguiente porción
        });
    }

    drawPieChart(ctx, centroX, centroY, radio, datos);

    document.getElementById('app').appendChild(myView);
}

main();