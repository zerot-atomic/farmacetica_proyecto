// Validaciones para formularios de medicamentos (actualización y creación)
export function validarDatos(medicamento) {
    if (!medicamento.nombreComercial || !medicamento.sustanciaActiva ||
        !medicamento.laboratorio || !medicamento.presentacion ||
        !medicamento.descripcion || !medicamento.precio || medicamento.stock === null) {
        alert('Todos los campos son obligatorios.');
        return false;
    }

    if (medicamento.precio < 0) {
        alert('El precio debe ser un número válido y positivo.');
        return false;
    }

    if (medicamento.stock < 0) {
        alert('El stock debe ser un número válido y positivo.');
        return false;
    }

    if (medicamento.nombreComercial.length < 3) {
        alert('El nombre comercial debe tener al menos 3 caracteres.');
        return false;
    }

    if (medicamento.descripcion.length < 10) {
        alert('La descripción debe tener al menos 10 caracteres.');
        return false;
    }

    return true;
}
