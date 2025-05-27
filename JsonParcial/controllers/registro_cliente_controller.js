import { clientService } from "../service/client-service.js";

const BOLETOS_API = "http://localhost:3000/boletos";
const boletoSelect = document.querySelector("[data-boleto]");
fetch(BOLETOS_API)
  .then(res => res.json())
  .then(boletos => {
    boletos.forEach(boleto => {
      const idBoleto = boleto.id_bo !== undefined ? boleto.id_bo : boleto.id;
      const option = document.createElement("option");
      option.value = idBoleto;
      option.textContent = boleto.descripcion_bo;
      boletoSelect.appendChild(option);
    });
  });

const formulario = document.querySelector("[data-form]");
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = document.querySelector("[data-nombre]").value;
  const email = document.querySelector("[data-email]").value;
  const id_bo = Number(document.querySelector("[data-boleto]").value);

  clientService.crearCliente(nombre, email, id_bo)
    .then(() => {
      window.location.href = "./lista_cliente.html";
    })
    .catch(error => {
      console.error("Error al registrar cliente:", error);
      alert("Error al registrar cliente");
    });
});
