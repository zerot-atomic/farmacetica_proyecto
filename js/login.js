// Este archivo se encarga de manejar el proceso de login, incluyendo la autenticación con Firebase y la redirección basada en roles.
import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

document.getElementById("loginForm").addEventListener("submit", async function(e) { 
    e.preventDefault();

    // Capturamos los datos del formulario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMensaje = document.getElementById("error");

    // Agregar dominio fantasma para que Firebase lo acepte
    const emailFormateado = username + "@fortaleza.com"; 

    try {
        // Mandamos las credenciales al "Servidor" (Firebase Auth)
        const userCredential = await signInWithEmailAndPassword(auth, emailFormateado, password);
        const user = userCredential.user;

        // Si la contraseña es correcta, le preguntamos a la base de datos (Firestore) su Rol
        // El ID del documento es el UID de Firebase
        const docRef = doc(db, "usuarios1", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            // console.log("Datos encontrados en Firestore:", userData);
            
            // Redirección basada en el rol
            if (userData.rol === "admin") {
                window.location.href = "index_admin.html";
            } else {
                window.location.href = "index.html";
            }
        } else {
            errorMensaje.textContent = "Error: El usuario no tiene un rol asignado en la base de datos.";
        }

    } catch (error) {
        // Firebase maneja los errores si la contraseña está mal o el usuario no existe
        console.error("Código de error:", error.code);
        errorMensaje.textContent = "Credenciales incorrectas o usuario no encontrado.";
    }
});