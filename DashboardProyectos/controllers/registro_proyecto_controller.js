import { proyectoService } from "../service/proyecto-service.js";

const form = document.querySelector("[data-form]");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.querySelector("[data-nombre]").value;
  const descripcion = document.querySelector("[data-descripcion]").value;
  const estado = document.querySelector("[data-estado]").value;
  const tecnologias = document.querySelector("[data-tecnologias]").value;
  const inicio = document.querySelector("[data-inicio]").value;
  const fin = document.querySelector("[data-fin]").value;
  const enlace = document.querySelector("[data-enlace]").value;

  proyectoService.crearProyecto(
    nombre,
    descripcion,
    estado,
    tecnologias,
    inicio,
    fin,
    enlace
  ).then(() => {
    window.location.href = "../screens/registro_completado.html";
  });
});
