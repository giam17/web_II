const API_URL = "http://localhost:3000/peliculas";
const API_URL_SALAS = "http://localhost:3000/salas";

// Listar películas (join local robusto por id_sa o id)
const listaPeliculas = async () => {
  const peliculasRes = await fetch(API_URL);
  if (!peliculasRes.ok) throw new Error("Error al obtener películas");
  const peliculas = await peliculasRes.json();

  // Traer salas solo una vez para hacer join local
  const salasRes = await fetch(API_URL_SALAS);
  const salas = await salasRes.json();

  return peliculas.map(pelicula => ({
    ...pelicula,
    sala: salas.find(s => {
      // Si existe id_sa en sala, compara con id_sa de película como números
      if (s.id_sa !== undefined) {
        return Number(pelicula.id_sa) === Number(s.id_sa);
      }
      // Si existe id, compara también
      if (s.id !== undefined) {
        return Number(pelicula.id_sa) === Number(s.id);
      }
      return false;
    }) || {}
  }));
};

// Crear película
const crearPelicula = (descripcion_pe, horario_pe, id_sa) => {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      descripcion_pe,
      horario_pe,
      id_sa: Number(id_sa)
    })
  }).then(response => {
    if (!response.ok) throw new Error("Error al crear película");
    return response.json();
  });
};

// Eliminar película
const eliminarPelicula = (id_pe) => {
  return fetch(`${API_URL}/${id_pe}`, {
    method: "DELETE"
  }).then(response => {
    if (!response.ok) throw new Error("Error al eliminar película");
    return response.json();
  });
};

export const peliculaService = {
  listaPeliculas,
  crearPelicula,
  eliminarPelicula
};
