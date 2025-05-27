import { clientService } from "../service/client-service.js";

const crear_nueva_fila = (nombre, email, id_cl, boleto) => {
  const fila = document.createElement('tr');
  const contenido = `
    <td class="td" data-td>${nombre}</td>
    <td>${email}</td>
    <td>${boleto && boleto.descripcion_bo ? boleto.descripcion_bo : ''}</td>
    <td>
      <ul class="table__button-control">
        <li></li>
        <li>
          <button class="simple-button simple-button--delete" type="button" id="${id_cl}">Eliminar</button>
        </li>
      </ul>
    </td>
  `;
  fila.innerHTML = contenido;

  const btn = fila.querySelector("button");
  btn.addEventListener("click", () => {
    const id = btn.id;
    clientService.eliminarCliente(id)
      .then(() => {
        alert("Eliminado");
        window.location.reload();
      }).catch(error => alert("Error"));
  });

  return fila;
};

const table = document.querySelector("[data-table]");
clientService.listaClientes()
  .then((data) => {
    data.forEach(({ nombre, email, id_cl, boleto }) => {
      const nuevaLinea = crear_nueva_fila(nombre, email, id_cl, boleto);
      table.appendChild(nuevaLinea);
    });
  })
  .catch((error) => alert("Ocurrió un error al listar clientes"));
