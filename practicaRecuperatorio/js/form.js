const API_URL = 'http://localhost:3000/posts';

const form = document.querySelector('[data-form]');
const inputTask = document.querySelector('[data-input-task]');
const inputFecha = document.querySelector('[data-input-fecha]');
const inputNombre = document.querySelector('[data-input-nombre]');
const inputValor = document.querySelector('[data-input-valor]');
const tablaBody = document.querySelector('#taskTable tbody');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const task = inputTask.value.trim();
  const fecha = inputFecha.value.trim();
  const nombre = inputNombre.value.trim();
  const valor = parseInt(inputValor.value.trim());

  if (!task || !fecha || !nombre || isNaN(valor)) {
    showResult("Por favor completa todos los campos correctamente", true);
    return;
  }

  const post = {
    task,
    fecha,
    descripcion: {
      nombre,
      valor
    }
  };

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(post)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`ERROR EN LA RESPUESTA estado: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      showResult(data);
      agregarFila(data); 
      form.reset();
    })
    .catch(error => showResult(error.message, true));
});

function agregarFila(data) {
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${data.task}</td>
    <td>${data.fecha}</td>
    <td>${data.descripcion.nombre}</td>
    <td>${data.descripcion.valor}</td>
  `;
  tablaBody.appendChild(fila);
}
