// ejercicio-31.js - Combinación de Transformaciones Geométricas
function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    myView._canvas.width = 800;
    myView._canvas.height = 600;

    let ctx = myView._canvas.getContext('2d');

    // Controles para manipular combinación de escala y rotación
    let controlsDiv = document.createElement('div');
    controlsDiv.style.marginBottom = '15px';
    controlsDiv.style.padding = '10px';
    controlsDiv.style.background = '#f1f1f1';
    controlsDiv.style.borderRadius = '5px';

    let labelRot = document.createElement('label');
    labelRot.textContent = ' Rotación: ';
    let sliderRot = document.createElement('input');
    sliderRot.type = 'range';
    sliderRot.min = '0';
    sliderRot.max = '360';
    sliderRot.value = '30';
    sliderRot.style.marginRight = '15px';

    let labelScale = document.createElement('label');
    labelScale.textContent = ' Escala: ';
    let sliderScale = document.createElement('input');
    sliderScale.type = 'range';
    sliderScale.min = '0.5';
    sliderScale.max = '2.5';
    sliderScale.step = '0.1';
    sliderScale.value = '1.2';

    controlsDiv.appendChild(labelRot);
    controlsDiv.appendChild(sliderRot);
    controlsDiv.appendChild(labelScale);
    controlsDiv.appendChild(sliderScale);
    myView.insertBefore(controlsDiv, myView._canvas);

    function dibujarCombinacion() {
        ctx.clearRect(0, 0, myView._canvas.width, myView._canvas.height);

        let angulo = (parseInt(sliderRot.value) * Math.PI) / 180;
        let escala = parseFloat(sliderScale.value);

        ctx.save();

        // Trasladamos al centro del canvas
        ctx.translate(400, 300);

        // Combinamos rotación y escala acumuladas
        ctx.rotate(angulo);
        ctx.scale(escala, escala);

        // Dibujamos 
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * 60, 
                       -Math.sin((18 + i * 72) * Math.PI / 180) * 60);
            ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * 30, 
                       -Math.sin((54 + i * 72) * Math.PI / 180) * 30);
        }
        ctx.closePath();

        ctx.fillStyle = '#e67e22';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#d35400';
        ctx.stroke();

        ctx.restore();
    }

    sliderRot.addEventListener('input', dibujarCombinacion);
    sliderScale.addEventListener('input', dibujarCombinacion);

    // Inyección segura al DOM
    let appContainer = document.getElementById('app');
    if (!appContainer) {
        appContainer = document.createElement('div');
        appContainer.id = 'app';
        document.body.appendChild(appContainer);
    }
    appContainer.appendChild(myView);

    dibujarCombinacion();
}

main();