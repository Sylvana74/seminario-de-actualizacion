// Solicitud de datos
let nombre = prompt("Por favor, ingresá tu nombre:") || "";
let apellido = prompt("Por favor, ingresá tu apellido:") || "";

// Procesamiento de cadenas
nombre = nombre.trim();
apellido = apellido.trim();

if (nombre && apellido) {
    // Formatear Apellido a MAYÚSCULAS
    const apellidoFormateado = apellido.toUpperCase();
    
    // Formatear Nombre a Primera Mayúscula y el resto minúscula
    const nombreFormateado = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
    
    // Mostrar saludo
    alert(`¡Buenos días ${apellidoFormateado}, ${nombreFormateado}!`);
} else {
    alert("Los datos ingresados no son válidos.");
}