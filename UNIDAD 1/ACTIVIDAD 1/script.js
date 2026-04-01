// Obtenemos la pantalla para usarla en las funciones
const pantalla = document.getElementById('pantalla');

// Agrega números u operadores a la pantalla
function agregar(valor) {
    if (pantalla.value === "0") {
        pantalla.value = valor;
    } else {
        pantalla.value += valor;
    }
}

// Borra todo y vuelve a 0
function limpiar() {
    pantalla.value = "0";
}

// Resuelve la operación
function calcular() {
    try {
        // eval() toma el texto de la pantalla y hace la matemática
        pantalla.value = eval(pantalla.value);
    } catch (error) {
        pantalla.value = "Error";
        setTimeout(limpiar, 1500); // Borra el error después de 1.5 seg
    }
}