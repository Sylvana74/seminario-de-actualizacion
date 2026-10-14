// ejercicio-19.js - Integración Capítulo 3 (Colores, Estilos y Gráfico de Torta con Colores Aleatorios)

// 1. Modelo para gestionar las figuras y el gráfico de torta
class ModelEjercicio19 extends Model {
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

// 2. Instanciamos el modelo y la vista base provista por MVCCanvas.js
let myModel = new ModelEjercicio19();
let myView = new View();

// Aseguramos dimensiones del canvas
myView._canvas.width = 800;
myView._canvas.height = 600;

// Contenedor superior para los controles e inputs
let controlsDiv = document.createElement('div');
controlsDiv.style.marginBottom = '15px';
controlsDiv.style.padding = '10px';
controlsDiv.style.background = '#f1f1f1';
controlsDiv.style.borderRadius = '5px';

// Selector de tipo de figura a cargar (Círculo, Polígono o CakeGraph)
let labelTipoFigura = document.createElement('label');
labelTipoFigura.textContent = ' Figura: ';
let selectTipoFigura = document.createElement('select');
selectTipoFigura.style.marginRight = '10px';

let optCircle = document.createElement('option');
optCircle.value = 'circle';
optCircle.textContent = 'Círculo';

let optPolygon = document.createElement('option');
optPolygon.value = 'polygon';
optPolygon.textContent = 'Polígono';

let optCake = document.createElement('option');
optCake.value = 'cakegraph';
optCake.textContent = 'CakeGraph (Torta)';

selectTipoFigura.appendChild(optCircle);
selectTipoFigura.appendChild(optPolygon);
selectTipoFigura.appendChild(optCake);

// Inputs de Grosor y Patrón
let labelGrosor = document.createElement('label');
labelGrosor.textContent = ' Grosor: ';
let inputGrosor = document.createElement('input');
inputGrosor.type = 'number';
inputGrosor.value = '2';
inputGrosor.min = '1';
inputGrosor.max = '20';
inputGrosor.style.width = '45px';
inputGrosor.style.marginRight = '10px';

let labelPatron = document.createElement('label');
labelPatron.textContent = ' Patrón: ';
let selectPatron = document.createElement('select');
selectPatron.style.marginRight = '10px';

let optSolida = document.createElement('option');
optSolida.value = 'solid';
optSolida.textContent = 'Sólida';
let optPunteada = document.createElement('option');
optPunteada.value = 'dashed';
optPunteada.textContent = 'Punteada';

selectPatron.appendChild(optSolida);
selectPatron.appendChild(optPunteada);

// Botones de acción
let loadBtn = document.createElement('button');
loadBtn.textContent = 'Cargar Figura (JSON)';
loadBtn.style.marginRight = '10px';

let clearBtn = document.createElement('button');
clearBtn.textContent = 'Limpiar Lienzo';

// Agregamos todo al panel de control
controlsDiv.appendChild(labelTipoFigura);
controlsDiv.appendChild(selectTipoFigura);
controlsDiv.appendChild(labelGrosor);
controlsDiv.appendChild(inputGrosor);
controlsDiv.appendChild(labelPatron);
controlsDiv.appendChild(selectPatron);
controlsDiv.appendChild(loadBtn);
controlsDiv.appendChild(clearBtn);

myView.insertBefore(controlsDiv, myView._canvas);

// Función auxiliar para generar colores aleatorios automáticos para el CakeGraph
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Evento para cargar figura mediante JSON según lo seleccionado en el menú
loadBtn.addEventListener('click', () => {
    let tipoSeleccionado = selectTipoFigura.value;
    let mensajePrompt = '';

    if (tipoSeleccionado === 'circle') {
        mensajePrompt = 'Ingrese JSON para Círculo (ej: {"x": 400, "y": 300, "radius": 90})';
    } else if (tipoSeleccionado === 'polygon') {
        mensajePrompt = 'Ingrese JSON para Polígono (ej: {"points": [{"x":250,"y":150},{"x":400,"y":250},{"x":300,"y":400}]})';
    } else if (tipoSeleccionado === 'cakegraph') {
        mensajePrompt = 'Ingrese JSON para CakeGraph (ej: {"x":400,"y":300,"radius":130,"data":[0.4,0.3,0.2,0.1]})';
    }

    let jsonStr = prompt(mensajePrompt);
    if (jsonStr) {
        try {
            let figureData = JSON.parse(jsonStr);
            figureData.type = tipoSeleccionado;
            figureData.lineWidth = parseInt(inputGrosor.value) || 1;
            figureData.lineDash = selectPatron.value === 'dashed' ? [10, 5] : [];

            myView.dispatchEvent(new CustomEvent('request', {
                detail: { action: 'load', figure: figureData }
            }));
        } catch (e) {
            alert('Error: JSON inválido. Verifique la sintaxis. ' + e.message);
        }
    }
});

clearBtn.addEventListener('click', () => {
    myView.dispatchEvent(new CustomEvent('request', {
        detail: { action: 'clear' }
    }));
});

// Método de renderizado extendido para soportar círculos, polígonos y el CakeGraph con colores aleatorios
myView.drawFigures = function(figures) {
    let ctx = this._canvas.getContext('2d');
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    if (!figures) return;

    for (let fig of figures) {
        ctx.beginPath();
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
        else if (fig.type === 'cakegraph' && fig.data && fig.data.length > 0) {
            let cx = fig.x || 400;
            let cy = fig.y || 300;
            let r = fig.radius || 100;
            let anguloActual = 0;

            fig.data.forEach((porcentaje) => {
                let anguloPorcion = porcentaje * (Math.PI * 2);
                let anguloFin = anguloActual + anguloPorcion;

                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.arc(cx, cy, r, anguloActual, anguloFin);
                ctx.lineTo(cx, cy);
                ctx.closePath();

                // Rellenamos con un color aleatorio automático y aplicamos borde
                ctx.fillStyle = getRandomColor();
                ctx.fill();
                ctx.stroke();

                anguloActual = anguloFin;
            });
        }
    }
};

// 3. Controlador MVC
class ControllerEjercicio19 extends Controller {
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

let myController = new ControllerEjercicio19(myView, myModel);
myController.enable();

// Inyección segura al DOM para prevenir errores de null al cambiar de script
let appContainer = document.getElementById('app');
if (!appContainer) {
    appContainer = document.createElement('div');
    appContainer.id = 'app';
    document.body.appendChild(appContainer);
}
appContainer.appendChild(myView);