
document.getElementById('contacto-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    if (nombre && email && mensaje) {
        alert('¡Gracias por tu mensaje, ' + nombre + '! Me pondré en contacto contigo pronto.');
        this.reset(); 
    } else {
        alert('Por favor, completa todos los campos.');
    }
});
