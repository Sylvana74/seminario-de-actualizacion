// ejercicio-12.js - Integración Capítulo 2 (Figuras con grosor y tipo de línea)

// 1. Modelo específico para gestionar las figuras estilizadas
class ModelEjercicio12 extends Model {
    constructor() {
        super();
        this._figures = [];
    }

    addFigure(figure) {
        this._figures.push(figure);
        this.changed();
    }

    clear() {
        this._figures = [];
        this.changed();
    }

    get figures() {
        return this._figures;
    }
}

// 2. Instanciamos el modelo y la vista base
let myModel = new ModelEjercicio12();
let myView = new View();

// Contenedor superior para los controles e inputs solicitados
let controlsDiv = document.createElement('div');
controlsDiv.style.marginBottom = '15px';
controlsDiv.style.padding = '10px';
controlsDiv.style.background = '#f1f1f1';
controlsDiv.style.borderRadius = '5px';

// Input 1: Selector de Grosor (lineWidth)
let labelGrosor = document.createElement('label');
labelGrosor.textContent = ' Grosor: ';
let inputGrosor = document.createElement('input');
inputGrosor.type = 'number';
inputGrosor.value = '3';
inputGrosor.min = '1';
inputGrosor.max = '20';
inputGrosor.style.width = '50px';
inputGrosor.style.marginRight = '15px';

// Input 2: Selector de Tipo de Línea (setLineDash)
let labelTipo = document.createElement('label');
labelTipo.textContent = ' Patrón: ';
let selectTipo = document.createElement('select');
selectTipo.style.marginRight = '15px';

let optSolida = document.createElement('option');
optSolida.value = 'solid';
optSolida.textContent = 'Sólida';

let optPunteada = document.createElement('option');
optPunteada.value = 'dashed';
optPunteada.textContent = 'Punteada (10, 5)';

selectTipo.appendChild(optSolida);
selectTipo.appendChild(optPunteada);

// Botones de carga y limpieza
let loadBtn = document.createElement('button');
loadBtn.textContent = 'Cargar Figura (JSON)';
loadBtn.style.marginRight = '10px';

let clearBtn = document.createElement('button');
clearBtn.textContent = 'Limpiar Lienzo';

// Agregamos todo al contenedor de controles
controlsDiv.appendChild(labelGrosor);
controlsDiv.appendChild(inputGrosor);
controlsDiv.appendChild(labelTipo);
controlsDiv.appendChild(selectTipo);
controlsDiv.appendChild(loadBtn);
controlsDiv.appendChild(clearBtn);

// Insertamos el bloque antes del canvas
myView.insertBefore(controlsDiv, myView._canvas);

// Evento de carga por JSON anexando los valores de los inputs
loadBtn.addEventListener('click', () => {
    let jsonStr = prompt('Ingrese el objeto JSON de la figura (círculo o polígono):');
    if (jsonStr) {
        try {
            let figureData = JSON.parse(jsonStr);
            
            // Anexamos las propiedades de línea seleccionadas en los inputs de la interfaz[cite: 5]
            figureData.lineWidth = parseInt(inputGrosor.value) || 1;
            
            if (selectTipo.value === 'dashed') {
                figureData.lineDash = [10, 5];
            } else {
                figureData.lineDash = [];
            }

            myView.dispatchEvent(new CustomEvent('request', {
                detail: { action: 'load', figure: figureData }
            }));
        } catch (e) {
            alert('Error: El formato JSON ingresado no es válido. ' + e.message);
        }
    }
});

// Evento de limpieza
clearBtn.addEventListener('click', () => {
    myView.dispatchEvent(new CustomEvent('request', {
        detail: { action: 'clear' }
    }));
});

// Método para renderizar las figuras aplicando sus estilos de borde
myView.drawFigures = function(figures) {
    let ctx = this._canvas.getContext('2d');
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    if (!figures) return;

    for (let fig of figures) {
        ctx.beginPath();

        // Aplicamos grosor y patrón de línea definidos en la figura
        ctx.lineWidth = fig.lineWidth || 1;
        ctx.setLineDash(fig.lineDash || []);

        if (fig.type === 'circle') {
            ctx.arc(fig.x, fig.y, fig.radius, 0, Math.PI * 2);
            ctx.stroke();
        } 
        else if (fig.type === 'polygon' && fig.points && fig.points.length > 0) {
            ctx.moveTo(fig.points[0].x, fig.points[0].y);
            for (let i = 1; i < fig.points.length; i++) {
                ctx.lineTo(fig.points[i].x, fig.points[i].y);
            }
            ctx.closePath();
            ctx.stroke();
        }
    }
};

// 3. Controlador
class ControllerEjercicio12 extends Controller {
    onModelChanged() {
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

let myController = new ControllerEjercicio12(myView, myModel);
myController.enable();

document.getElementById('app').appendChild(myView);