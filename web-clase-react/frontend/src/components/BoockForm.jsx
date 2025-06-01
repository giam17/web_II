import { TextField, Button, Box } from '@mui/material';

const BookForm = ({ libro, onChange, onSubmit, modoEdicion }) => (
  <Box component='form' sx={{ mb: 4, display: 'flex', gap: 2 }}>
    <TextField label='Título' name='titulo' value={libro.titulo} onChange={onChange} fullWidth />
    <TextField label='Autor' name='autor' value={libro.autor} onChange={onChange} fullWidth />
    <TextField label='Año' name='anio' value={libro.anio} onChange={onChange} fullWidth />
    <Button variant='contained' color='primary' onClick={onSubmit}>
      {modoEdicion ? 'Actualizar' : 'Agregar'}
    </Button>
  </Box>
);


export default BookForm;
