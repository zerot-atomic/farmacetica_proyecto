// URL de nuestra API (MockAPI)
const API_URL = 'https://69cdf53233a09f831b7cb3af.mockapi.io/medicamentos';
let datosGlobal = []; // Almacena datos en caché para evitar peticiones repetidas

// 1. GET (Leer / Obtener datos)
export async function obtenerDatos() {
    try {
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

// Obtiene los detalles de un medicamento específico
// Utilizado en la página de detalle del medicamento
export async function obtenerMedicamentoPorId(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        const medicamento = await respuesta.json();
        return medicamento;
    } catch (error) {
        console.error('Error al obtener medicamento:', error);
    }
}

// 4. DELETE (Eliminar datos)
// Se ejecuta desde el catálogo al hacer clic en 'Eliminar'
export async function eliminarDato(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        const datos = await respuesta.json();
        alert(`Medicamento "${datos.nombreComercial}" eliminado.`);
    } catch (error) {
        console.error('Error en DELETE:', error);
    }
}

// CACHÉ DE DATOS - Optimización
// Carga los datos una sola vez al iniciar la aplicación
// Almacena los resultados en memoria para evitar múltiples peticiones
export async function iniciar() {
    datosGlobal = await obtenerDatos();
}

// Retorna los datos cacheados
// Utilizado tanto en búsqueda como en inicialización
export function getDatos() {
    return datosGlobal;
}
