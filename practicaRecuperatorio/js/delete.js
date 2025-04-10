const deleteData = () => {
    fetch(`${API_URL}/d7e7`, {
      method: "DELETE"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`ERROR EN LA RESPUESTA estado: ${response.status}`);
        }
        showResult({
          message: "El post con id 1 fue eliminado",
          status: response.status
        });
      })
      .catch(error => showResult(error.message, true));
  };
  