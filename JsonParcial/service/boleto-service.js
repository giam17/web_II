const API_URL = "http://localhost:3000/boletos";
const API_URL_PELICULAS = "http://localhost:3000/peliculas";

// Listar boletos (join local robusto con películas)
const listaBoletos = async () => {
  const boletosRes = await fetch(API_URL);
  if (!boletosRes.ok) throw new Error("Error al obtener boletos");
  const boletos = await boletosRes.json();

  const peliculasRes = await fetch(API_URL_PELICULAS);
  const peliculas = await peliculasRes.json();

  return boletos.map(boleto => ({
    ...boleto,
    pelicula: peliculas.find(p =>
      (p.id_pe !== undefined && Number(boleto.id_pe) === Number(p.id_pe)) ||
      (p.id !== undefined && Number(boleto.id_pe) === Number(p.id))
    ) || {}
  }));
};

// Crear boleto
const crearBoleto = (descripcion_bo, precio_bo, id_pe) => {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      descripcion_bo,
      precio_bo: Number(precio_bo),
      id_pe: Number(id_pe)
    })
  }).then(response => {
    if (!response.ok) throw new Error("Error al crear boleto");
    return response.json();
  });
};

// Eliminar boleto
const eliminarBoleto = (id_bo) => {
  return fetch(`${API_URL}/${id_bo}`, {
    method: "DELETE"
  }).then(response => {
    if (!response.ok) throw new Error("Error al eliminar boleto");
    return response.json();
  });
};

export const boletoService = {
  listaBoletos,
  crearBoleto,
  eliminarBoleto
};
