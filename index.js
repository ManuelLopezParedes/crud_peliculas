const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000

// Middleware básico
app.use(express.json())
app.use(cors()) // Habilitar CORS
const {agregar, obtenerPorId, obtenerTodos} = require('./pelicula.repositorio')

// ruta de prueba
app.get("/", (req, res) =>{
    res.send('Hola mundo');
});

app.get('/api/peliculas', async (req, res) => {
    let peliculas = await obtenerTodos()
    res.status(200).json(peliculas)
})

app.get('/api/peliculas/:id', async (req, res) => {
    //console.log(req.params.id)
    let pelicula = await obtenerPorId(req.params.id)
    if (pelicula == undefined)
        return res.status(404).json({ mensaje: "Pelicula no encontrada con el id: " + req.params.id })
    return res.status(200).json(pelicula)
})

app.post('/api/peliculas/', async (req, res) => {
    console.log(req.body)
    let pelicula = {
        titulo: req.body.titulo,
        visto: false,
        resumen: req.body.resumen
    }
    let id = await agregar(pelicula)
    //pelicula.id = id
    res.status(201).json(pelicula)
})

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});