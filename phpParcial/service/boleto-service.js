const API_URL = "http://localhost/cine-api/api.php?table=boletos";
const API_URL_PELICULAS = "http://localhost/cine-api/api.php?table=peliculas";

const listaBoletos = async () => {
  const boletosRes = await fetch(API_URL);
  if (!boletosRes.ok) throw new Error("Error al obtener boletos");
  const boletos = await boletosRes.json();

  const peliculasRes = await fetch(API_URL_PELICULAS);
  const peliculas = await peliculasRes.json();

  return boletos.map(boleto => ({
    ...boleto,
    pelicula: peliculas.find(p => Number(boleto.id_pe) === Number(p.id_pe)) || {}
  }));
};

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

const eliminarBoleto = (id_bo) => {
  return fetch(`${API_URL}&id=${id_bo}`, { method: "DELETE" })
    .then(response => {
      if (!response.ok) throw new Error("Error al eliminar boleto");
      return response.json();
    });
};

export const boletoService = {
  listaBoletos,
  crearBoleto,
  eliminarBoleto
};
