// ejercicio-27.js - Transformaciones geométricas: Traslación y Rotación
function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    myView._canvas.width = 800;
    myView._canvas.height = 600;

    let ctx = myView._canvas.getContext('2d');

    // Panel de controles para modificar ángulo de rotación y traslación en tiempo real
    let controlsDiv = document.createElement('div');
    controlsDiv.style.marginBottom = '15px';
    controlsDiv.style.padding = '10px';
    controlsDiv.style.background = '#f1f1f1';
    controlsDiv.style.borderRadius = '5px';

    let labelRot = document.createElement('label');
    labelRot.textContent = ' Rotación (grados): ';
    let sliderRot = document.createElement('input');
    sliderRot.type = 'range';
    sliderRot.min = '0';
    sliderRot.max = '360';
    sliderRot.value = '45';
    sliderRot.style.marginRight = '20px';

    let labelTransX = document.createElement('label');
    labelTransX.textContent = ' Traslación X: ';
    let sliderTransX = document.createElement('input');
    sliderTransX.type = 'range';
    sliderTransX.min = '50';
    sliderTransX.max = '700';
    sliderTransX.value = '400';

    controlsDiv.appendChild(labelRot);
    controlsDiv.appendChild(sliderRot);
    controlsDiv.appendChild(labelTransX);
    controlsDiv.appendChild(sliderTransX);
    myView.insertBefore(controlsDiv, myView._canvas);

    function dibujarTransformacion() {
        ctx.clearRect(0, 0, myView._canvas.width, myView._canvas.height);

        let anguloGrados = parseInt(sliderRot.value);
        let anguloRadianes = (anguloGrados * Math.PI) / 180;
        let posX = parseInt(sliderTransX.value);
        let posY = 300;

        ctx.save(); // Guardamos el estado inicial del canvas

        // 1. Aplicamos traslación (desplazamiento del origen de coordenadas)
        ctx.translate(posX, posY);

        // 2. Aplicamos rotación en radianes sobre el nuevo origen
        ctx.rotate(anguloRadianes);

        // Dibujamos una figura geométrica de referencia 
        ctx.beginPath();
        ctx.rect(-60, -40, 120, 80);
        ctx.fillStyle = '#3498db';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#2c3e50';
        ctx.stroke();
        ctx.closePath();

        // Indicador visual del centro de rotación local
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#e74c3c';
        ctx.fill();
        ctx.closePath();

        ctx.restore(); // Restauramos el estado del canvas para que no afecte futuros dibujos
    }

    // Eventos de los sliders para actualizar la transformación dinámicamente
    sliderRot.addEventListener('input', dibujarTransformacion);
    sliderTransX.addEventListener('input', dibujarTransformacion);

    // Inyección segura al DOM
    let appContainer = document.getElementById('app');
    if (!appContainer) {
        appContainer = document.createElement('div');
        appContainer.id = 'app';
        document.body.appendChild(appContainer);
    }
    appContainer.appendChild(myView);

    // Dibujo inicial
    dibujarTransformacion();
}

main();