// importar función para obtener datos de la API de medicamentos (por ID específico)
import { obtenerMedicamentoPorId } from '../js/medicamentosApi.js';

// Leer el parámetro ?id= desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// CARGA DE DETALLES DEL MEDICAMENTO
// Obtiene los datos del medicamento específico de la API
async function cargarDetalle() {
    if (!id) {
        document.getElementById("detalle").innerHTML = "<p>ID de medicamento no proporcionado.</p>";
        return;
    }

    try {
        // Petición GET específica para este medicamento
        const medicamento = await obtenerMedicamentoPorId(id);

        // Actualiza el título de la pestaña del navegador
        document.title = "Detalle - " + medicamento.nombreComercial;

        // Inyectar los datos en el DOM
        // Usa 'N/A' como fallback si el campo no existe en la API
        document.getElementById("nombre").textContent = medicamento.nombreComercial;
        document.getElementById("descripcion").textContent = medicamento.descripcion || 'N/A';
        document.getElementById("sustanciaActiva").textContent = medicamento.sustanciaActiva || 'N/A';
        document.getElementById("laboratorio").textContent = medicamento.laboratorio || 'N/A';
        document.getElementById("presentacion").textContent = medicamento.presentacion || 'N/A';
        document.getElementById("stock").textContent = medicamento.stock || 0;
        document.getElementById("precio").textContent = `$${medicamento.precio}` || '$0.00';
    } catch (error) {
        console.error('Error al cargar el detalle:', error);
        document.getElementById("detalle").innerHTML = "<p>Medicamento no encontrado.</p>";
    }
}

// Cargar el detalle al cargar la página
document.addEventListener('DOMContentLoaded', cargarDetalle);