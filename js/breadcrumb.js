// 1. Definimos las rutas. 
// La clave es el nombre del archivo, el valor es un arreglo con la jerarquía.
const rutasBreadcrumb = {

    // ---- SECCION INICIO ----
    // (Nivel 1)
    "index.html": [{ nombre: "Inicio", url: "/index.html" }],
    
    // ---- SECCION INVENTARIO (MEDICAMENTOS) ----
    // (Nivel 1)
    "inventario.html": [
        { nombre: "Inicio", url: "/index.html" },
        { nombre: "Inventario", url: "/pages/inventario.html" },
    ],
    
    // (Nivel 2)
    "catalogo.html": [
        { nombre: "Inicio", url: "/index.html" },
        { nombre: "Inventario", url: "/pages/inventario.html" },
        { nombre: "Catálogo de Medicamentos", url: "/pages/catalogo.html" }, 
    ],
    
    // (Nivel 3)
    "detalle-medicamento.html": [
        { nombre: "Inicio", url: "/index.html" },
        { nombre: "Inventario", url: "/pages/inventario.html" },
        { nombre: "Catálogo de Medicamentos", url: "/pages/catalogo.html" },
        { nombre: "Detalles", url: "/pages/detalle-medicamento.html" },
    ],
    
    // ---- SECCION PROVEEDORES ----
    // (Nivel 1)
    "proveedores.html": [
        { nombre: "Inicio", url: "/index.html" },
        { nombre: "Proveedores", url: "/pages/proveedores.html" },
    ],
    
    // (Nivel 2)
    "lista-proveedores.html": [
        { nombre: "Inicio", url: "/index.html" },
        { nombre: "Proveedores", url: "/pages/proveedores.html" },
        { nombre: "Directorio de Proveedores", url: "/pages/lista-proveedores.html" },
    ],
    
    // ---- SECCION SUCURSALES ----
    // (Nivel 1)
    "sucursales.html": [
        { nombre: "Inicio", url: "/index.html" },
        { nombre: "Sucursales", url: "/pages/sucursales.html" },
    ],
    
    // (Nivel 2)
    "lista-sucursales.html": [
        { nombre: "Inicio", url: "/index.html" },
        { nombre: "Sucursales", url: "/pages/sucursales.html" },
        { nombre: "Listado de Sucursales", url: "/pages/lista-sucursales.html" },
    ],
    
    // (Nivel 3)
    "inventario-sucursal-centro.html": [
        { nombre: "Inicio", url: "/index.html" },
        { nombre: "Sucursales", url: "/pages/sucursales.html" },
        { nombre: "Listado de Sucursales", url: "/pages/lista-sucursales.html" },
        { nombre: "Inventario por Sucursal", url: "/pages/inventario-sucursal-centro.html" },
    ],
    
    // ---- SECCION EMPLEADOS ----
    // (Nivel 1)
    "admin.html": [
        { nombre: "Inicio", url: "/index.html" },
        { nombre: "Administrar", url: "/pages/admin.html" },
    ],

    // (Nivel 2)
    "registro-empleado.html": [
        { nombre: "Inicio", url: "/index.html" },
        { nombre: "Administrar", url: "/pages/admin.html" },
        { nombre: "Alta Empleado", url: "/pages/registro-empleado.html" },
    ],
};

// 2. Función para generar el HTML dinámicamente
function generarBreadcrumb() {
    // Obtenemos el nombre del archivo actual (ej. "catalogo.html")
    let rutaActual = window.location.pathname.split("/").pop();
    
    // Si la ruta está vacía (ej. localhost:3000/), asumimos que es el inicio
    if (rutaActual === "") rutaActual = "index.html";

    // Buscamos la jerarquía en nuestro mapa
    const jerarquia = rutasBreadcrumb[rutaActual];
    const contenedor = document.getElementById("breadcrumb-container");

    if (!jerarquia || !contenedor) return; // Si no hay ruta o contenedor, no hace nada

    // 3. Construimos los elementos de la lista
    let html = '<ul style="list-style: none; display: flex; gap: 10px; padding: 0;">';
    
    jerarquia.forEach((item, index) => {
        // Si es el último elemento, no lleva enlace (es la página actual)
        if (index === jerarquia.length - 1) {
            html += `<li aria-current="page"><strong>${item.nombre}</strong></li>`;
        } else {
            html += `<li><a href="${item.url}">${item.nombre}</a> <span style="margin-left: 10px;">/</span></li>`;
        }
    });

    html += '</ul>';
    
    // 4. Inyectamos en el DOM
    contenedor.innerHTML = html;
}

// Ejecutamos la función cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", generarBreadcrumb);