import { salaService } from "../service/sala-service.js";

const formulario = document.querySelector("[data-form]");
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const descripcion_sa = document.querySelector("[data-descripcion]").value;

  salaService.crearSala(descripcion_sa)
    .then(() => {
      window.location.href = "./lista_sala.html";
    })
    .catch(error => {
      console.error("Error al registrar sala:", error);
      alert("Error al registrar sala");
    });
});
