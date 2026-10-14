// ejercicio-20-bis.js - Relleno con patrón de imagen subida por el usuario
function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    myView._canvas.width = 800;
    myView._canvas.height = 600;

    let ctx = myView._canvas.getContext('2d');

    // Panel de controles superior con input de tipo file
    let controlsDiv = document.createElement('div');
    controlsDiv.style.marginBottom = '15px';
    controlsDiv.style.padding = '10px';
    controlsDiv.style.background = '#f1f1f1';
    controlsDiv.style.borderRadius = '5px';

    let labelFile = document.createElement('label');
    labelFile.textContent = ' Subir Imagen: ';
    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Solo permite seleccionar archivos de imagen
    fileInput.style.marginRight = '15px';

    controlsDiv.appendChild(labelFile);
    controlsDiv.appendChild(fileInput);
    myView.insertBefore(controlsDiv, myView._canvas);

    // Función para dibujar el rectángulo con el patrón de la imagen elegida
    function aplicarPatron(imgElement) {
        ctx.clearRect(0, 0, myView._canvas.width, myView._canvas.height);
        
        // Creamos el patrón repitiendo la imagen en ambas direcciones ('repeat')
        let pattern = ctx.createPattern(imgElement, 'repeat');

        ctx.beginPath();
        ctx.rect(100, 50, 600, 500); // Rectángulo grande
        ctx.fillStyle = pattern;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    // Evento al seleccionar un archivo local
    fileInput.addEventListener('change', (e) => {
        let file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function(event) {
                let img = new Image();
                img.onload = function() {
                    aplicarPatron(img);
                };
                img.src = event.target.result; // Cargamos la imagen en base64
            };
            reader.readAsDataURL(file);
        }
    });

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