const express = require('express');
const cors = require('cors')
const mssql = require('mssql');
const res = require('express/lib/response');

const app = express();
app.use(cors());
app.use(express.json());

const config ={
    user: 'library_user',             
    password: 'Library123!',          
    server: 'localhost',             
    database: 'BibliotecaDB',
    options: {
        encrypt: false,          
        trustServerCertificate: true
    }
};
let pool

const conectarBD=async()=>{
    try{
        pool=await sql.connect(config);
    } catch(err){
        console.error('todo mal'.err);
    }
};

app.post('/api/libros', async (req, res) => {
    const { titulo, autor, anio } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('titulo', sql.NVarChar, titulo)
            .input('autor', sql.NVarChar, autor)
            .input('anio', sql.Int, anio)
            .query('INSERT INTO Libros (Titulo, Autor, Anio) VALUES (@titulo, @autor, @anio)');
        res.sendStatus(201);
    } catch (error) {
        console.error('Error al agregar libro:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});
app.get('/api/libros', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Libros');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener libros:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});
app.delete('/api/libros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Libros WHERE Id = @id');
        res.sendStatus(200);
    } catch (error) {
        console.error('Error al eliminar libro:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});
app.put('/api/libros/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, anio } = req.body;

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, id)
      .input('titulo', sql.NVarChar, titulo)
      .input('autor', sql.NVarChar, autor)
      .input('anio', sql.Int, anio)
      .query('UPDATE Libros SET Titulo = @titulo, Autor = @autor, Anio = @anio WHERE Id = @id');

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error al actualizar libro:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});



app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
