// Seleccionar elementos
const form = document.querySelector(".login-form");
const email = document.querySelector("input[type='email']");
const password = document.querySelector("input[type='password']");

// Crear mensaje dinámico
const mensaje = document.createElement("p");
mensaje.style.textAlign = "center";
mensaje.style.marginTop = "10px";
form.appendChild(mensaje);

// Evento submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    // Validaciones
    if (emailValue === "" || passwordValue === "") {
        mostrarMensaje("⚠️ Completá todos los campos", "red");
        return;
    }

    if (!validarEmail(emailValue)) {
        mostrarMensaje("❌ Email inválido", "orange");
        return;
    }

    if (passwordValue.length < 6) {
        mostrarMensaje("🔒 La contraseña debe tener al menos 6 caracteres", "orange");
        return;
    }

    // Simulación de login exitoso
    mostrarMensaje("✅ Inicio de sesión exitoso", "#00ff88");

    // Guardar usuario (simulación)
    localStorage.setItem("usuario", emailValue);

    // Redirigir después de 1 segundo
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
});

// Función validar email
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Mostrar mensajes
function mostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.style.color = color;
}