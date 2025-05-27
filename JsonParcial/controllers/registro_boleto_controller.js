import { boletoService } from "../service/boleto-service.js";

const PELICULAS_API = "http://localhost:3000/peliculas";
const peliculaSelect = document.querySelector("[data-pelicula]");
fetch(PELICULAS_API)
  .then(res => res.json())
  .then(peliculas => {
    peliculas.forEach(pelicula => {
      const idPelicula = pelicula.id_pe !== undefined ? pelicula.id_pe : pelicula.id;
      const option = document.createElement("option");
      option.value = idPelicula;
      option.textContent = pelicula.descripcion_pe;
      peliculaSelect.appendChild(option);
    });
  });

const formulario = document.querySelector("[data-form]");
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const descripcion_bo = document.querySelector("[data-descripcion]").value;
  const precio_bo = document.querySelector("[data-precio]").value;
  const id_pe = Number(document.querySelector("[data-pelicula]").value);

  boletoService.crearBoleto(descripcion_bo, precio_bo, id_pe)
    .then(() => {
      window.location.href = "./lista_boleto.html";
    })
    .catch(error => {
      console.error("Error al registrar boleto:", error);
      alert("Error al registrar boleto");
    });
});
