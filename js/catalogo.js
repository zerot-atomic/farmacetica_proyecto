import { obtenerDatos, eliminarDato } from '../js/medicamentosApi.js';

const tbody = document.getElementById('catalogo-body');

// Obtener los datos de la API
async function cargarCatalogo() {
    try {
        const medicamentos = await obtenerDatos();  
        renderizarTabla(medicamentos);
        agregarEventosEliminar();
    } catch (error) {
        console.error('Error al cargar el catálogo:', error);
        tbody.innerHTML = '<tr><td colspan="4">Error al cargar los datos</td></tr>';
    }
}

// Dibuja la tabla con los datos obtenidos de la API
// Poner los IDs de medicamentos en los botones para identificarlos en eventos
function renderizarTabla(medicamentos) {
    tbody.innerHTML = ''; // Limpia filas anteriores

    medicamentos.forEach(medicamento => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${medicamento.nombreComercial}</td>
            <td>${medicamento.stock || 0} unidades</td>
            <td>$${medicamento.precio || 'N/A'}</td>
            <td>
                <div class="btn-grupo">
                    <a class="btn-tabla" href="detalle-medicamento.html?id=${medicamento.id}">
                        Ver detalles
                    </a>
                    <a class="btn-tabla btn-actualizar" href="editar-medicamento.html?id=${medicamento.id}">
                        Actualizar
                    </a>
                    <button class="btn-tabla btn-eliminar" data-id="${medicamento.id}">
                        Eliminar
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// Asigna listeners a todos los botones de eliminar
// Maneja la confirmación y ejecuta la petición DELETE a la API
function agregarEventosEliminar() {
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;

            // Solicita confirmación antes de eliminar
            if (confirm('¿Estás seguro de que deseas eliminar este medicamento?')) {
                try {
                    // Ejecuta la operación DELETE en la API
                    await eliminarDato(id);
                    alert('Medicamento eliminado exitosamente');
                    // Remueve la fila del DOM inmediatamente
                    e.target.closest('tr').remove();
                } catch (error) {
                    alert('Error al eliminar el medicamento');
                    console.error(error);
                }
            }
        });
    });
}

// Se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', cargarCatalogo);