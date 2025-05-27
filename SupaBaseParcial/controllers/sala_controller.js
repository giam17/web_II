import { salaService } from "../service/sala-service.js";

const crear_nueva_fila = (descripcion_sa, id_sa) => {
  const fila = document.createElement('tr');
  const contenido = `
    <td class="td" data-td>${descripcion_sa}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <!-- Aquí podrías añadir un enlace para editar si implementas esa función -->
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button" id="${id_sa}">Eliminar</button>
        </li>
      </ul>
    </td>
  `;
  fila.innerHTML = contenido;

  const btn = fila.querySelector("button");
  btn.addEventListener("click", () => {
    const id = btn.id;
    salaService.eliminarSala(id)
      .then(() => {
        alert("Eliminado");
        window.location.reload();
      }).catch(error => alert("Error"));
  });

  return fila;
};

const table = document.querySelector("[data-table]");
salaService.listaSalas()
  .then((data) => {
    data.forEach(({ descripcion_sa, id_sa }) => {
      const nuevaLinea = crear_nueva_fila(descripcion_sa, id_sa);
      table.appendChild(nuevaLinea);
    });
  })
  .catch((error) => alert("Ocurrió un error"));
