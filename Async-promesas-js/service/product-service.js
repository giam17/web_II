const API_URL = 'http://localhost/Async-promesas-js/api/productos.php';

export const productService = {
  listaProductos: () =>
    fetch(API_URL).then(res => res.json()),

  crearProducto: (nombre, precio, descripcion) =>
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: crypto.randomUUID(), nombre, precio, descripcion })
    }).then(res => res.json()),

  eliminarProducto: (id) =>
    fetch(`${API_URL}?id=${id}`, {
      method: "DELETE"
    }).then(res => res.json()),

  editarProducto: (id, nombre, precio, descripcion) =>
    fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nombre, precio, descripcion })
    }).then(res => res.json()),
};
