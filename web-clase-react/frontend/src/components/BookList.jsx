import { Card, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const BookList = ({ libros, onDelete, onEdit }) => (
  <div>
    {libros.map((libro) => (
      <Card key={libro.id} style={{ margin: '8px 0', padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Typography variant="h6">{libro.titulo}</Typography>
          <Typography variant="body2" color="textSecondary">
            {libro.autor} ({libro.anio})
          </Typography>
        </div>
        <div>
          <IconButton onClick={() => onEdit(libro)}><EditIcon /></IconButton>
          <IconButton onClick={() => onDelete(libro.id)}><DeleteIcon /></IconButton>
        </div>
      </Card>
    ))}
  </div>
);

export default BookList;
