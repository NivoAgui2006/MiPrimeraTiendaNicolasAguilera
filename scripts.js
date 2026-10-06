const productos = [
  {
    id: 1,
    nombre: "Nike P-6000",
    descripcion: "Inspirados en los 2000, con un look deportivo y atrevido.",
    precio: 450000,
    imagen: "https://nikeco.vtexassets.com/arquivos/ids/1112706-800-auto?v=639215346980430000&width=800&height=auto&aspect=true"
  },
  {
    id: 2,
    nombre: "Nike Dunk Low",
    descripcion: "Diseño urbano, cómodo y versátil para destacar en cada paso.",
    precio: 380000,
    imagen: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1cba7da6-d5ea-4cf5-868f-c0cc693bd1fc/NIKE+DUNK+LOW+%28GS%29.png"
  },
  {
    id: 3,
    nombre: "Nike V2K",
    descripcion: "Estética Y2K y actitud futurista para un look que destaca.",
    precio: 300000,
    imagen: "https://nikeco.vtexassets.com/arquivos/ids/1112568-800-auto?v=639214787582830000&width=800&height=auto&aspect=true"
  },
  {
    id: 4,
    nombre: "Nike V5",
    descripcion: "Inspirado en el running clásico, con un diseño retro y deportivo.",
    precio: 480000,
    imagen: "https://nikeco.vtexassets.com/arquivos/ids/1086144-800-auto?v=639187067865970000&width=800&height=auto&aspect=true"
  },
  {
    id: 5,
    nombre: "Nike Air Max 97",
    descripcion: "Diseño icónico con ondas marcadas y un estilo que nunca pasa de moda.",
    precio: 560000,
    imagen: "https://www.nike.sa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dw2f981b96/nk/9a9/1/3/1/1/2/9a913112_6c85_42bf_84a2_7a5198f4a0e0.jpg?sw=700&sh=700&sm=fit&q=100&strip=false"
  }
];


/* ==============================
   CARRITO
================================ */

const carrito = [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");


/* ==============================
   MOSTRAR PRODUCTOS
================================ */

function mostrarProductos() {

  contenedorProductos.innerHTML = "";

  productos.forEach(prod => {

    const div = document.createElement("div");

    div.className = "producto";

    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">

      <h3>${prod.nombre}</h3>

      <p class="descripcion">
        ${prod.descripcion}
      </p>

      <p class="precio">
        ${prod.precio.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0
        })}
      </p>

      <button onclick="agregarAlCarrito(${prod.id})">
        Agregar al carrito
      </button>
    `;

    contenedorProductos.appendChild(div);

  });

}


/* ==============================
   AGREGAR AL CARRITO
================================ */

function agregarAlCarrito(id) {

  const productoExistente =
    carrito.find(p => p.id === id);

  if (productoExistente) {

    productoExistente.cantidad++;

  } else {

    const producto =
      productos.find(p => p.id === id);

    carrito.push({
      ...producto,
      cantidad: 1
    });

  }

  actualizarCarrito();

}


/* ==============================
   ACTUALIZAR CARRITO
================================ */

function actualizarCarrito() {

  listaCarrito.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  carrito.forEach(item => {

    const li =
      document.createElement("li");

    const subtotal =
      item.precio * item.cantidad;

    li.textContent =
      `${item.nombre} x${item.cantidad} — ` +
      subtotal.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
      });

    listaCarrito.appendChild(li);

    total += subtotal;
    totalItems += item.cantidad;

  });

  totalCarrito.textContent =
    total.toLocaleString("es-CO");

  actualizarTituloCarrito(totalItems);

}


/* ==============================
   CONTADOR DEL CARRITO
================================ */

function actualizarTituloCarrito(cantidad) {

  const titulo =
    document.querySelector(".carrito h2");

  titulo.textContent =
    `🧾 Carrito de Compras (${cantidad})`;

}


/* ==============================
   VACIAR CARRITO
================================ */

function vaciarCarrito() {

  if (carrito.length === 0) {

    alert("🛒 El carrito ya está vacío.");

    return;

  }

  if (
    confirm(
      "¿Estás seguro de que quieres vaciar el carrito?"
    )
  ) {

    carrito.length = 0;

    actualizarCarrito();

  }

}


/* ==============================
   FINALIZAR COMPRA
================================ */

function finalizarCompra() {

  if (carrito.length === 0) {

    alert(
      "🛒 Tu carrito está vacío. Agrega productos antes de finalizar la compra."
    );

    return;

  }

  alert(
    "🎉 ¡Pedido simulado confirmado!\n\n" +
    "En un eCommerce real, ahora entrarían en acción " +
    "el backend, la pasarela de pago y la logística."
  );

  carrito.length = 0;

  actualizarCarrito();

}


/* ==============================
   INICIAR TIENDA
================================ */

mostrarProductos();
