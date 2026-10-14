// ejercicio-14.js - Rectángulo con gradiente lineal horizontal (HEX)
function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    // Aseguramos dimensiones del canvas por si la vista tarda en montarse
    myView._canvas.width = 800;
    myView._canvas.height = 600;

    // Controles para inputs de color HEX
    let controlsDiv = document.createElement('div');
    controlsDiv.style.marginBottom = '10px';
    controlsDiv.style.padding = '8px';
    controlsDiv.style.background = '#f1f1f1';

    let labelC1 = document.createElement('label');
    labelC1.textContent = ' Color 1: ';
    let inputC1 = document.createElement('input');
    inputC1.type = 'color';
    inputC1.value = '#ff0000';
    inputC1.style.marginRight = '15px';

    let labelC2 = document.createElement('label');
    labelC2.textContent = ' Color 2: ';
    let inputC2 = document.createElement('input');
    inputC2.type = 'color';
    inputC2.value = '#0000ff';

    controlsDiv.appendChild(labelC1);
    controlsDiv.appendChild(inputC1);
    controlsDiv.appendChild(labelC2);
    controlsDiv.appendChild(inputC2);

    myView.insertBefore(controlsDiv, myView._canvas);

    let ctx = myView._canvas.getContext('2d');

    function drawGradientRect() {
        ctx.clearRect(0, 0, myView._canvas.width, myView._canvas.height);

        let x = 150, y = 100, w = 200, h = 400; // Dimensiones solicitadas
        
        // Gradiente lineal horizontal de x a x + w
        let gradient = ctx.createLinearGradient(x, y, x + w, y);
        gradient.addColorStop(0.0, inputC1.value); 
        gradient.addColorStop(1.0, inputC2.value); 

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, w, h);
    }

    inputC1.addEventListener('input', drawGradientRect);
    inputC2.addEventListener('input', drawGradientRect);

    // Inyectamos la vista al DOM primero para garantizar renderizado
   // Inyectamos la vista al DOM de forma segura usando el contenedor app
    let appContainer = document.getElementById('app');
    if (!appContainer) {
        appContainer = document.createElement('div');
        appContainer.id = 'app';
        document.body.appendChild(appContainer);
    }
    appContainer.appendChild(myView);
    
    // Dibujamos el rectángulo
    drawGradientRect();
}

main();
    
