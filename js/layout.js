// importamos la función de cerrar sesión para usarla en el botón del header
import { cerrarSesion } from './auth.js';

// Este archivo se encarga de cargar el header y footer en cada página, y de hacer funcional el botón de cerrar sesión. 
const isInPages = window.location.pathname.includes('/pages/');
const inicioHref = isInPages ? '../index.html' : 'index.html';
const inventarioHref = isInPages ? 'inventario.html' : 'pages/inventario.html';
const proveedoresHref = isInPages ? 'proveedores.html' : 'pages/proveedores.html';
const sucursalesHref = isInPages ? 'sucursales.html' : 'pages/sucursales.html';
const adminHref = isInPages ? 'admin.html' : 'pages/admin.html';

const headerHTML = `
<header>
    <h2>Farmacia "Fortaleza"</h2>
    <nav>
        <ul>
            <li><a href="${inicioHref}">Inicio</a></li>
            <li><a href="${inventarioHref}">Inventario</a></li>
            <li><a href="${proveedoresHref}">Proveedores</a></li>
            <li><a href="${sucursalesHref}">Sucursales</a></li>
            <li><a href="${adminHref}">Administración</a></li>
            <li><a href="#" id="btn-cerrar-sesion" class="nav-btn">Cerrar sesión</a></li>
        </ul>
    </nav>
</header>
`;

const footerHTML = `
<footer>
    <p>&copy; 2026 Sistema de Gestión Farmacéutica. Proyecto de Desarrollo Web Profesional.</p>
</footer>
`;

function loadLayout() {
    document.getElementById('header-container').innerHTML = headerHTML;
    document.getElementById('footer-container').innerHTML = footerHTML;

    // botón de cerrar sesión funcional
    const btnCerrar = document.getElementById("btn-cerrar-sesion");
    if (btnCerrar) {
        btnCerrar.addEventListener("click", function() {
            cerrarSesion();
        });
    }
}

// Llamamos a la función para cargar el header y footer en cada página que incluya este script
loadLayout();