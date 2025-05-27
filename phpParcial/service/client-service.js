const API_URL = "http://localhost/cine-api/api.php?table=clientes";
const API_URL_BOLETOS = "http://localhost/cine-api/api.php?table=boletos";

const listaClientes = async () => {
  const clientesRes = await fetch(API_URL);
  if (!clientesRes.ok) throw new Error("Error al obtener clientes");
  const clientes = await clientesRes.json();

  const boletosRes = await fetch(API_URL_BOLETOS);
  const boletos = await boletosRes.json();

  return clientes.map(cliente => ({
    ...cliente,
    boleto: boletos.find(b => Number(cliente.id_bo) === Number(b.id_bo)) || {}
  }));
};

const crearCliente = (nombre, email, id_bo) => {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      email,
      id_bo: Number(id_bo)
    })
  }).then(response => {
    if (!response.ok) throw new Error("Error al crear cliente");
    return response.json();
  });
};

const eliminarCliente = (id_cl) => {
  return fetch(`${API_URL}&id=${id_cl}`, { method: "DELETE" })
    .then(response => {
      if (!response.ok) throw new Error("Error al eliminar cliente");
      return response.json();
    });
};

export const clientService = {
  listaClientes,
  crearCliente,
  eliminarCliente
};
