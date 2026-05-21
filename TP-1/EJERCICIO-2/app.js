let fechaValida = false;
let reintentos = 0;
const regexFecha = /^\d{4}-\d{2}-\d{2}$/; // Formato sugerido YYYY-MM-DD para validación limpia

while (!fechaValida) {
    let mensaje = reintentos === 0 
        ? "Ingresá tu fecha de nacimiento (Formato: YYYY-MM-DD):" 
        : `[Error - Reintento N° ${reintentos}] El texto suministrado es inválido. Volvé a ingresar la fecha (YYYY-MM-DD):`;
    
    let entrada = prompt(mensaje);
    
    // Si el usuario cancela el prompt
    if (entrada === null) {
        alert("Operación cancelada.");
        break;
    }

    // Validar formato básico y si es una fecha real
    const timestamp = Date.parse(entrada);
    if (regexFecha.test(entrada) && !isNaN(timestamp)) {
        fechaValida = true;
        alert(`Fecha registrada con éxito: ${entrada}. ¡Gracias!`);
    } else {
        reintentos++;
    }
}