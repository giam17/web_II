const listaProyectos = () =>
  fetch("http://localhost:3000/proyectos").then((res) => res.json());

const crearProyecto = (nombre, descripcion, estado, tecnologias, inicio, fin, enlace) =>
  fetch("http://localhost:3000/proyectos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      descripcion,
      estado,
      tecnologias,
      inicio,
      fin,
      enlace,
      id: uuid.v4(),
    }),
  });

const eliminarProyecto = (id) =>
  fetch(`http://localhost:3000/proyectos/${id}`, {
    method: "DELETE",
  });

const detalleProyecto = (id) =>
  fetch(`http://localhost:3000/proyectos/${id}`).then((res) => res.json());

const actualizarProyecto = (nombre, descripcion, estado, tecnologias, inicio, fin, enlace, id) =>
  fetch(`http://localhost:3000/proyectos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      descripcion,
      estado,
      tecnologias,
      inicio,
      fin,
      enlace,
    }),
  });

export const proyectoService = {
  listaProyectos,
  crearProyecto,
  eliminarProyecto,
  detalleProyecto,
  actualizarProyecto,
};
