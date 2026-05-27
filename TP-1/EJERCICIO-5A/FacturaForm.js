class AfipInvoiceForm extends HTMLElement {
    constructor() {
        super();
        this.formData = {};
    }

    connectedCallback() {
        this.buildUI();
    }

    buildUI() {
        const container = document.createElement('div');
        container.className = 'form-container';

        const style = document.createElement('style');
        style.textContent = `
            .form-container {
                font-family: Arial, sans-serif;
                max-width: 500px;
                margin: 20px auto;
                padding: 25px;
                background: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            .form-group {
                display: flex;
                flex-direction: column;
                margin-bottom: 15px;
            }
            .form-group label {
                font-weight: bold;
                margin-bottom: 5px;
                color: #2c3e50;
            }
            .form-group input {
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            .btn-group {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }
            .btn {
                flex: 1;
                padding: 10px;
                border: none;
                border-radius: 4px;
                font-weight: bold;
                cursor: pointer;
            }
            .btn-generate { background-color: #0056b3; color: white; }
            .btn-pdf { background-color: #28a745; color: white; }
        `;
        this.appendChild(style);

        const h2 = document.createElement('h2');
        h2.textContent = 'Carga de Factura AFIP';
        container.appendChild(h2);

        // Definimos los campos que necesitamos procesar
        const campos = [
            { id: 'cuit', label: 'CUIT Emisor', type: 'text' },
            { id: 'cliente', label: 'Razón Social Cliente', type: 'text' },
            { id: 'monto', label: 'Importe Total ($)', type: 'number' }
        ];

        this.inputs = {};

        campos.forEach(campo => {
            const group = document.createElement('div');
            group.className = 'form-group';

            const label = document.createElement('label');
            label.textContent = campo.label;

            const input = document.createElement('input');
            input.type = campo.type;
            input.id = campo.id;

            group.appendChild(label);
            group.appendChild(input);
            container.appendChild(group);

            // Guardamos referencias limpias
            this.inputs[campo.id] = input;
        });

        // Botonera de acciones
        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group';

        const btnGen = document.createElement('button');
        btnGen.className = 'btn btn-generate';
        btnGen.textContent = 'Generar Factura (Nueva Pestaña)';
        btnGen.addEventListener('click', () => this.abrirPestañaGrafica());

        const btnPdf = document.createElement('button');
        btnPdf.className = 'btn btn-pdf';
        btnPdf.textContent = 'Imprimir / Guardar PDF';
        btnPdf.addEventListener('click', () => this.exportarDirectoPDF());

        btnGroup.appendChild(btnGen);
        btnGroup.appendChild(btnPdf);
        container.appendChild(btnGroup);

        this.appendChild(container);
    }

    capturarDatos() {
        return {
            cuit: this.inputs.cuit.value || '00-00000000-0',
            cliente: this.inputs.cliente.value || 'Consumidor Final',
            monto: this.inputs.monto.value || '0'
        };
    }

    abrirPestañaGrafica() {
        const datos = this.capturarDatos();
        const nuevaVentana = window.open('', '_blank');
        
        // Estructura visual para la nueva pestaña del diseño base de la factura
        nuevaVentana.document.write(`
            <html>
            <head>
                <title>Factura Electrónica AFIP</title>
                <style>
                    body { font-family: 'Courier New', monospace; padding: 40px; background: #eee; }
                    .factura-box { max-width: 800px; margin: auto; background: white; padding: 30px; border: 2px solid #000; }
                    .header-afip { display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 20px; }
                    .tipo-comprobante { border: 1px solid #000; padding: 10px 20px; font-size: 24px; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="factura-box">
                    <div class="header-afip">
                        <div>
                            <h1>ORIGINAL</h1>
                            <p><strong>CUIT Emisor:</strong> ${datos.cuit}</p>
                        </div>
                        <div class="tipo-comprobante">A</div>
                        <div>
                            <h2>FACTURA</h2>
                        </div>
                    </div>
                    <div style="margin: 30px 0;">
                        <p><strong>Cliente:</strong> ${datos.cliente}</p>
                    </div>
                    <h2 style="text-align: right;">TOTAL: $${datos.monto}</h2>
                </div>
            </body>
            </html>
        `);
        nuevaVentana.document.close();
    }

    exportarDirectoPDF() {
        // Ejecuta la función nativa de impresión del navegador
        // que permite guardar como PDF directamente de manera nativa sin librerías pesadas externas.
        window.print();
    }
}

customElements.define('afip-invoice-form', AfipInvoiceForm);