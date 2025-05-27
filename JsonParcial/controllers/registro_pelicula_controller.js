import { peliculaService } from "../service/pelicula-service.js";

const SALAS_API = "http://localhost:3000/salas";
const salaSelect = document.querySelector("[data-sala]");
fetch(SALAS_API)
  .then(res => res.json())
  .then(salas => {
    salas.forEach(sala => {
      const idSala = sala.id_sa !== undefined ? sala.id_sa : sala.id;
      const option = document.createElement("option");
      option.value = idSala;
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
