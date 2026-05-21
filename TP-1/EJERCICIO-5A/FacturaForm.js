class FacturaForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                form { display: flex; flex-direction: column; gap: 10px; max-width: 500px; font-family: sans-serif; }
                .row { display: flex; gap: 10px; }
                label { display: flex; flex-direction: column; flex: 1; font-size: 12px; }
                input { padding: 5px; font-size: 14px; }
                button { padding: 10px; background-color: #007bff; color: white; border: none; cursor: pointer; font-weight: bold; }
            </style>
            <form id="afip-form">
                <h3>Carga de Comprobante - Tipo B</h3>
                <div class="row">
                    <label>Punto de Venta: <input type="text" id="ptovta" value="0002"></label>
                    <label>Nro. Comprobante: <input type="text" id="numcomp" value="00000641"></label>
                </div>
                <label>Fecha de Emisión: <input type="date" id="fecha" value="2016-07-27"></label>
                <label>Razon Social Emisor: <input type="text" id="emisor" value="Prestador Salud S.A."></label>
                <label>CUIT Receptor: <input type="text" id="cuit_rec" value="30522763922"></label>
                <label>Denominación Receptor: <input type="text" id="razon_rec" value="INSTITUTO NACIONAL DE SERVICIOS SOCIALES PARA JUBILADOS Y PE"></label>
                <label>Subtotal General ($): <input type="number" id="subtotal" value="336583.16" step="0.01"></label>
                <button type="button" id="btnGenerar">Generar Factura</button>
            </form>
        `;

        this.shadowRoot.getElementById('btnGenerar').addEventListener('click', () => this.abrirGrafica());
    }

    abrirGrafica() {
        const datos = {
            ptovta: this.shadowRoot.getElementById('ptovta').value,
            numcomp: this.shadowRoot.getElementById('numcomp').value,
            fecha: this.shadowRoot.getElementById('fecha').value,
            emisor: this.shadowRoot.getElementById('emisor').value,
            cuit_rec: this.shadowRoot.getElementById('cuit_rec').value,
            razon_rec: this.shadowRoot.getElementById('razon_rec').value,
            subtotal: this.shadowRoot.getElementById('subtotal').value
        };

        const nuevaVentana = window.open('', '_blank');
        nuevaVentana.document.write(`
            <html>
            <head>
                <title>Factura Original B</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .border-box { border: 2px solid #000; padding: 10px; position: relative; }
                    .tipo-comprobante { border: 2px solid #000; font-size: 30px; font-weight: bold; width: 50px; text-align: center; margin: 0 auto; background: #fff; }
                    .header-table { width: 100%; display: flex; justify-content: space-between; margin-bottom: 20px; }
                    .half { width: 48%; }
                    .totales { text-align: right; font-size: 18px; font-weight: bold; margin-top: 30px; }
                </style>
            </head>
            <body>
                <div class="border-box">
                    <div class="tipo-comprobante">B<br><span style="font-size:10px;">COD. 06</span></div>
                    <div class="header-table">
                        <div class="half">
                            <h2>${datos.emisor}</h2>
                            <p>Condición frente al IVA: Responsable Inscripto</p>
                        </div>
                        <div class="half" style="text-align: right;">
                            <h2>FACTURA</h2>
                            <p>Punto de Venta: ${datos.ptovta} Comp. Nro: ${datos.numcomp}</p>
                            <p>Fecha de Emisión: ${datos.fecha}</p>
                        </div>
                    </div>
                    <hr>
                    <div>
                        <p><strong>CUIT:</strong> ${datos.cuit_rec}</p>
                        <p><strong>Apellido y Nombre / Razón Social:</strong> ${datos.razon_rec}</p>
                    </div>
                    <div class="totales">
                        <p>Importe Total: $${datos.subtotal}</p>
                    </div>
                </div>
            </body>
            </html>
        `);
        nuevaVentana.document.close();
    }
}
customElements.define('factura-form', FacturaForm);