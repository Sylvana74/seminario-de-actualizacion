class ClimaMdp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Estado de la unidad de medida: 'C' o 'F'
        this.unidad = 'C';

        // Estructura de datos origen basados en la imagen provista
        this.datosClima = {
            meses: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            tempMaxAbs: [42.4, 38.1, 36.3, 32.5, 27.4, 22.2, 27.7, 24.7, 28.8, 34.4, 35.7, 39.4],
            tempMaxMedia: [26.3, 25.8, 23.7, 20.5, 16.8, 13.8, 13.1, 14.4, 16.0, 18.5, 21.7, 24.4],
            tempMedia: [20.3, 19.9, 18.0, 14.6, 11.3, 8.5, 8.1, 8.9, 10.5, 13.1, 15.9, 18.5],
            tempMinMedia: [14.3, 14.1, 12.5, 9.1, 6.4, 4.1, 3.8, 4.0, 5.3, 7.6, 10.1, 12.7],
            tempMinAbs: [4.7, 1.2, 1.9, -1.0, -3.0, -5.5, -9.3, -6.4, -5.5, -3.0, -2.0, -0.2]
        };

        this.render();
    }

    // Método solicitado Ejercicio 6: Obtener promedio de todas las temperaturas representadas
    getPromedioTemperaturas() {
        const todas = [
            ...this.datosClima.tempMaxAbs,
            ...this.datosClima.tempMaxMedia,
            ...this.datosClima.tempMedia,
            ...this.datosClima.tempMinMedia,
            ...this.datosClima.tempMinAbs
        ];
        const suma = todas.reduce((acc, val) => acc + val, 0);
        return (suma / todas.length).toFixed(2);
    }

    // Auxiliar de conversión
    convertir(valor) {
        if (this.unidad === 'F') {
            return ((valor * 9/5) + 32).toFixed(1);
        }
        return valor.toFixed(1);
    }

    alternarUnidad() {
        this.unidad = this.unidad === 'C' ? 'F' : 'C';
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                table { border-collapse: collapse; font-family: Arial, sans-serif; font-size: 12px; width: 100%; text-align: center; }
                th, td { border: 1px solid #ccc; padding: 6px; }
                .title { background-color: #f2f2f2; font-weight: bold; text-align: left; }
                .btn-container { margin-bottom: 10px; }
                button { padding: 6px 12px; background-color: #28a745; color: white; border: none; cursor: pointer; font-weight: bold; }
                .metric-box { margin-top: 10px; font-weight: bold; font-family: sans-serif; }
            </style>
            
            <div class="btn-container">
                <button id="btnUnidad">Alternar a °${this.unidad === 'C' ? 'F' : 'C'}</button>
            </div>

            <table>
                <thead>
                    <tr style="background-color: #e6f2ff;">
                        <th>Mes</th>
                        ${this.datosClima.meses.map(m => `<th>${m}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="title">Temp. máx. abs (°${this.unidad})</td>
                        ${this.datosClima.tempMaxAbs.map(v => `<td>${this.convertir(v)}</td>`).join('')}
                    </tr>
                    <tr>
                        <td class="title">Temp. máx. media (°${this.unidad})</td>
                        ${this.datosClima.tempMaxMedia.map(v => `<td>${this.convertir(v)}</td>`).join('')}
                    </tr>
                    <tr>
                        <td class="title">Temp. media (°${this.unidad})</td>
                        ${this.datosClima.tempMedia.map(v => `<td>${this.convertir(v)}</td>`).join('')}
                    </tr>
                    <tr>
                        <td class="title">Temp. mín. media (°${this.unidad})</td>
                        ${this.datosClima.tempMinMedia.map(v => `<td>${this.convertir(v)}</td>`).join('')}
                    </tr>
                    <tr>
                        <td class="title">Temp. mín. abs (°${this.unidad})</td>
                        ${this.datosClima.tempMinAbs.map(v => `<td>${this.convertir(v)}</td>`).join('')}
                    </tr>
                </tbody>
            </table>

            <div class="metric-box">
                Promedio Histórico Total: ${this.getPromedioTemperaturas()} °C
            </div>
        `;

        this.shadowRoot.getElementById('btnUnidad').addEventListener('click', () => this.alternarUnidad());
    }
}
customElements.define('clima-mdp', ClimaMdp);