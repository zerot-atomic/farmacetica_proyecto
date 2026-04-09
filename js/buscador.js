// importar función para obtener datos de la API de medicamentos
import { obtenerDatos } from './medicamentosApi.js';

function obtenerTexto() {
    const search_input = document.querySelector('#input-busqueda');
    const user_text = search_input.value.toLowerCase().trim();
    return user_text;
}

async function filtrarMedicamentos() {
    const texto = obtenerTexto();

    // llamamos a la función que obtiene los datos de la API
    const medicamentos  = await obtenerDatos();

    // Busca coincidencias en el nombre comercial del medicamento
    const filtrados = medicamentos.filter(item =>
        item.nombreComercial.toLowerCase().includes(texto)
    );
    console.log('Medicamentos filtrados:', filtrados);
    console.log('Texto de búsqueda:', texto);
    return { filtrados, texto };
}

function mostrarResultados(filtrados, texto) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';
    
    console.log('Resultados encontrados:', filtrados.length);
    if (filtrados.length === 0) {
        resultado.innerHTML = `<li>No se encontraron resultados para "<b>${texto}</b>"</li>`;
        return; // Detener la ejecución
    }
  
    let html = `<li>Resultados para "<b>${texto}</b>":</li>`;
    filtrados.forEach(med => {
        html += `
        <li>
            <a href="pages/detalle-medicamento.html?id=${med.id}">${med.nombreComercial}</a> - ${med.descripcion}
        </li>
        `;
    });

    resultado.innerHTML = html;
}

// Agrega un listener al botón de búsqueda para ejecutar la función de filtrado
const btnBuscar = document.querySelector('#btn-buscar');
btnBuscar.addEventListener('click', () => {
    filtrarMedicamentos().then(({ filtrados, texto }) => {
        mostrarResultados(filtrados, texto);
    });
});