// ==========================
// 📦 DATA
// ==========================
const peliculas = [
  { id: 1, titulo: "El conjuro 4", imagen: "./imgProyecto/conjuro4.jpg", formatos: "2D" },
  { id: 2, titulo: "Demon Slayer", imagen: "./imgProyecto/demonSlayer.jpg", formatos: "2D" },
  { id: 3, titulo: "Homo Argentum", imagen: "./imgProyecto/homoArgentum.jpg", formatos: "2D" },
  { id: 4, titulo: "La princesa Mononoke", imagen: "./imgProyecto/princesaMononoke.jpg", formatos: "2D" }
];

// ==========================
// 🧠 ESTADO
// ==========================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ==========================
// 🎯 SELECTORES
// ==========================
const contenedorPeliculas = document.getElementById("contenedor-peliculas");
const inputBuscador = document.getElementById("buscador");
const contadorCarrito = document.getElementById("contador-carrito");
const itemsCarrito = document.getElementById("items-carrito");
const btnVaciar = document.getElementById("vaciar-carrito");

// ==========================
// 🎨 RENDER PELÍCULAS
// ==========================
function renderPeliculas(lista) {
  contenedorPeliculas.innerHTML = "";

  if (lista.length === 0) {
    contenedorPeliculas.innerHTML = "<p class='text-center'>No se encontraron películas</p>";
    return;
  }

  lista.forEach(pelicula => {
    const card = document.createElement("div");
    card.classList.add("col");

    card.innerHTML = `
      <div class="card h-100 bg-dark text-white">
        <img src="${pelicula.imagen}" class="card-img-top">
        <div class="card-body">
          <h5>${pelicula.titulo}</h5>
          <p>${pelicula.formatos}</p>
        </div>
        <div class="card-footer text-center border-0">
          <button class="btn btn-danger btn-sm" data-id="${pelicula.id}">Comprar</button>
        </div>
      </div>
    `;

    contenedorPeliculas.appendChild(card);
  });
}

// ==========================
// 🛒 RENDER CARRITO
// ==========================
function renderCarrito() {
  itemsCarrito.innerHTML = "";

  if (carrito.length === 0) {
    itemsCarrito.innerHTML = "<p>El carrito está vacío</p>";
    return;
  }

  carrito.forEach(p => {
    itemsCarrito.innerHTML += `
      <div class="d-flex justify-content-between mb-2">
        <span>${p.titulo} x${p.cantidad}</span>
      </div>
    `;
  });
}

// ==========================
// 🔢 CONTADOR
// ==========================
function actualizarContador() {
  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  contadorCarrito.textContent = total;
}

// ==========================
// ➕ AGREGAR AL CARRITO
// ==========================
function agregarAlCarrito(id) {
  const pelicula = peliculas.find(p => p.id === Number(id));

  const existe = carrito.find(p => p.id === Number(id));

  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...pelicula, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  renderCarrito();

  // feedback simple
  console.log("Película agregada al carrito");
}

// ==========================
// 🗑 VACIAR CARRITO
// ==========================
function vaciarCarrito() {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify([]));
  renderCarrito();
  actualizarContador();
}

// ==========================
// 🔍 BUSCADOR
// ==========================
function filtrarPeliculas() {
  const valor = inputBuscador.value.toLowerCase();

  const filtradas = peliculas.filter(p =>
    p.titulo.toLowerCase().includes(valor)
  );

  renderPeliculas(filtradas);
}

// ==========================
// 🎧 EVENTOS
// ==========================
function agregarEventos() {
  inputBuscador.addEventListener("input", filtrarPeliculas);

  contenedorPeliculas.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-danger")) {
      const id = e.target.getAttribute("data-id");
      agregarAlCarrito(id);
    }
  });

  btnVaciar.addEventListener("click", vaciarCarrito);

  document
    .getElementById("modalCarrito")
    .addEventListener("show.bs.modal", renderCarrito);
}

// ==========================
// 🚀 INIT
// ==========================
function init() {
  renderPeliculas(peliculas);
  actualizarContador();
  agregarEventos();
}

init();

