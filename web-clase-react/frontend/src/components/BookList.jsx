import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const BookList = ({ libros, onDelete, onEdit }) => (
  <Grid container spacing={2}>
    {libros.map((libro) => (
      <Grid item xs={12} sm={6} key={libro.id}>
        <Card variant='outlined'>
          <CardContent>
            <Typography variant='h6'>{libro.titulo}</Typography>
            <Typography variant='body2' color='secondary'>
              {libro.autor} ({libro.anio})
            </Typography>
            <IconButton color='primary' onClick={() => onEdit(libro)}>
              <EditIcon />
            </IconButton>
            <IconButton color='error' onClick={() => onDelete(libro.id)}>
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default BookList;
