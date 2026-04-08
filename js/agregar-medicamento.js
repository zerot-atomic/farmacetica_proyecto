import { crearDato } from './medicamentosApi.js';
import { validarDatos } from './validar-medicamento.js';

const formulario = document.getElementById('formulario-medicamento');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // evita recarga

    // Crear un objeto con los datos del formulario
    const nuevoMedicamento = {
        nombreComercial: document.getElementById('nombreComercial').value,
        sustanciaActiva: document.getElementById('sustanciaActiva').value,
        laboratorio: document.getElementById('laboratorio').value,
        presentacion: document.getElementById('presentacion').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value) || 0,
        stock: parseInt(document.getElementById('stock').value, 10) || 0
    };

    // Validaciones básicas
    if (!validarDatos(nuevoMedicamento)) {            
        return;
    }

    try {
        // Mandar el nuevo medicamento a la API para que lo guarde
        const resultado = await crearDato(nuevoMedicamento);
        // console.log('Resultado de crearDato:', resultado);
        if (resultado) {
            alert(`Medicamento "${nuevoMedicamento.nombreComercial}" agregado exitosamente.`);
            window.location.href = 'catalogo.html';
        } else {
            alert('Error al agregar el medicamento. Inténtalo de nuevo.');
        }    
    } catch (error) {
        alert('Error inesperado al guardar el medicamento.');
        console.error(error);
    }
    
});
