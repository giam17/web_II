import { boletoService } from "../service/boleto-service.js";

const SUPABASE_URL = 'https://bdjcetlxgvcnsmvhmfqv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkamNldGx4Z3ZjbnNtdmhtZnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTk4MjYsImV4cCI6MjA2MzQ5NTgyNn0.2Ja2tbtznCRrTLxucsZhSUCG1IKMce2QLclahjH4cN8';
const PELICULAS_API = `${SUPABASE_URL}/rest/v1/peliculas?select=*`;
const HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

const peliculaSelect = document.querySelector("[data-pelicula]");
fetch(PELICULAS_API, { headers: HEADERS })
  .then(res => res.json())
  .then(peliculas => {
    peliculas.forEach(pelicula => {
      const option = document.createElement("option");
      option.value = pelicula.id_pe;
      option.textContent = pelicula.descripcion_pe;
      peliculaSelect.appendChild(option);
    });
  });

const formulario = document.querySelector("[data-form]");
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const descripcion_bo = document.querySelector("[data-descripcion]").value;
  const precio_bo = document.querySelector("[data-precio]").value;
  const id_pe = document.querySelector("[data-pelicula]").value;

  boletoService.crearBoleto(descripcion_bo, precio_bo, id_pe)
    .then(() => {
      window.location.href = "./lista_boleto.html";
    })
    .catch(error => {
      console.error("Error al registrar boleto:", error);
      alert("Error al registrar boleto");
    });
});
