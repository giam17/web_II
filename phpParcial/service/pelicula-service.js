const API_URL = "http://localhost/cine-api/api.php?table=peliculas";
const API_URL_SALAS = "http://localhost/cine-api/api.php?table=salas";

const listaPeliculas = async () => {
  const peliculasRes = await fetch(API_URL);
  if (!peliculasRes.ok) throw new Error("Error al obtener películas");
  const peliculas = await peliculasRes.json();

  const salasRes = await fetch(API_URL_SALAS);
  const salas = await salasRes.json();

  return peliculas.map(pelicula => ({
    ...pelicula,
    sala: salas.find(s => Number(pelicula.id_sa) === Number(s.id_sa)) || {}
  }));
};

const crearPelicula = (descripcion_pe, horario_pe, id_sa) => {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

const eliminarPelicula = (id_pe) => {
  return fetch(`${API_URL}&id=${id_pe}`, { method: "DELETE" })
    .then(response => {
      if (!response.ok) throw new Error("Error al eliminar película");
      return response.json();
    });
};

export const peliculaService = {
  listaPeliculas,
  crearPelicula,
  eliminarPelicula
};
