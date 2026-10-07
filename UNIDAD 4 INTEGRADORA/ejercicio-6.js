// ejercicio-6.js - Integración Capítulo 1

function main() {
    // 1. Modelo específico para gestionar la lista de figuras y notificar cambios
    class ModelEjercicio6 extends Model {
        constructor() {
            super();
            this._figures = []; // Almacena círculos y polígonos
        }

        addFigure(figure) {
            this._figures.push(figure);
            this.changed(); // Dispara el evento 'changed' hacia el controlador
        }

        clear() {
            this._figures = [];
            this.changed();
        }

        get figures() {
            return this._figures;
        }
    }

    // 2. Instanciamos el modelo y la vista base provista por MVCCanvas.js
    let myModel = new ModelEjercicio6();
    let myView = new View(); // Usamos la clase View original sin conflictos

    // Creamos el contenedor superior con los botones requeridos por la consigna
    let controlsDiv = document.createElement('div');
    controlsDiv.style.marginBottom = '10px';

    let loadBtn = document.createElement('button');
    loadBtn.textContent = 'Cargar Figura (JSON)';
    loadBtn.style.marginRight = '10px';

    let clearBtn = document.createElement('button');
    clearBtn.textContent = 'Limpiar Lienzo';

    controlsDiv.appendChild(loadBtn);
    controlsDiv.appendChild(clearBtn);

    // Insertamos los botones antes del elemento canvas dentro del componente
    myView.insertBefore(controlsDiv, myView._canvas);

    // Evento del botón de carga (lanza un prompt esperando el objeto JSON)
    loadBtn.addEventListener('click', () => {
        let jsonStr = prompt('Ingrese el objeto JSON de la figura (ej: círculo o polígono):');
        if (jsonStr) {
            try {
                let figureData = JSON.parse(jsonStr);
                // Disparamos un evento 'request' hacia el controlador
                myView.dispatchEvent(new CustomEvent('request', {
                    detail: { action: 'load', figure: figureData }
                }));
            } catch (e) {
                alert('Error: El formato JSON ingresado no es válido. ' + e.message);
            }
        }
    });

    // Evento del botón de limpieza del lienzo
    clearBtn.addEventListener('click', () => {
        myView.dispatchEvent(new CustomEvent('request', {
            detail: { action: 'clear' }
        }));
    });

    // Método para renderizar todas las figuras acumuladas en el canvas
    myView.drawFigures = function(figures) {
        let ctx = this._canvas.getContext('2d');
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        if (!figures) return;

        for (let fig of figures) {
            ctx.beginPath();

            if (fig.type === 'circle') {
                // Dibujar círculo dado centro (x, y) y radio
                ctx.arc(fig.x, fig.y, fig.radius, 0, Math.PI * 2);
                ctx.stroke();
            } 
            else if (fig.type === 'polygon' && fig.points && fig.points.length > 0) {
                // Dibujar polígono cerrado dada una lista de puntos [{x, y}, ...]
                ctx.moveTo(fig.points[0].x, fig.points[0].y);
                for (let i = 1; i < fig.points.length; i++) {
                    ctx.lineTo(fig.points[i].x, fig.points[i].y);
                }
                ctx.closePath();
                ctx.stroke();
            }
        }
    };

    // 3. Controlador específico para sincronizar Modelo y Vista
    class ControllerEjercicio6 extends Controller {
        onModelChanged() {
            // Cuando el modelo cambia, actualizamos el canvas
            this._view.drawFigures(this._model.figures);
        }

        onViewRequest(event) {
            let { action, figure } = event.detail;
            if (action === 'load') {
                this._model.addFigure(figure);
            } else if (action === 'clear') {
                this._model.clear();
            }
        }
    }

    let myController = new ControllerEjercicio6(myView, myModel);
    myController.enable();

    // Inyectamos el componente completo dentro del contenedor de la página
    document.getElementById('app').appendChild(myView);
}

// Ejecutamos la función principal al cargar el script
main();