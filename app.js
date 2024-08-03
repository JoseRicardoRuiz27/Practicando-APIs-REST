const express = require('express')
const crypto = require('node:crypto')
const movies = require(`./movies.json`)
const { validateMovie } = require('./schema')

const app = express()
app.use(app.use(express.json()))
app.get(`/`, (req, res) => {
    res.json({message: "Hola node"})
})

app.get(`/movies`, (req, res) => {
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

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})