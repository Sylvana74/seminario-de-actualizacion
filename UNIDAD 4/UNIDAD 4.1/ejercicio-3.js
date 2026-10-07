function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    let ctx = myView._canvas.getContext('2d');
    let w = myView._canvas.width;
    let h = myView._canvas.height;

    // Función para dibujar el polígono
    function drawPolygon(context, points) {
        if (!points || points.length < 3) return;

        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
            context.lineTo(points[i].x, points[i].y);
        }
        
        context.closePath();
        context.stroke();
    }

    // Puntos relativos al centro (0,0)
    let puntosBase = [
        { x: 0, y: -90 },
        { x: 80, y: -30 },
        { x: 50, y: 70 },
        { x: -50, y: 70 },
        { x: -80, y: -30 }
    ];

    let centroX = w / 2;
    let centroY = h / 2;

    // Trasladamos los puntos al centro del canvas
    let puntosCentrados = puntosBase.map(p => ({
        x: p.x + centroX,
        y: p.y + centroY
    }));

    drawPolygon(ctx, puntosCentrados);

    // Adjuntamos al contenedor principal
    document.getElementById('app').appendChild(myView);
}

// Invocamos la función directamente
main();