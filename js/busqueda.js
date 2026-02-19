// Base de datos de prueba: Inventario de Farmacia
const baseDeDatos = [
    { 
        titulo: "Paracetamol 500mg", 
        descripcion: "Analgésico y antipirético indicado para el alivio del dolor leve a moderado y la fiebre.", 
        link: "pages/catalogo.html#paracetamol" 
    },
    { 
        titulo: "Amoxicilina 250mg", 
        descripcion: "Antibiótico de amplio espectro utilizado para el tratamiento de infecciones bacterianas.", 
        link: "pages/catalogo.html#amoxicilina" 
    },
    { 
        titulo: "Omeprazol 20mg", 
        descripcion: "Inhibidor de la bomba de protones empleado para el tratamiento del reflujo gastroesofágico.", 
        link: "pages/catalogo.html#omeprazol" 
    },
    { 
        titulo: "Loratadina 10mg", 
        descripcion: "Antihistamínico de segunda generación para el alivio de los síntomas de alergias.", 
        link: "pages/catalogo.html#loratadina" 
    }
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