// ejercicio-13.js - Tablero de ajedrez con colores RGB dinámicos
function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    // Contenedor de controles RGB (Sliders)
    let controlsDiv = document.createElement('div');
    controlsDiv.style.marginBottom = '10px';
    controlsDiv.style.padding = '8px';
    controlsDiv.style.background = '#f1f1f1';

    function createSlider(labelTxt, defaultVal) {
        let label = document.createElement('label');
        label.textContent = ` ${labelTxt}: `;
        let slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '255';
        slider.value = defaultVal;
        slider.style.marginRight = '10px';
        controlsDiv.appendChild(label);
        controlsDiv.appendChild(slider);
        return slider;
    }

    let rSlider = createSlider('R', 0);
    let gSlider = createSlider('G', 0);
    let bSlider = createSlider('B', 0);

    myView.insertBefore(controlsDiv, myView._canvas);

    let ctx = myView._canvas.getContext('2d');
    let tileSize = 32;

    function drawBoard() {
        ctx.clearRect(0, 0, myView._canvas.width, myView._canvas.height);
        let r = rSlider.value;
        let g = gSlider.value;
        let b = bSlider.value;
        let customColor = `rgb(${r}, ${g}, ${b})`;

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                ctx.beginPath();
                ctx.rect(col * tileSize, row * tileSize, tileSize, tileSize);
                
                // Alternamos colores: casillas pares blancas/claras, impares con el color RGB dinámico
                if ((row + col) % 2 === 0) {
                    ctx.fillStyle = '#ffffff';
                } else {
                    ctx.fillStyle = customColor; //
                }
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    // Actualizar al mover los sliders
    rSlider.addEventListener('input', drawBoard);
    gSlider.addEventListener('input', drawBoard);
    bSlider.addEventListener('input', drawBoard);

    drawBoard();
    document.getElementById('app').appendChild(myView);
}

main();