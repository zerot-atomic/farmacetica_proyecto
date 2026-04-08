const users = [
    { username : "admin", password: "1234", role: "admin" },
    { username : "user", password: "1234", role: "user" }
];

document.getElementById("loginForm").addEventListener("submit", function(e){ 
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        sessionStorage.setItem("sessionUser", JSON.stringify(user));
        window.location.href = "index.html";
    } else {
        document.getElementById("error").textContent = "Credenciales incorrectas";
    }
})