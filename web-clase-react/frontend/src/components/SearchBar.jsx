import { TextField } from '@mui/material';

const SearchBar = ({ filtro, onBuscar }) => (
  <TextField
    label="Buscar libro"
    variant="outlined"
    fullWidth
    sx={{ mb: 2 }}
    value={filtro}
    onChange={onBuscar}
  />
);

export default SearchBar;
