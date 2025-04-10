const getData = () => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la petición GET. Estado: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        showResult(data);
        renderTabla(data);
      })
      .catch(error => showResult(error.message, true));
  };
  
  function renderTabla(posts) {
    const tablaBody = document.querySelector('#taskTable tbody');
    tablaBody.innerHTML = ''; 
    posts.forEach(post => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${post.task}</td>
        <td>${post.fecha}</td>
        <td>${post.descripcion.nombre}</td>
        <td>${post.descripcion.valor}</td>
      `;
      tablaBody.appendChild(fila);
    });
  }
  