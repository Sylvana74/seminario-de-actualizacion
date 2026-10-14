// ejercicio-20.js - Relleno con patrón de imagen (createPattern)
function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    myView._canvas.width = 800;
    myView._canvas.height = 600;

    let ctx = myView._canvas.getContext('2d');

    // Creamos un objeto imagen cargando una textura de ejemplo válida
    let img = new Image();
    img.src = 'https://picsum.photos/100'; // Imagen de muestra para el patrón

    img.onload = function() {
        // Creamos el patrón repitiendo la imagen en ambas direcciones ('repeat')
        let pattern = ctx.createPattern(img, 'repeat');

        ctx.beginPath();
        ctx.rect(100, 50, 600, 500); // Rectángulo grande
        ctx.fillStyle = pattern;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    };

    // Inyección segura al DOM
    let appContainer = document.getElementById('app');
    if (!appContainer) {
        appContainer = document.createElement('div');
        appContainer.id = 'app';
        document.body.appendChild(appContainer);
    }
    appContainer.appendChild(myView);
}

main();