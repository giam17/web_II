import { peliculaService } from "../service/pelicula-service.js";

const crear_nueva_fila = (descripcion_pe, horario_pe, id_pe, sala) => {
  const fila = document.createElement('tr');
  const contenido = `
    <td class="td" data-td>${descripcion_pe}</td>
    <td>${horario_pe}</td>
    <td>${sala && sala.descripcion_sa ? sala.descripcion_sa : ''}</td>
    <td>
      <ul class="table__button-control">
        <li></li>
        <li>
          <button class="simple-button simple-button--delete" type="button" id="${id_pe}">Eliminar</button>
        </li>
      </ul>
    </td>
  `;
  fila.innerHTML = contenido;

  const btn = fila.querySelector("button");
  btn.addEventListener("click", () => {
    const id = btn.id;
    peliculaService.eliminarPelicula(id)
      .then(() => {
        alert("Eliminado");
        window.location.reload();
      }).catch(error => alert("Error"));
  });

  return fila;
};

const table = document.querySelector("[data-table]");
peliculaService.listaPeliculas()
  .then((data) => {
    data.forEach(({ descripcion_pe, horario_pe, id_pe, sala }) => {
      const nuevaLinea = crear_nueva_fila(descripcion_pe, horario_pe, id_pe, sala);
      table.appendChild(nuevaLinea);
    });
  })
  .catch((error) => alert("Ocurrió un error al listar películas"));
