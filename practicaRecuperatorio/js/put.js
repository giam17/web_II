const putData = () => {
    const update = {
      task: "Tarea Actualizada",
      fecha: new Date().toISOString().split('T')[0],
      descripcion: {
        nombre: "Nombre Actualizado",
        valor: 999
      }
    };
  
    fetch(`${API_URL}/2`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(update)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`ERROR EN LA RESPUESTA estado: ${response.status}`);
        }
        return response.json();
      })
      .then(data => showResult(data))
      .catch(error => showResult(error.message, true));
  };
  