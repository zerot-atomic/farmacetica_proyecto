import { getDatos, iniciar } from './medicamentosApi.js';

// BÚSQUEDA EN TIEMPO REAL
// Filtra medicamentos mientras el usuario escribe
// Solo busca en los datos cacheados (sin hacer peticiones a API)
async function filtrarDatos() {
    const formulario = document.querySelector('#formulario');
    const resultado = document.querySelector('#resultado');
    
    // Normalizar a minúsculas para búsqueda
    const texto = formulario.value.toLowerCase().trim();

    resultado.innerHTML = '';

    // Busca coincidencias en el nombre comercial del medicamento
    const filtrados = getDatos().filter(item =>
        item.nombreComercial.toLowerCase().includes(texto)
    );

    if (filtrados.length === 0) {
        resultado.innerHTML = `<li>No se encontraron resultados para "<b>${texto}</b>"</li>`;
        return; // Detener la ejecución
    }
    filtrados.forEach(item => {
        resultado.innerHTML += `<li><a href="${item.link}">${item.nombreComercial}</a> - ${item.descripcion}</li>`; 
    });
}

// INICIALIZACIÓN - Caché primario
// Función que se ejecuta al cargar la página:
// Carga todos los medicamentos en memoria (datos cacheados)
// El caché evita múltiples peticiones a API durante la búsqueda
async function main() {
    await iniciar(); // Carga el caché antes de permitir búsquedas
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('keyup', filtrarDatos);
}

main();
