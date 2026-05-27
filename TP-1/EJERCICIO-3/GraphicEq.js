class GraphicEqualizer extends HTMLElement {
    constructor() {
        super();
        // Estado inicial de las frecuencias del ecualizador
        this._data = {
            bass: 0,
            mid: 0,
            treble: 0
        };
        this.sliders = {};
    }

    connectedCallback() {
        this.buildUI();
        this.setupEvents();
        this.updateUI();
    }

    buildUI() {
        const container = document.createElement('div');
        container.className = 'eq-container';

        const style = document.createElement('style');
        style.textContent = `
            .eq-container {
                display: flex;
                gap: 25px;
                padding: 25px;
                background: #1e1e24;
                color: #ffffff;
                border-radius: 12px;
                font-family: Arial, sans-serif;
                width: fit-content;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            }
            .control-band {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 60px;
            }
            .control-band input[type=range] {
                writing-mode: vertical-lr;
                direction: rtl;
                height: 180px;
                margin: 15px 0;
                cursor: pointer;
            }
            .value-tag {
                font-size: 0.9em;
                color: #00ffcc;
                font-weight: bold;
            }
        `;
        this.appendChild(style);

        Object.keys(this._data).forEach(key => {
            const band = document.createElement('div');
            band.className = 'control-band';

            const label = document.createElement('label');
            label.textContent = key.toUpperCase();

            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = '-12'; // Rangos típicos de ecualización en dB
            slider.max = '12';
            slider.value = this._data[key];
            this.sliders[key] = slider;

            const display = document.createElement('span');
            display.className = 'value-tag';
            display.textContent = `${slider.value} dB`;
            this.sliders[`${key}Display`] = display;

            band.appendChild(label);
            band.appendChild(slider);
            band.appendChild(display);
            container.appendChild(band);
        });

        this.appendChild(container);
    }

    setupEvents() {
        Object.keys(this._data).forEach(key => {
            this.sliders[key].addEventListener('input', (e) => {
                const val = parseInt(e.target.value);
                this._data[key] = val;
                this.sliders[`${key}Display`].textContent = `${val} dB`;
            });
        });
    }

    updateUI() {
        Object.keys(this._data).forEach(key => {
            if (this.sliders[key]) {
                this.sliders[key].value = this._data[key];
                this.sliders[`${key}Display`].textContent = `${this._data[key]} dB`;
            }
        });
    }

    // Métodos obligatorios que pidió el profe
    getData() {
        return { ...this._data };
    }

    setData(newData) {
        this._data = { ...this._data, ...newData };
        this.updateUI();
    }
}

// Registro del WebComponent
customElements.define('graphic-equalizer', GraphicEqualizer);