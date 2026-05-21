class GraphicEq extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Estructura interna de datos por defecto (Frecuencia: Ganancia en dB)
        this._data = {
            "32Hz": 0, "64Hz": 0, "130Hz": 0, "260Hz": 0, "500Hz": 0,
            "1k": 0, "2k": 0, "4k": 0, "8.3k": 0, "16.5k": 0
        };

        this.render();
    }

    getData() {
        return { ...this._data };
    }

    setData(newData) {
        // Actualizamos el objeto interno de datos
        this._data = { ...this._data, ...newData };
        // Actualizamos la vista inmediatamente
        this.updateSliders();
    }

    updateSliders() {
        Object.keys(this._data).forEach(freq => {
            const slider = this.shadowRoot.getElementById(`input-${freq}`);
            const label = this.shadowRoot.getElementById(`label-${freq}`);
            if (slider && label) {
                slider.value = this._data[freq];
                label.textContent = (this._data[freq] >= 0 ? '+' : '') + this._data[freq] + 'dB';
            }
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .window {
                    background-color: #d4d0c8;
                    border: 2px solid;
                    border-color: #fff #404040 #404040 #fff;
                    font-family: 'Tahoma', 'Arial', sans-serif;
                    font-size: 11px;
                    width: 550px;
                    padding: 4px;
                    box-shadow: 1px 1px 0 0 #000;
                }
                .title-bar {
                    background: linear-gradient(90deg, #000080, #1084d0);
                    color: white;
                    padding: 3px 4px;
                    font-weight: bold;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .controls-container {
                    display: flex;
                    justify-content: space-around;
                    background: #d4d0c8;
                    padding: 10px;
                    margin-top: 5px;
                    border: 2px inset #fff;
                }
                .fader-cell {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    width: 48px;
                    height: 170px;
                    border: 1px solid #808080;
                    background-color: #d4d0c8;
                    padding: 6px 0;
                    box-sizing: border-box;
                }
                .freq-title {
                    font-size: 11px;
                    font-weight: bold;
                    color: #000;
                }
                input[type=range] {
                    -webkit-appearance: none;
                    writing-mode: bt-lr;
                    appearance: slider-vertical;
                    width: 12px;
                    height: 100px;
                    background: transparent;
                    margin: 0;
                }
                input[type=range]:focus { 
                    outline: none; 
                }
                input[type=range]::-webkit-slider-thumb {
                    height: 11px;
                    width: 18px;
                    border-radius: 1px;
                    background: #d4d0c8;
                    border: 2px solid;
                    border-color: #fff #555 #555 #fff;
                    cursor: pointer;
                    -webkit-appearance: none;
                }
                .db-label {
                    font-size: 10px;
                    background: #fff;
                    border: 1px solid #808080;
                    padding: 1px 3px;
                    width: 36px;
                    text-align: center;
                }
            </style>
            
            <div class="window">
                <div class="title-bar">
                    <span>Graphic EQ</span>
                </div>
                <div class="controls-container">
                    ${Object.keys(this._data).map(freq => `
                        <div class="fader-cell">
                            <span class="freq-title">${freq}</span>
                            <input type="range" id="input-${freq}" min="-12" max="12" step="1" value="${this._data[freq]}">
                            <span class="db-label" id="label-${freq}">+0dB</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Añadir listeners para detectar cuando el usuario interactúa manualmente
        Object.keys(this._data).forEach(freq => {
            const slider = this.shadowRoot.getElementById(`input-${freq}`);
            slider.addEventListener('input', (e) => {
                this._data[freq] = parseInt(e.target.value);
                this.shadowRoot.getElementById(`label-${freq}`).textContent = 
                    (this._data[freq] >= 0 ? '+' : '') + this._data[freq] + 'dB';
                
                // Avisamos al HTML externo que hubo un cambio manual para actualizar el log negro
                this.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
        
        this.updateSliders();
    } // <-- Esta es la llave que cerraba el render() y faltaba
}

customElements.define('graphic-eq', GraphicEq);