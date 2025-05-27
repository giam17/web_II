import { salaService } from "../service/sala_service.js";

const table = document.querySelector("[data-table]");
if (table) {
  const crear_nueva_fila = (descripcion_sa, id_sa) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td class="td" data-td>${descripcion_sa}</td>
      <td>
        <ul class="table__button-control">
          <li>
            <button class="simple-button simple-button--delete" type="button" id="${id_sa}">
              Eliminar
            </button>
          </li>
        </ul>
      </td>`;
  
    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
      salaService.eliminarSala(id_sa)
        .then(() => {
          alert("Eliminado");
          window.location.reload();
        })
        .catch(() => alert("Error al eliminar sala"));
    });
  
    return fila;
  };

  salaService.listaSalas()
    .then((data) => {
      data.forEach(({ descripcion_sa, id_sa }) => {
        const nuevaLinea = crear_nueva_fila(descripcion_sa, id_sa);
        table.appendChild(nuevaLinea);
      });
    })
    .catch(() => alert("Ocurrió un error al cargar las salas"));
}

const form = document.getElementById("form-sala");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const descripcion = document.getElementById("descripcion_sa").value.trim();
    if (descripcion) {
      await salaService.crearSala(descripcion);
      window.location.href = "lista_sala.html";
    } else {
      alert("La descripción no puede estar vacía.");
    }
  });
}
