import { peliculaService } from "../service/pelicula-service.js";

const SUPABASE_URL = 'https://bdjcetlxgvcnsmvhmfqv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkamNldGx4Z3ZjbnNtdmhtZnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTk4MjYsImV4cCI6MjA2MzQ5NTgyNn0.2Ja2tbtznCRrTLxucsZhSUCG1IKMce2QLclahjH4cN8';
const SALAS_API = `${SUPABASE_URL}/rest/v1/salas?select=*`;
const HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

const salaSelect = document.querySelector("[data-sala]");
fetch(SALAS_API, { headers: HEADERS })
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
  const id_sa = document.querySelector("[data-sala]").value;

  peliculaService.crearPelicula(descripcion_pe, horario_pe, id_sa)
    .then(() => {
      window.location.href = "./lista_pelicula.html";
    })
    .catch(error => {
      console.error("Error al registrar película:", error);
      alert("Error al registrar película");
    });
});
