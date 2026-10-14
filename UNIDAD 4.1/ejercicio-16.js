// ejercicio-16.js - Círculo con gradiente radial
function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    // Aseguramos dimensiones del canvas
    myView._canvas.width = 800;
    myView._canvas.height = 600;

    let ctx = myView._canvas.getContext('2d');
    let cx = 400, cy = 300, radio = 120;

    // Inyección segura al DOM para evitar errores de null
    let appContainer = document.getElementById('app');
    if (!appContainer) {
        appContainer = document.createElement('div');
        appContainer.id = 'app';
        document.body.appendChild(appContainer);
    }
    appContainer.appendChild(myView);

    // Gradiente radial compartiendo el mismo punto focal
    let radialGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radio);
    radialGrad.addColorStop(0, '#ffffff');
    radialGrad.addColorStop(0.5, '#3498db');
    radialGrad.addColorStop(1, '#2c3e50');

    ctx.beginPath();
    ctx.arc(cx, cy, radio, 0, Math.PI * 2);
    ctx.fillStyle = radialGrad;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

main();