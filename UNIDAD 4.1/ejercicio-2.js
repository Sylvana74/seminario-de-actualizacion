// unidad-4/ejercicio-2.js
(function() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    let ctx = myView._canvas.getContext('2d');
    let w = myView._canvas.width;
    let h = myView._canvas.height;

    function drawTriangle(context, v1, v2, v3) {
        context.beginPath();
        context.moveTo(v1.x, v1.y);
        context.lineTo(v2.x, v2.y);
        context.lineTo(v3.x, v3.y);
        context.closePath();
        context.stroke();
    }

    let centroX = w / 2;
    let centroY = h / 2;

    let vertice1 = { x: centroX, y: centroY - 80 };
    let vertice2 = { x: centroX - 90, y: centroY + 70 };
    let vertice3 = { x: centroX + 90, y: centroY + 70 };

    drawTriangle(ctx, vertice1, vertice2, vertice3);

    // Lo inyectamos dentro del contenedor #app del index
    document.getElementById('app').appendChild(myView);
})();