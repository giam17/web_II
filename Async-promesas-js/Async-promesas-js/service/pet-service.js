const SUPABASE_URL = 'https://pztnhibtrmwnufsjbwhr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6dG5oaWJ0cm13bnVmc2pid2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMjExNDcsImV4cCI6MjA2Mjg5NzE0N30.i5LdNSWlbhplSmSuBunMqs2kVfCshCOaKXLsMOofqZ0';
const TABLE = 'pets';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

const listaPets = () => {
  return fetch(`${API_URL}?select=*`, { headers: HEADERS })
    .then(res => {
      if (!res.ok) throw new Error('Error al listar mascotas');
      return res.json();
    });
};

const crearPet = (nombre, especie, edad) => {
  const pet = { nombre, especie, edad: parseInt(edad) };

  return fetch(API_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(pet)
  }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Error al insertar mascota');
    }

    try {
      return await res.json();
    } catch {
      return pet; 
    }
  });
};

// Eliminar mascota
const eliminarPet = (id) => {
  return fetch(`${API_URL}?id=eq.${id}`, {
    method: 'DELETE',
    headers: HEADERS
  });
};

export const petService = {
  listaPets,
  crearPet,
  eliminarPet
};