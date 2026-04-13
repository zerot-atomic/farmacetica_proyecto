// importamos lo necesario para manejar la autenticación y la base de datos
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

// Evento que se dispara cada vez que cambia el estado de autenticación (login/logout)
onAuthStateChanged(auth, async (user) => {
    const currentPath = window.location.pathname; 
    
    // --- RADAR DE RUTAS ---
    // Detectamos si estamos adentro de la carpeta pages
    const estamosEnPages = currentPath.includes('/pages/');
    // Si estamos en pages, la ruta a la raíz es "../". Si no, está vacía "".
    const rutaRaiz = estamosEnPages ? "../" : "";

    if (user) {
        try {
            const docRef = doc(db, "usuarios1", user.uid); // Buscamos su rol del lado del servidor (Firestore)
            const docSnap = await getDoc(docRef); // Esperamos la respuesta del servidor

            if (docSnap.exists()) {
                const userData = docSnap.data();
                const rol = userData.rol; // "admin" o "employee"
                const nombre = userData.name; // nombre del usuario en firestore

                // --- INYECCIÓN DEL NOMBRE EN EL HTML ---
                const nameElement = document.getElementById("user-name-display");
                if (nameElement) {
                    nameElement.textContent = nombre; // Mostramos el nombre del usuario en el HTML
                }

                // Si el usuario ya tiene sesión pero está en el login, lo redirigimos a su página correspondiente según su rol
                if (currentPath.includes("login.html")) {
                    if (rol === "admin") {
                        window.location.href = rutaRaiz + "index_admin.html"
                    } else if (rol === "employee") {
                        window.location.href = rutaRaiz + "index.html";
                    }
                    return;
                }

                // Si es "employee", se prohibe la entrada a las secciones de admin
                if (rol === "employee") {
                    if (currentPath.includes("index_admin.html") || currentPath.includes("admin.html") || currentPath.includes("registro-empleado.html")) {
                        alert("Acceso restringido: No tienes permisos de administrador.");
                        window.location.href = rutaRaiz + "index.html"; // Lo regresamos a su inicio
                    }
                }
            }
        } catch (error) {
            console.error("Error al buscar el rol:", error);
        }

    } else {
        // Si no hay usuario, lo mandamos al login (a menos que ya estemos en el login, para evitar bucles)
        console.log("No hay sesión activa. Redirigiendo al login...");
        if (!window.location.href.includes("login.html")) {
            window.location.href = rutaRaiz + "login.html";
        }
    }
});

// Función para cerrar sesión que será llamada desde el botón en el header
export function cerrarSesion() {
    signOut(auth).then(() => {
        // El onAuthStateChanged de arriba detectará automáticamente que salimos y nos redirigirá al login
        alert("Sesión cerrada exitosamente");
    }).catch((error) => {
        console.error("Error al cerrar sesión:", error);
    });
}