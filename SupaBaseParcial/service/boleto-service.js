const SUPABASE_URL = 'https://bdjcetlxgvcnsmvhmfqv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkamNldGx4Z3ZjbnNtdmhtZnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTk4MjYsImV4cCI6MjA2MzQ5NTgyNn0.2Ja2tbtznCRrTLxucsZhSUCG1IKMce2QLclahjH4cN8';
const TABLE = 'boletos';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

const listaBoletos = () => {
  return fetch(`${API_URL}?select=*,peliculas(descripcion_pe)`, { headers: HEADERS })
    .then(res => {
      if (!res.ok) throw new Error('Error al listar boletos');
      return res.json();
    });
};

const crearBoleto = (descripcion_bo, precio_bo, id_pe) => {
  const boleto = {
    descripcion_bo,
    precio_bo: parseInt(precio_bo),
    id_pe: parseInt(id_pe)
  };
  return fetch(API_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(boleto)
  }).then(async res => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Error al insertar boleto');
    }
    const text = await res.text();
    return text ? JSON.parse(text) : boleto;
  });
};

const eliminarBoleto = (id_bo) => {
  return fetch(`${API_URL}?id_bo=eq.${id_bo}`, {
    method: 'DELETE',
    headers: HEADERS
  }).then(res => {
    if (!res.ok) throw new Error('Error al eliminar boleto');
    return res.json();
  });
};

export const boletoService = {
  listaBoletos,
  crearBoleto,
  eliminarBoleto
};
