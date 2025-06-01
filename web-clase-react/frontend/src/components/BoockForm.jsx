import { TextField, Button } from '@mui/material';

const BookForm = ({ libro, onChange, onSubmit, modoEdicion }) => (
  <form style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
    <TextField label="Título" name="titulo" value={libro.titulo} onChange={onChange} />
    <TextField label="Autor" name="autor" value={libro.autor} onChange={onChange} />
    <TextField label="Año" name="anio" value={libro.anio} onChange={onChange} />
    <Button variant="contained" onClick={onSubmit}>
      {modoEdicion ? 'Actualizar' : 'Agregar'}
    </Button>
  </form>
);

export default BookForm;
