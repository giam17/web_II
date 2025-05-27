const API_URL = "http://localhost:3000/salas";

// Listar salas
const listaSalas = () => {
  return fetch(API_URL)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener salas");
      return response.json();
    });
};

// Crear sala
const crearSala = (descripcion_sa) => {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      descripcion_sa
    })
  }).then(response => {
    if (!response.ok) throw new Error("Error al crear sala");
    return response.json();
  });
};

// Eliminar sala
const eliminarSala = (id_sa) => {
  return fetch(`${API_URL}/${id_sa}`, {
    method: "DELETE"
  }).then(response => {
    if (!response.ok) throw new Error("Error al eliminar sala");
    return response.json();
  });
};

export const salaService = {
  listaSalas,
  crearSala,
  eliminarSala
};
