/* filepath: js/empleados-validacion.js */

document.getElementById('registroForm').addEventListener('submit', function (e) {
    e.preventDefault();

    limpiarErrores();

    const valido = validarFormulario();

    if (valido) {
        mostrarMensaje('exito', '✅ Empleado registrado exitosamente.');
        // this.reset(); // Descomenta si quieres limpiar el form tras el envío
    } else {
        mostrarMensaje('error', '⚠️ Por favor corrige los errores antes de continuar.');
    }
});

// ── VALIDACIÓN PRINCIPAL ──────────────────────────────────────────────────────

function validarFormulario() {
    let esValido = true;

    // ── Datos Personales ──

    // Nombre: obligatorio, mínimo 2 caracteres, solo letras y espacios
    const nombre = document.getElementById('nombre').value.trim();
    if (!nombre) {
        mostrarError('nombre', 'El nombre es obligatorio.');
        esValido = false;
    } else if (nombre.length < 2) {
        mostrarError('nombre', 'El nombre debe tener al menos 2 caracteres.');
        esValido = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(nombre)) {
        mostrarError('nombre', 'El nombre solo puede contener letras y espacios.');
        esValido = false;
    }

    // Apellido: obligatorio, mínimo 2 caracteres, solo letras y espacios
    const apellido = document.getElementById('apellido').value.trim();
    if (!apellido) {
        mostrarError('apellido', 'El apellido es obligatorio.');
        esValido = false;
    } else if (apellido.length < 2) {
        mostrarError('apellido', 'El apellido debe tener al menos 2 caracteres.');
        esValido = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(apellido)) {
        mostrarError('apellido', 'El apellido solo puede contener letras y espacios.');
        esValido = false;
    }

    // Fecha de nacimiento: obligatoria, debe ser mayor de 18 años
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    if (!fechaNacimiento) {
        mostrarError('fechaNacimiento', 'La fecha de nacimiento es obligatoria.');
        esValido = false;
    } else if (!esMayorDeEdad(fechaNacimiento)) {
        mostrarError('fechaNacimiento', 'El empleado debe ser mayor de 18 años.');
        esValido = false;
    }

    // Correo: obligatorio, formato válido
    const correo = document.getElementById('correo').value.trim();
    if (!correo) {
        mostrarError('correo', 'El correo electrónico es obligatorio.');
        esValido = false;
    } else if (!validarEmail(correo)) {
        mostrarError('correo', 'Ingresa un correo electrónico válido (ej: usuario@dominio.com).');
        esValido = false;
    }

    // Teléfono: obligatorio, exactamente 10 dígitos numéricos
    const telefono = document.getElementById('telefono').value.trim();
    if (!telefono) {
        mostrarError('telefono', 'El teléfono es obligatorio.');
        esValido = false;
    } else if (!/^\d{10}$/.test(telefono)) {
        mostrarError('telefono', 'El teléfono debe contener exactamente 10 dígitos numéricos.');
        esValido = false;
    }

    // ── Datos Laborales ──

    // Puesto: obligatorio, mínimo 3 caracteres
    const puesto = document.getElementById('puesto').value.trim();
    if (!puesto) {
        mostrarError('puesto', 'El puesto es obligatorio.');
        esValido = false;
    } else if (puesto.length < 3) {
        mostrarError('puesto', 'El puesto debe tener al menos 3 caracteres.');
        esValido = false;
    }

    // Departamento: obligatorio, mínimo 3 caracteres
    const departamento = document.getElementById('departamento').value.trim();
    if (!departamento) {
        mostrarError('departamento', 'El departamento es obligatorio.');
        esValido = false;
    } else if (departamento.length < 3) {
        mostrarError('departamento', 'El departamento debe tener al menos 3 caracteres.');
        esValido = false;
    }

    // Salario: obligatorio, numérico, mayor a 0
    const salario = document.getElementById('salario').value.trim();
    if (!salario) {
        mostrarError('salario', 'El salario es obligatorio.');
        esValido = false;
    } else if (isNaN(salario) || Number(salario) <= 0) {
        mostrarError('salario', 'El salario debe ser un número mayor a 0.');
        esValido = false;
    } else if (!Number.isInteger(Number(salario))) {
        mostrarError('salario', 'El salario no puede contener decimales.');
        esValido = false;
    }

    // Fecha de ingreso: obligatoria, no puede ser futura
    const fechaIngreso = document.getElementById('fechaIngreso').value;
    if (!fechaIngreso) {
        mostrarError('fechaIngreso', 'La fecha de ingreso es obligatoria.');
        esValido = false;
    } else if (new Date(fechaIngreso) > new Date()) {
        mostrarError('fechaIngreso', 'La fecha de ingreso no puede ser una fecha futura.');
        esValido = false;
    }

    return esValido;
}

// ── UTILIDADES ────────────────────────────────────────────────────────────────

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email);
}

function esMayorDeEdad(fechaStr) {
    const hoy = new Date();
    const nacimiento = new Date(fechaStr);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesActual = hoy.getMonth() - nacimiento.getMonth();
    if (mesActual < 0 || (mesActual === 0 && hoy.getDate() < nacimiento.getDate())) {
        return (edad - 1) >= 18;
    }
    return edad >= 18;
}

// ── MANEJO DE MENSAJES DE ERROR ───────────────────────────────────────────────

function mostrarError(idCampo, mensaje) {
    const input = document.getElementById(idCampo);
    const grupo = input.closest('.form-group');

    input.classList.add('input-error');

    // Crear span de error si no existe
    let spanError = grupo.querySelector('.campo-error');
    if (!spanError) {
        spanError = document.createElement('span');
        spanError.classList.add('campo-error');
        grupo.appendChild(spanError);
    }
    spanError.textContent = mensaje;
}

function limpiarErrores() {
    // Quitar clases de error de los inputs
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

    // Quitar mensajes inline
    document.querySelectorAll('.campo-error').forEach(el => el.remove());

    // Limpiar mensajes globales
    const msgError = document.getElementById('mensajeError');
    const msgExito = document.getElementById('mensajeExito');
    msgError.textContent = '';
    msgExito.textContent = '';
    msgError.style.display = 'none';
    msgExito.style.display = 'none';
}

function mostrarMensaje(tipo, texto) {
    const el = document.getElementById(tipo === 'error' ? 'mensajeError' : 'mensajeExito');
    el.textContent = texto;
    el.style.display = 'block';
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── VALIDACIÓN EN TIEMPO REAL (al salir del campo) ───────────────────────────

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', function () {
        // Limpiar el error de ese campo específico al perder foco
        this.classList.remove('input-error');
        const grupo = this.closest('.form-group');
        const spanError = grupo && grupo.querySelector('.campo-error');
        if (spanError) spanError.remove();
    });
});