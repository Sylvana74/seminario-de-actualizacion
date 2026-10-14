// ejercicio-30.js - Transformación geométrica: Escalado (scale)
function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    myView._canvas.width = 800;
    myView._canvas.height = 600;

    let ctx = myView._canvas.getContext('2d');

    // Panel de controles para el factor de escala
    let controlsDiv = document.createElement('div');
    controlsDiv.style.marginBottom = '15px';
    controlsDiv.style.padding = '10px';
    controlsDiv.style.background = '#f1f1f1';
    controlsDiv.style.borderRadius = '5px';

    let labelScale = document.createElement('label');
    labelScale.textContent = ' Factor de Escala: ';
    let sliderScale = document.createElement('input');
    sliderScale.type = 'range';
    sliderScale.min = '0.2';
    sliderScale.max = '3.0';
    sliderScale.step = '0.1';
    sliderScale.value = '1.0';

    controlsDiv.appendChild(labelScale);
    controlsDiv.appendChild(sliderScale);
    myView.insertBefore(controlsDiv, myView._canvas);

    function dibujarEscala() {
        ctx.clearRect(0, 0, myView._canvas.width, myView._canvas.height);

        let escala = parseFloat(sliderScale.value);

        ctx.save(); // Guardamos el estado inicial

        // Movemos el origen al centro del canvas para que escale desde el medio
        ctx.translate(400, 300);

        // Aplicamos el escalado en X e Y
        ctx.scale(escala, escala);

        // Dibujamos una figura de referencia centrada en el origen local (0,0)
        ctx.beginPath();
        ctx.rect(-50, -50, 100, 100);
        ctx.fillStyle = '#27ae60';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#2c3e50';
        ctx.stroke();
        ctx.closePath();

        ctx.restore(); // Restauramos el contexto
    }

    sliderScale.addEventListener('input', dibujarEscala);

    // Inyección segura al DOM
    let appContainer = document.getElementById('app');
    if (!appContainer) {
        appContainer = document.createElement('div');
        appContainer.id = 'app';
        document.body.appendChild(appContainer);
    }
    appContainer.appendChild(myView);

    dibujarEscala();
}

main();