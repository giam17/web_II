import { productService } from "../service/product-service.js";

const contenedor = document.querySelector("[data-tabla-productos]");

const crearFilaProducto = (nombre, precio, descripcion, id) => {
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${precio}</td>
    <td>${descripcion}</td>
    <td class="table__align--right">
      <button class="simple-button simple-button--delete" data-id="${id}">Eliminar</button>
    </td>
  `;

  fila.querySelector("button").addEventListener("click", async () => {
    try {
      await productService.eliminarProducto(id);
      fila.remove();
    } catch (error) {
      alert("Error al eliminar producto");
    }
  });

  return fila;
};

productService.listaProductos()
  .then((productos) => {
    productos.forEach(({ nombre, precio, descripcion, id }) => {
      const fila = crearFilaProducto(nombre, precio, descripcion, id);
      contenedor.appendChild(fila);
    });
  })
  .catch(() => alert("Error al cargar productos"));
