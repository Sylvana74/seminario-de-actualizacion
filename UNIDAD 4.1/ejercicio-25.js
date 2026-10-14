// ejercicio-25.js - Textura enmascarada dentro de una figura geométrica (Clipping Path)
function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();

    myView._canvas.width = 800;
    myView._canvas.height = 600;

    let ctx = myView._canvas.getContext('2d');

    // Panel de controles para subir la imagen de textura
    let controlsDiv = document.createElement('div');
    controlsDiv.style.marginBottom = '15px';
    controlsDiv.style.padding = '10px';
    controlsDiv.style.background = '#f1f1f1';
    controlsDiv.style.borderRadius = '5px';

    let labelFile = document.createElement('label');
    labelFile.textContent = ' Subir Textura para Recorte: ';
    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    controlsDiv.appendChild(labelFile);
    controlsDiv.appendChild(fileInput);
    myView.insertBefore(controlsDiv, myView._canvas);

    function dibujarConClip(imgElement) {
        ctx.clearRect(0, 0, myView._canvas.width, myView._canvas.height);

        ctx.save(); // Guardamos el estado del contexto

        // 1. Definimos la ruta de la figura geométrica que servirá de máscara
        ctx.beginPath();
        ctx.arc(400, 300, 200, 0, Math.PI * 2);
        ctx.closePath();
        
        // 2. Aplicamos el recorte (clip)
        ctx.clip();

        // 3. Dibujamos la textura o imagen; solo se verá dentro del área enmascarada
        let pattern = ctx.createPattern(imgElement, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, myView._canvas.width, myView._canvas.height);

        ctx.restore(); // Restauramos el contexto para dibujar el borde exterior limpio

        // Dibujamos un borde estético alrededor del recorte
        ctx.beginPath();
        ctx.arc(400, 300, 200, 0, Math.PI * 2);
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#2c3e50';
        ctx.stroke();
        ctx.closePath();
    }

    fileInput.addEventListener('change', (e) => {
        let file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function(event) {
                let img = new Image();
                img.onload = function() {
                    dibujarConClip(img);
                };
                img.src = event.target.result;
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