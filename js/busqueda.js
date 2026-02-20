// Base de datos de prueba: Inventario de Farmacia
const baseDeDatos = [

];

const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const filtrar = () => {
    resultado.innerHTML = '';

    // Obtener lo que el usuario escribió y lo pasamos a minúsculas
    const texto = formulario.value.toLowerCase().trim();

    // filter crea una lista nueva con los elementos que coincidan
    const encontrados = baseDeDatos.filter(item => 
        item.titulo.toLowerCase().includes(texto) // include es el filtro
    );

    if (encontrados.length === 0) {
        resultado.innerHTML = `<li>No se encontraron resultados para "<b>${texto}</b>"</li>`;
        return; // Detener la ejecución
    }
    encontrados.forEach(item => {
        resultado.innerHTML += `<li><a href="${item.link}">${item.titulo}</a> - ${item.descripcion}</li>`;
    });
}

// EVENTO (Escuchamos cada tecla que presionas)
formulario.addEventListener('keyup', filtrar);