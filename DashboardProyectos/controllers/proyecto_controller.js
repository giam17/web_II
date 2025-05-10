import { proyectoService } from "../service/proyecto-service.js";

const contenedor = document.querySelector("[data-lista]");

function crearCard(proyecto) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <h2>${proyecto.nombre}</h2>
    <p><strong>Estado:</strong> ${proyecto.estado}</p>
    <p>${proyecto.descripcion}</p>
    <p><strong>Tecnologías:</strong> ${proyecto.tecnologias}</p>
    <p><strong>Inicio:</strong> ${proyecto.inicio}</p>
    <p><strong>Fin:</strong> ${proyecto.fin}</p>
    ${proyecto.enlace ? `<p><a href="${proyecto.enlace}" target="_blank">Ver Proyecto</a></p>` : ""}
    <a href="../screens/editar_proyecto.html?id=${proyecto.id}">Editar</a>
    <button data-id="${proyecto.id}">Eliminar</button>
  `;

  card.querySelector("button").addEventListener("click", () => {
    proyectoService.eliminarProyecto(proyecto.id).then(() => {
      card.remove();
    });
  });

  return card;
}

proyectoService.listaProyectos().then((data) => {
  data.forEach((proyecto) => {
    const nuevaCard = crearCard(proyecto);
    contenedor.appendChild(nuevaCard);
  });
});
