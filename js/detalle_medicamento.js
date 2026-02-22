// Simulamos la misma base de datos
const medicamentos = {
    paracetamol: {
        nombre: "Paracetamol",
        concentracion: "500mg",
        lote: "L-2026-02A",
        caducidad: "15/08/2027",
        stock: 35
    },
    amoxicilina: {
        nombre: "Amoxicilina",
        concentracion: "250mg",
        lote: "AMX-7782",
        caducidad: "20/11/2026",
        stock: 18
    },
    omeprazol: {
        nombre: "Omeprazol",
        concentracion: "20mg",
        lote: "OME-9921",
        caducidad: "03/04/2027",
        stock: 12
    }
};

// Leer el parámetro ?id=
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Validar que exista
if (id && medicamentos[id]) {
    const medicamento = medicamentos[id];

    // Cambiar título del navegador dinámicamente
    document.title = "Detalle - " + medicamento.nombre;

    document.getElementById("nombre").textContent = medicamento.nombre;
    document.getElementById("concentracion").textContent = medicamento.concentracion;
    document.getElementById("lote").textContent = medicamento.lote;
    document.getElementById("caducidad").textContent = medicamento.caducidad;
    document.getElementById("stock").textContent = medicamento.stock;
} else {
    document.getElementById("detalle").innerHTML = "<p>Medicamento no encontrado.</p>";
}