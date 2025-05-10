import { productService } from "../service/product-service.js";

const tabla = document.querySelector("[data-tabla-productos]");

const crearFilaProducto = (nombre, precio, descripcion, id) => {
  const fila = document.createElement("tr");
  const contenido = `
    <td class="td">${nombre}</td>
    <td class="td">$${parseFloat(precio).toFixed(2)}</td>
    <td class="td">${descripcion}</td>
    <td class="td table__align--right">
      <ul class="table__button-control">
        <li>
          <a href="./registrar_producto.html" class="simple-button simple-button--edit">Editar</a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" data-id="${id}">Eliminar</button>
        </li>
      </ul>
    </td>
  `;
  fila.innerHTML = contenido;

  const btnEliminar = fila.querySelector("button");
  btnEliminar.addEventListener("click", async () => {
    const confirmacion = confirm("¿Estás seguro de eliminar este producto?");
    if (confirmacion) {
      try {
        await productService.eliminarProducto(id);
        fila.remove();
      } catch (error) {
        alert("Error al eliminar el producto");
      }
    }
  });

  return fila;
};

const cargarProductos = async () => {
  try {
    const productos = await productService.listaProductos();
    productos.forEach(({ nombre, precio, descripcion, id }) => {
      const fila = crearFilaProducto(nombre, precio, descripcion, id);
      tabla.appendChild(fila);
    });
  } catch (error) {
    alert("Error al cargar productos");
  }
};

cargarProductos();
