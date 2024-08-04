const express = require('express')
const crypto = require('node:crypto')
const movies = require(`./movies.json`)
const { validateMovie, validatePartialMovie } = require('./schema')

const app = express()
app.use(app.use(express.json()))
app.get(`/`, (req, res) => {
    res.json({message: "Hola node"})
})

//CORS metodos normales = GET/HEAD/POST
//CORS metodos complejos = PUT/PATCH/DELETE -->CORS PRE-Flight -->OPTIONS

const ACCEPTED_ORIGINS = [
    `http://localhost:3000`,
    `http://localhost:3001`,
    `http://movies.com`,
]

app.get(`/movies`, (req, res) => {
    const origin = req.header(`origin`)
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header(`Access-Control-Allow-Origin`, origin)
    }
    const {genre} = req.query
    if(genre){
        const filtroGenre = movies.filter(
            movie => movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
        )
        return res.json(filtroGenre)
    }
    res.json(movies)
})

app.get(`/movies/:id`, (req, res) => {
    const {id} = req.params
    const movie = movies.find(movie => movie.id === id)
    if(movie) return res.json(movie)

    res.status(404).json({message: `Movies Not Found`})
})

app.post(`/movies`, (req, res) => {
    const resultado = validateMovie(req.body)
    if(resultado.error){
        return res.status(400).json({error: JSON.parse
            ( resultado.error.message)})
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...resultado.date
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})

app.delete(`/movies/:id`, (req, res) => {
    const {id} = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if(movieIndex === -1){
        return res.status(400).json({message: `Not foun`})
    }

    movies.splice(movieIndex, 1)
    res.json({message: `Movie Delete`})    
})

app.patch(`/movies/:id`, (req, res) => {

    const result = validatePartialMovie(req.body)

    if (!result.success) {
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }
    const {id} = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if(movieIndex === -1) {
        return res.status(404).json({message: `Movie Not Found`})
    }
    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie

    return res.json(updateMovie)
})

app.options(`/movies/:id`, (req,res) => {
    const origin = req.header(`origin`)
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header(`Access-Control-Allow-Origin`, origin)
        res.header(`Access-Control-Allow-Methods`, `GET, POST, PUT, PATCH, DELETE`)
    }
    res.send(200)
})

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})