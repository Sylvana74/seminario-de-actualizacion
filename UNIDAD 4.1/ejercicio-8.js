// ejercicio-8.js - Gráfico de Torta flexible con etiquetas personalizadas
function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    let ctx = myView._canvas.getContext('2d');
    let centroX = myView._canvas.width / 2;
    let centroY = myView._canvas.height / 2;
    let radio = 140;

    // Objeto de datos flexible con etiquetas personalizadas y valores
    let datosFlexibles = [
        { label: "Sistema A", value: 0.30 },
        { label: "Sistema B", value: 0.50 },
        { label: "Sistema C", value: 0.10 },
        { label: "Otros",     value: 0.10 }
    ];

    function drawFlexiblePieChart(context, cx, cy, r, data) {
        let anguloActual = 0;

        data.forEach((item) => {
            let anguloPorcion = item.value * (Math.PI * 2);
            let anguloFin = anguloActual + anguloPorcion;

            // 1. Trazar la porción de la torta
            context.beginPath();
            context.moveTo(cx, cy);
            context.arc(cx, cy, r, anguloActual, anguloFin);
            context.lineTo(cx, cy);
            context.closePath();
            context.stroke();

            // 2. Calcular la posición para mostrar la etiqueta combinada con el porcentaje
            let anguloMedio = anguloActual + (anguloPorcion / 2);
            let textoX = cx + (r * 0.65) * Math.cos(anguloMedio);
            let textoY = cy + (r * 0.65) * Math.sin(anguloMedio);

            context.font = '12px sans-serif';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            
            // Mostramos la etiqueta personalizada + el porcentaje
            let textoEtiqueta = `${item.label} (${item.value * 100}%)`;
            context.fillText(textoEtiqueta, textoX, textoY);

            anguloActual = anguloFin;
        });
    }

    drawFlexiblePieChart(ctx, centroX, centroY, radio, datosFlexibles);

    document.getElementById('app').appendChild(myView);
}

main();