class ValidadorFecha extends HTMLElement {
    constructor() {
        super();
    }

    // El ciclo de vida: cuando el componente se monta, creamos la UI y los eventos
    connectedCallback() {
        this.buildUI();
    }

    buildUI() {
        // 1. Creamos el contenedor principal
        const container = document.createElement('div');
        container.className = 'container';

        // Estilos dinámicos inyectados por JS (opcional, para que no quede feo)
        const style = document.createElement('style');
        style.textContent = `
            .container {
                font-family: Arial, sans-serif;
                padding: 20px;
                background: #f4f4f9;
                border-radius: 8px;
                max-width: 400px;
                margin: 20px auto;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                text-align: center;
            }
            h2 { color: #333; }
            button {
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
            }
            button:hover { background-color: #0056b3; }
        `;
        this.appendChild(style);

        // 2. Creamos el título
        const h2 = document.createElement('h2');
        h2.textContent = 'Ejercicio 2: Validación de Fecha de Nacimiento';
        container.appendChild(h2);

        // 3. Creamos el texto descriptivo
        const p = document.createElement('p');
        p.textContent = 'Hacé clic abajo para ingresar y validar tu fecha:';
        container.appendChild(p);

        // 4. Creamos el botón nativamente
        const btn = document.createElement('button');
        btn.textContent = 'Validar Fecha';

        // LA CORRECCIÓN CLAVE: Asignamos el evento con la API del DOM, no en el HTML
        btn.addEventListener('click', () => {
            this.ejecutarLogicaValidacion();
        });
        container.appendChild(btn);

        // 5. Metemos todo el bloque dentro de nuestro WebComponent (this)
        this.appendChild(container);
    }

    // Separamos la lógica del negocio en un método limpio
    ejecutarLogicaValidacion() {
        let fechaValida = false;
        let reintentos = 0;

        while (!fechaValida) {
            // Si ya hubo errores, sumamos el reintento antes de pedir
            let mensajePrompt = reintentos === 0 
                ? "Por favor, ingresá tu fecha de nacimiento (AAAA-MM-DD o DD/MM/AAAA):"
                : `Error número [${reintentos}]: El texto suministrado es inválido.\nPor favor, ingresá una fecha válida:`;

            const entrada = prompt(mensajePrompt);

            // Si el usuario cancela el prompt, salimos del bucle
            if (entrada === null) break;

            // Validación básica de la fecha
            fechaValida = this.validarFecha(entrada);

            if (!fechaValida) {
                reintentos++;
            } else {
                alert(`¡Fecha válida ingresada con éxito! Reintentos: ${reintentos}`);
            }
        }
    }

    // Función auxiliar para comprobar si la cadena es una fecha real
    validarFecha(cadena) {
        // Intentamos parsear la fecha. Es compatible con formatos estándar como YYYY-MM-DD o MM/DD/YYYY
        // Nota: Si usas formato DD/MM/AAAA estricto, a veces requiere cambiar las barras por guiones según el navegador
        const timestamp = Date.parse(cadena.replace(/\//g, "-"));
        
        if (isNaN(timestamp)) {
            return false;
        }

        // Aseguramos que no sea una fecha loca o vacía
        const fecha = new Date(timestamp);
        return fecha instanceof Date && !isNaN(fecha.getTime());
    }
}

// Registramos el componente con el mismo nombre que usaste en el index.html
customElements.define('validador-fecha', ValidadorFecha);