import { peliculaService } from "../service/pelicula-service.js";

const SALAS_API = "http://localhost/cine-api/api.php?table=salas";
const salaSelect = document.querySelector("[data-sala]");
fetch(SALAS_API)
  .then(res => res.json())
  .then(salas => {
    salas.forEach(sala => {
      const option = document.createElement("option");
      option.value = sala.id_sa;
      option.textContent = sala.descripcion_sa;
      salaSelect.appendChild(option);
    });
  });

const formulario = document.querySelector("[data-form]");
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const descripcion_pe = document.querySelector("[data-descripcion]").value;
  const horario_pe = document.querySelector("[data-horario]").value;
  const id_sa = Number(document.querySelector("[data-sala]").value);

  peliculaService.crearPelicula(descripcion_pe, horario_pe, id_sa)
    .then(() => {
      window.location.href = "./lista_pelicula.html";
    })
    .catch(error => {
      console.error("Error al registrar película:", error);
      alert("Error al registrar película");
    });
});
