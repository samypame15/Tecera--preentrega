const productos = [
  { id: 1, nombre: "Tortas de chocolate", precio: 200000 },
  { id: 2, nombre: "Chescake de frutos rojos", precio: 150000 },
  { id: 3, nombre: "Anchetas", precio: 180000 },
  { id: 4, nombre: "Desayunos", precio: 120000 },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", function () {
  mostrarProductos();
  mostrarCarrito();
  actualizarTotal();
});

function mostrarProductos() {
  const productosDiv = document.getElementById("productos");
  productosDiv.innerHTML = "";

  productos.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
    productosDiv.appendChild(productoDiv);
  });
}

function agregarAlCarrito(idProducto) {
  const producto = productos.find((p) => p.id === idProducto);
  carrito.push(producto);
  guardarCarritoEnStorage();
  mostrarCarrito();
  actualizarTotal();
}

function mostrarCarrito() {
  const carritoDiv = document.getElementById("carrito");
  carritoDiv.innerHTML = "";

  if (carrito.length === 0) {
    carritoDiv.innerHTML = "<p>El carrito está vacío</p>";
    return;
  }

  carrito.forEach((producto, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
    carritoDiv.appendChild(itemDiv);
  });
}

function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  guardarCarritoEnStorage();
  mostrarCarrito();
  actualizarTotal();
}

function actualizarTotal() {
  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
  document.getElementById("total").textContent = total;
}

function guardarCarritoEnStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
