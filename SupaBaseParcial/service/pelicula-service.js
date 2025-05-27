const SUPABASE_URL = 'https://bdjcetlxgvcnsmvhmfqv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkamNldGx4Z3ZjbnNtdmhtZnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTk4MjYsImV4cCI6MjA2MzQ5NTgyNn0.2Ja2tbtznCRrTLxucsZhSUCG1IKMce2QLclahjH4cN8';
const TABLE = 'peliculas';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

const listaPeliculas = () => {
  return fetch(`${API_URL}?select=*,salas(descripcion_sa)`, { headers: HEADERS })
    .then(res => {
      if (!res.ok) throw new Error('Error al listar películas');
      return res.json();
    });
};

const crearPelicula = (descripcion_pe, horario_pe, id_sa) => {
  const pelicula = { descripcion_pe, horario_pe, id_sa: parseInt(id_sa) };
  return fetch(API_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(pelicula)
  }).then(async res => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Error al insertar película');
    }
    const text = await res.text();
    return text ? JSON.parse(text) : pelicula;
  });
};

const eliminarPelicula = (id_pe) => {
  return fetch(`${API_URL}?id_pe=eq.${id_pe}`, {
    method: 'DELETE',
    headers: HEADERS
  }).then(res => {
    if (!res.ok) throw new Error('Error al eliminar película');
    return res.json();
  });
};

export const peliculaService = {
  listaPeliculas,
  crearPelicula,
  eliminarPelicula
};
