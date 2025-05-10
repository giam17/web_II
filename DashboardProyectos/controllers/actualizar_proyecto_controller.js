import { proyectoService } from "../service/proyecto-service.js";

const formulario = document.querySelector("[data-form]");
const url = new URL(window.location);
const id = url.searchParams.get("id");

proyectoService.detalleProyecto(id).then((datos) => {
  document.querySelector("[data-nombre]").value = datos.nombre;
  document.querySelector("[data-descripcion]").value = datos.descripcion;
  document.querySelector("[data-estado]").value = datos.estado;
  document.querySelector("[data-tecnologias]").value = datos.tecnologias;
  document.querySelector("[data-inicio]").value = datos.inicio;
  document.querySelector("[data-fin]").value = datos.fin;
  document.querySelector("[data-enlace]").value = datos.enlace;
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.querySelector("[data-nombre]").value;
  const descripcion = document.querySelector("[data-descripcion]").value;
  const estado = document.querySelector("[data-estado]").value;
  const tecnologias = document.querySelector("[data-tecnologias]").value;
  const inicio = document.querySelector("[data-inicio]").value;
  const fin = document.querySelector("[data-fin]").value;
  const enlace = document.querySelector("[data-enlace]").value;

  proyectoService.actualizarProyecto(
    nombre,
    descripcion,
    estado,
    tecnologias,
    inicio,
    fin,
    enlace,
    id
  ).then(() => {
    window.location.href = "../screens/edicion_concluida.html";
  });
});
