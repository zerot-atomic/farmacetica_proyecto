<<<<<<< HEAD
// Base de datos de prueba: Inventario de Farmacia
const baseDeDatos = [
    { 
        id: "paracetamol",
        titulo: "Paracetamol 500mg", 
        descripcion: "Analgésico y antipirético indicado para el alivio del dolor leve a moderado y la fiebre.", 
        link: "pages/detalle-medicamento.html?id=paracetamol" 
    },
    { 
        id: "amoxicilina",
        titulo: "Amoxicilina 250mg", 
        descripcion: "Antibiótico de amplio espectro utilizado para el tratamiento de infecciones bacterianas.", 
        link: "pages/detalle-medicamento.html?id=amoxicilina" 
    },
    { 
        id: "omeprazol",
        titulo: "Omeprazol 20mg", 
        descripcion: "Inhibidor de la bomba de protones empleado para el tratamiento del reflujo gastroesofágico.", 
        link: "pages/detalle-medicamento.html?id=omeprazol" 
    }
];
=======
// Cargar la base de datos desde el archivo JSON
let baseDeDatos = [];

// Función para cargar los datos
const cargarDatos = async () => {
    const response = await fetch('../js/catalogo.json');
    baseDeDatos = await response.json();
};

// Inicializar la carga de datos
cargarDatos();
>>>>>>> debug

const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const filtrar = () => {
    resultado.innerHTML = '';

    // Obtener lo que el usuario escribió y lo pasamos a minúsculas
    const texto = formulario.value.toLowerCase().trim();

    // filter crea una lista nueva con los elementos que coincidan
    const encontrados = baseDeDatos.filter(item => 
        item.nombre.toLowerCase().includes(texto) // Cambiado a 'nombre'
    );

    if (encontrados.length === 0) {
        resultado.innerHTML = `<li>No se encontraron resultados para "<b>${texto}</b>"</li>`;
        return; // Detener la ejecución
    }
    encontrados.forEach(item => {
        resultado.innerHTML += `<li><a href="${item.link}">${item.nombre}</a> - ${item.descripcion}</li>`; // Cambiado a 'nombre'
    });
}

// EVENTO (Escuchamos cada tecla que presionas)
formulario.addEventListener('keyup', filtrar);