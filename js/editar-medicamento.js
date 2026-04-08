import { obtenerMedicamentoPorId, actualizarDato } from './medicamentosApi.js';
import { validarDatos } from './validar-medicamento.js';

// Obtener el ID del medicamento desde la URL
const params = new URLSearchParams(window.location.search);
const idMedicamento = params.get('id');

const formulario = document.getElementById('formulario-editar');

// Cargar los datos del medicamento al abrir la página
async function cargarDatosMedicamento() {
    if (!idMedicamento) {
        alert('ID de medicamento no proporcionado');
        window.location.href = 'catalogo.html';
        return;
    }

    try {
        // Obtener datos del medicamento desde la API
        const medicamento = await obtenerMedicamentoPorId(idMedicamento);
        if (!medicamento) {
            alert('Medicamento no encontrado');
            window.location.href = 'catalogo.html';
            return;
        }

        // Llenar el formulario con los datos existentes
        document.getElementById('nombreComercial').value = medicamento.nombreComercial || '';
        document.getElementById('sustanciaActiva').value = medicamento.sustanciaActiva || '';
        document.getElementById('laboratorio').value = medicamento.laboratorio || '';
        document.getElementById('presentacion').value = medicamento.presentacion || '';
        document.getElementById('descripcion').value = medicamento.descripcion || '';
        document.getElementById('precio').value = medicamento.precio || '';
        document.getElementById('stock').value = medicamento.stock || '';
    } catch (error) {
        console.error('Error al cargar datos del medicamento:', error);
        alert('Error al cargar los datos del medicamento');
        window.location.href = 'catalogo.html';
    }
}

// Manejar el envío del formulario para actualizar
formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Objeto con datos del formulario actualizados
    const datosActualizados = {
        nombreComercial: document.getElementById('nombreComercial').value,
        sustanciaActiva: document.getElementById('sustanciaActiva').value,
        laboratorio: document.getElementById('laboratorio').value,
        presentacion: document.getElementById('presentacion').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value, 10)
    };

    // Validar datos
    if (!validarDatos(datosActualizados)) {
        return;
    }

    try {
        // Llamar a la función de actualización
        const resultado = await actualizarDato(idMedicamento, datosActualizados);

        if (resultado) {
            alert(`Medicamento "${resultado.nombreComercial}" actualizado exitosamente.`);
            window.location.href = 'catalogo.html';
        } else {
            console.error('Error en actualización:');
            alert('Error al actualizar el medicamento.');
        }
    } catch (error) {
        console.error('Error inesperado:', error);
        alert('Error inesperado al actualizar el medicamento.');
    }
});

// Paso 4: Inicializar la página cargando los datos
document.addEventListener('DOMContentLoaded', cargarDatosMedicamento);
