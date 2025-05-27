const SUPABASE_URL = 'https://bdjcetlxgvcnsmvhmfqv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkamNldGx4Z3ZjbnNtdmhtZnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTk4MjYsImV4cCI6MjA2MzQ5NTgyNn0.2Ja2tbtznCRrTLxucsZhSUCG1IKMce2QLclahjH4cN8';
const TABLE = 'clientes';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

const listaClientes = () => {
  return fetch(`${API_URL}?select=*,boletos(descripcion_bo)`, { headers: HEADERS })
    .then(res => {
      if (!res.ok) throw new Error('Error al listar clientes');
      return res.json();
    });
};

const crearCliente = (nombre, email, id_bo) => {
  const cliente = { nombre, email, id_bo: parseInt(id_bo) };
  return fetch(API_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(cliente)
  }).then(async res => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Error al insertar cliente');
    }
    const text = await res.text();
    return text ? JSON.parse(text) : cliente;
  });
};

const eliminarCliente = (id_cl) => {
  return fetch(`${API_URL}?id_cl=eq.${id_cl}`, {
    method: 'DELETE',
    headers: HEADERS
  }).then(res => {
    if (!res.ok) throw new Error('Error al eliminar cliente');
    return res.json();
  });
};

export const clientService = {
  listaClientes,
  crearCliente,
  eliminarCliente
};
