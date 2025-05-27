import { boletoService } from "../service/boleto-service.js";

const crear_nueva_fila = (descripcion_bo, precio_bo, id_bo, pelicula) => {
  const fila = document.createElement('tr');
  const contenido = `
    <td class="td" data-td>${descripcion_bo}</td>
    <td>${precio_bo}</td>
    <td>${pelicula && pelicula.descripcion_pe ? pelicula.descripcion_pe : ''}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <!-- Botón de editar aquí si lo implementas -->
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button" id="${id_bo}">Eliminar</button>
        </li>
      </ul>
    </td>
  `;
  fila.innerHTML = contenido;

  const btn = fila.querySelector("button");
  btn.addEventListener("click", () => {
    const id = btn.id;
    boletoService.eliminarBoleto(id)
      .then(() => {
        alert("Eliminado");
        window.location.reload();
      }).catch(error => alert("Error"));
  });

  return fila;
};

const table = document.querySelector("[data-table]");
boletoService.listaBoletos()
  .then((data) => {
    data.forEach(({ descripcion_bo, precio_bo, id_bo, pelicula }) => {
      const nuevaLinea = crear_nueva_fila(descripcion_bo, precio_bo, id_bo, pelicula);
      table.appendChild(nuevaLinea);
    });
  })
  .catch((error) => alert("Ocurrió un error al listar boletos"));
