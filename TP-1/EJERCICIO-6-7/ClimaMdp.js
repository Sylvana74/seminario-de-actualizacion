class WeatherDataMdp extends HTMLElement {
    constructor() {
        super();
        // Datos simulados de temperaturas de Mar del Plata
        this.temperaturasCelcius = [12, 14, 18, 22, 26, 25, 20, 15, 11, 9];
        this.mostrarEnFahrenheit = false;
        
        // Elementos interactivos
        this.listaUI = null;
        this.promedioTag = null;
    }

    connectedCallback() {
        this.buildUI();
        this.renderTemperaturas();
    }

    buildUI() {
        const container = document.createElement('div');
        container.className = 'weather-container';

        const style = document.createElement('style');
        style.textContent = `
            .weather-container {
                font-family: Arial, sans-serif;
                max-width: 400px;
                margin: 20px auto;
                background: linear-gradient(135deg, #00c6ff, #0072ff);
                color: white;
                padding: 25px;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
            .weather-list {
                list-style: none;
                padding: 0;
                margin: 15px 0;
            }
            .weather-item {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid rgba(255,255,255,0.3);
            }
            .actions {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 15px;
            }
            .btn-weather {
                padding: 8px;
                border: none;
                border-radius: 4px;
                background-color: white;
                color: #0072ff;
                font-weight: bold;
                cursor: pointer;
            }
            .btn-weather:hover { background-color: #f0f0f0; }
            .promedio-box {
                margin-top: 15px;
                background: rgba(255, 255, 255, 0.2);
                padding: 10px;
                border-radius: 6px;
                text-align: center;
                font-weight: bold;
            }
        `;
        this.appendChild(style);

        const title = document.createElement('h2');
        title.textContent = 'Historial Climático MDP';
        container.appendChild(title);

        // Lista dinámica de registros
        this.listaUI = document.createElement('ul');
        this.listaUI.className = 'weather-list';
        container.appendChild(this.listaUI);

        // Caja para el cálculo del promedio requerido
        this.promedioBox = document.createElement('div');
        this.promedioBox.className = 'promedio-box';
        container.appendChild(this.promedioBox);

        // Controles de acción
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';

        const btnToggle = document.createElement('button');
        btnToggle.className = 'btn-weather';
        btnToggle.textContent = 'Alternar ºC / ºF';
        btnToggle.addEventListener('click', () => {
            this.mostrarEnFahrenheit = !this.mostrarEnFahrenheit;
            this.renderTemperaturas();
        });

        actionsDiv.appendChild(btnToggle);
        container.appendChild(actionsDiv);

        this.appendChild(container);
    }

    // El método requerido para calcular promedios
    getAverageTemperature() {
        const suma = this.temperaturasCelcius.reduce((acc, val) => acc + val, 0);
        return suma / this.temperaturasCelcius.length;
    }

    // Convertidor lógico
    toFahrenheit(celsius) {
        return (celsius * 9/5) + 32;
    }

    renderTemperaturas() {
        // Limpiamos la lista anterior usando manipulaciones DOM seguras
        this.listaUI.textContent = '';

        const unidad = this.mostrarEnFahrenheit ? 'ºF' : 'ºC';

        this.temperaturasCelcius.forEach((tempC, index) => {
            const item = document.createElement('li');
            item.className = 'weather-item';

            const fechaLabel = document.createElement('span');
            fechaLabel.textContent = `Registro ${index + 1}:`;

            const valorLabel = document.createElement('span');
            const tempFinal = this.mostrarEnFahrenheit ? this.toFahrenheit(tempC).toFixed(1) : tempC;
            valorLabel.textContent = `${tempFinal} ${unidad}`;

            item.appendChild(fechaLabel);
            item.appendChild(valorLabel);
            this.listaUI.appendChild(item);
        });

        // Actualizar promedio visualizado
        const promC = this.getAverageTemperature();
        const promFinal = this.mostrarEnFahrenheit ? this.toFahrenheit(promC).toFixed(1) : promC.toFixed(1);
        this.promedioBox.textContent = `Temperatura Promedio: ${promFinal} ${unidad}`;
    }
}

customElements.define('weather-data-mdp', WeatherDataMdp);