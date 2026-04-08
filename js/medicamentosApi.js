// URL de nuestra API (MockAPI)
const API_URL = 'https://69cdf53233a09f831b7cb3af.mockapi.io/medicamentos';

// 1. GET (Obtener datos)
export async function obtenerDatos() {
    try {
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

// 2. POST (Insertar datos)
export async function crearDato(nuevoMedicamento) {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoMedicamento)
        });
        return await respuesta.json();
    } catch (error) {
        console.error('Error al crear medicamento:', error);
        return null;
    }
}

// 3. PUT (Actualizar datos)
export async function actualizarDato(id, registroActualizado) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registroActualizado)
        });

        const datos = await respuesta.json();
        return datos;

    } catch (error) {
        console.error('Error en PUT:', error);
        return null;
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
        return datos;
    } catch (error) {
        console.error('Error en DELETE:', error);
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