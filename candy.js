// ==========================
// 📦 DATA CANDY
// ==========================
const productosCandy = [
  { id: 1, nombre: "Combo Fantásticos", precio: 35000 },
  { id: 2, nombre: "Combo Recargado", precio: 25000 },
  { id: 3, nombre: "Combo Superman", precio: 35000 },
  { id: 4, nombre: "Combo Mega", precio: 21500 },
  { id: 5, nombre: "Balde grande", precio: 9800 },
  { id: 6, nombre: "POP mediano", precio: 8000 },
  { id: 7, nombre: "Bebida grande", precio: 7800 },
];

// ==========================
// 🧠 ESTADO
// ==========================
let carritoCandy = JSON.parse(localStorage.getItem("carritoCandy")) || [];

// ==========================
// 🎯 SELECTORES
// ==========================
const botonesComprar = document.querySelectorAll(".btn-danger");
const contadorCarrito = document.getElementById("contador-carrito");
const itemsCarritoCandy = document.getElementById("items-carrito-candy");
const btnVaciarCarritoCandy = document.getElementById("vaciar-carrito-candy");

// ==========================
// 🔢 FUNCIONES
// ==========================

// Actualizar contador
function actualizarContador() {
  contadorCarrito.textContent = carritoCandy.length;
}

// Guardar en localStorage
function guardarCarrito() {
  localStorage.setItem("carritoCandy", JSON.stringify(carritoCandy));
}

// Renderizar carrito en el modal
function renderCarrito() {
  itemsCarritoCandy.innerHTML = "";
  if (carritoCandy.length === 0) {
    itemsCarritoCandy.innerHTML = "<p>El carrito está vacío</p>";
    return;
  }

  carritoCandy.forEach((p, index) => {
    const div = document.createElement("div");
    div.classList.add("d-flex", "justify-content-between", "mb-2", "align-items-center");
    div.innerHTML = `
      <span>${p.nombre} - $${p.precio.toLocaleString()}</span>
      <button class="btn btn-sm btn-light">Eliminar</button>
    `;
    // Eliminar producto
    div.querySelector("button").addEventListener("click", () => {
      carritoCandy.splice(index, 1);
      guardarCarrito();
      actualizarContador();
      renderCarrito();
    });

    itemsCarritoCandy.appendChild(div);
  });
}

// Agregar al carrito
function agregarAlCarrito(id) {
  const producto = productosCandy.find(p => p.id == id);
  if (producto) {
    carritoCandy.push(producto);
    guardarCarrito();
    actualizarContador();
    renderCarrito();
  }
}

// Vaciar carrito
function vaciarCarrito() {
  carritoCandy = [];
  guardarCarrito();
  actualizarContador();
  renderCarrito();
}

// ==========================
// ➕ EVENTOS
// ==========================
botonesComprar.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const index = Array.from(card.parentElement.parentElement.children).indexOf(card);
    agregarAlCarrito(productosCandy[index].id);
  });
});

btnVaciarCarritoCandy.addEventListener("click", vaciarCarrito);

// Mostrar carrito al abrir modal
document.getElementById("modalCarritoCandy").addEventListener("show.bs.modal", renderCarrito);

// Inicialización
actualizarContador();
renderCarrito();