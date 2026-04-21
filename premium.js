const botones = document.querySelectorAll(".seleccionar");
const continuar = document.getElementById("continuar");
const mensaje = document.getElementById("mensaje");

let planSeleccionado = "";

botones.forEach(boton => {
    boton.addEventListener("click", () => {

        // quitar selección anterior
        document.querySelectorAll(".membresia-card").forEach(card => {
            card.classList.remove("selected");
        });

        // seleccionar actual
        const card = boton.closest(".membresia-card");
        card.classList.add("selected");

        planSeleccionado = card.querySelector("h3").innerText;

        continuar.disabled = false;
        mensaje.innerText = `Seleccionaste: ${planSeleccionado}`;
    });
});

continuar.addEventListener("click", () => {
    alert("Compra simulada de: " + planSeleccionado);
});