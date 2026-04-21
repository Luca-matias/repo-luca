// ==========================
// 🎯 SELECTORES
// ==========================
const form = document.getElementById("form-contacto");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const mensaje = document.getElementById("mensaje");
const mensajeExito = document.getElementById("mensaje-exito");

// ==========================
// 📩 GUARDAR MENSAJE
// ==========================
function guardarMensaje(data) {
  const mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];
  mensajes.push(data);
  localStorage.setItem("mensajes", JSON.stringify(mensajes));
}

// ==========================
// ✅ VALIDACIÓN
// ==========================
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ==========================
// 🚀 EVENTO SUBMIT
// ==========================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // limpiar estilos previos
  nombre.classList.remove("is-invalid");
  email.classList.remove("is-invalid");
  mensaje.classList.remove("is-invalid");

  let valido = true;

  if (nombre.value.trim() === "") {
    nombre.classList.add("is-invalid");
    valido = false;
  }

  if (!validarEmail(email.value)) {
    email.classList.add("is-invalid");
    valido = false;
  }

  if (mensaje.value.trim() === "") {
    mensaje.classList.add("is-invalid");
    valido = false;
  }

  if (!valido) return;

  // guardar en localStorage
  const nuevoMensaje = {
    nombre: nombre.value,
    email: email.value,
    mensaje: mensaje.value,
    fecha: new Date().toLocaleString()
  };

  guardarMensaje(nuevoMensaje);

  // mostrar feedback
  mensajeExito.classList.remove("d-none");

  // reset form
  form.reset();

  // ocultar mensaje después de 3s
  setTimeout(() => {
    mensajeExito.classList.add("d-none");
  }, 3000);
});