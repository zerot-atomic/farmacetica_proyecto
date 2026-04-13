# Autenticación y autorización basada en roles con Firebase Auth y Firestore

Este documento explica el flujo de autenticación y autorización que utiliza el proyecto. La aplicación usa Firebase Auth para validar el inicio de sesión y Firestore para determinar el rol del usuario y controlar el acceso a las páginas.

---

## 1. Flujo de inicio de sesión

El inicio de sesión ocurre en `js/login.js`.

1. El usuario ingresa su `username` y `password` en el formulario de login.
2. El código crea un correo electrónico temporal concatenando el username con `@fortaleza.com`.
   - Ejemplo: si el usuario escribe `jose`, el email enviado a Firebase es `jose@fortaleza.com`.
3. Se invoca `signInWithEmailAndPassword(auth, emailFormateado, password)` para autenticar la credencial con Firebase Auth.
4. Si Firebase responde correctamente, se obtiene el objeto `userCredential.user`.
5. Con el `uid` de ese usuario, se consulta Firestore en la colección `usuarios1`.
   - `doc(db, "usuarios1", user.uid)`
   - `getDoc(docRef)`
6. Si el documento existe, se extrae el rol desde `userData.rol`.
7. Según el rol, se redirige al usuario:
   - `admin` → `index_admin.html`
   - cualquier otro rol (por ejemplo `employee`) → `index.html`

### Ejemplo de roles en Firestore

El documento de usuario en Firestore debe tener un campo `rol` como:
- `admin`
- `employee`

Además, el documento suele contener el nombre del usuario en `name` para mostrarlo en la interfaz.

---

## 2. Control de sesión y acceso a páginas

El comportamiento de cada página se gestiona en `js/auth.js`.

### onAuthStateChanged

Se usa `onAuthStateChanged(auth, async (user) => { ... })` para detectar cambios en la sesión:

- Si hay usuario activo:
  - Se consulta Firestore para obtener su rol.
  - Se almacena el nombre (`userData.name`) y se inyecta en el HTML si existe el elemento `#user-name-display`.
  - Si el usuario ya inició sesión y está en `login.html`, se redirige de nuevo a su página correspondiente:
    - `admin` → `index_admin.html`
    - `employee` → `index.html`
  - Si un usuario con rol `employee` intenta acceder a una página de administración, se bloquea el acceso y se redirige a `index.html`.

- Si no hay usuario (`user` es nulo):
  - Se redirige al login excepto cuando ya se está en `login.html`, para evitar bucles.

### Protección de rutas en el frontend

En `auth.js` hay reglas de ruta basadas en `currentPath`:

- Si la URL incluye `index_admin.html`, `admin.html` o `registro-empleado.html`, se considera una sección administrativa.
- Si el rol es `employee` y la página es administrativa, el usuario recibe un `alert` y se envía a `index.html`.

Esto significa que la app bloquea en el navegador el acceso a secciones de admin para usuarios no administradores.

---

## 3. Manejo de rutas relativas

El script `auth.js` detecta si la página actual está dentro de la carpeta `pages`:

- Si la ruta contiene `/pages/`, entonces `rutaRaiz = "../"`.
- Si no, `rutaRaiz = ""`.

Esto permite construir correctamente las redirecciones hacia `login.html`, `index.html` o `index_admin.html` desde páginas internas.

---

## 4. Cierre de sesión

La función `cerrarSesion()` en `js/auth.js` hace lo siguiente:

1. Llama a `signOut(auth)`.
2. Firebase Auth detecta el cambio de estado.
3. `onAuthStateChanged` recibe `null` y redirige al usuario al login.
4. Se muestra un `alert("Sesión cerrada exitosamente")`.

Esto mantiene al usuario fuera de las páginas protegidas cuando ya no hay sesión activa.

---

## 5. Resumen del flujo completo

1. El usuario ingresa credenciales en el login.
2. `login.js` autentica con Firebase Auth.
3. Si el login es válido, `login.js` consulta Firestore para obtener el rol.
4. El usuario se redirige en función del rol.
5. En cada página, `auth.js` valida la sesión actual con `onAuthStateChanged`.
6. `auth.js` impide que usuarios no autorizados accedan a páginas administrativas.
7. Al cerrar sesión, Firebase Auth deja de considerar al usuario conectado y se redirige al login.

---

## 6. Notas importantes para el docente

- Firebase Auth se usa únicamente para verificar credenciales.
- Firestore guarda información adicional de usuario, especialmente el rol.
- La autorización basada en roles no solo depende del login, sino también de la consulta a Firestore en cada carga de página.
- El proyecto aplica una doble capa:
  - autenticación con Firebase Auth
  - autorización con Firestore y control de rutas en el frontend

---
