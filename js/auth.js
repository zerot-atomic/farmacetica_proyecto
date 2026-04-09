function verificarSesion() {
    const user = JSON.parse(sessionStorage.getItem("sessionUser"));

    if (!user) {
        window.location.href = "../login.html";
    }
}

function verificarAdmin() {
    const user = JSON.parse(sessionStorage.getItem("sessionUser"));

    if (!user || user.role !== "admin") {
        alert("No tienes acceso a esta página");
        window.location.href = "../index.html";
    }
}

function logout() {
    sessionStorage.removeItem("sessionUser");
    window.location.href = "../login.html";
}