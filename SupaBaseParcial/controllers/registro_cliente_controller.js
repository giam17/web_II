import { clientService } from "../service/client-service.js";

const SUPABASE_URL = 'https://bdjcetlxgvcnsmvhmfqv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkamNldGx4Z3ZjbnNtdmhtZnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTk4MjYsImV4cCI6MjA2MzQ5NTgyNn0.2Ja2tbtznCRrTLxucsZhSUCG1IKMce2QLclahjH4cN8';
const BOLETOS_API = `${SUPABASE_URL}/rest/v1/boletos?select=*`;
const HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

const boletoSelect = document.querySelector("[data-boleto]");
fetch(BOLETOS_API, { headers: HEADERS })
  .then(res => res.json())
  .then(boletos => {
    boletos.forEach(boleto => {
      const option = document.createElement("option");
      option.value = boleto.id_bo;
      option.textContent = boleto.descripcion_bo;
      boletoSelect.appendChild(option);
    });
  });

const formulario = document.querySelector("[data-form]");
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = document.querySelector("[data-nombre]").value;
  const email = document.querySelector("[data-email]").value;
  const id_bo = document.querySelector("[data-boleto]").value;

  clientService.crearCliente(nombre, email, id_bo)
    .then(() => {
      window.location.href = "./lista_cliente.html";
    })
    .catch(error => {
      console.error("Error al registrar cliente:", error);
      alert("Error al registrar cliente");
    });
});
