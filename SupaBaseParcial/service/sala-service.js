const SUPABASE_URL = 'https://bdjcetlxgvcnsmvhmfqv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkamNldGx4Z3ZjbnNtdmhtZnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTk4MjYsImV4cCI6MjA2MzQ5NTgyNn0.2Ja2tbtznCRrTLxucsZhSUCG1IKMce2QLclahjH4cN8';
const TABLE = 'salas';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

const listaSalas = () => {
  return fetch(`${API_URL}?select=*`, { headers: HEADERS })
    .then(res => {
      if (!res.ok) throw new Error('Error al listar salas');
      return res.json();
    });
};

const crearSala = (descripcion_sa) => {
  const sala = { descripcion_sa };
  return fetch(API_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(sala)
  }).then(async res => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Error al insertar sala');
    }
    const text = await res.text();
    return text ? JSON.parse(text) : sala;
  });
};

const eliminarSala = (id_sa) => {
  return fetch(`${API_URL}?id_sa=eq.${id_sa}`, {
    method: 'DELETE',
    headers: HEADERS
  }).then(res => {
    if (!res.ok) throw new Error('Error al eliminar sala');
    return res.json();
  });
};

export const salaService = {
  listaSalas,
  crearSala,
  eliminarSala
};
