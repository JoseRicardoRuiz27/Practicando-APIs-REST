const express = require(`express`)
const movies = require(`./movies.json`)

const app = express()

app.get(`/`, (req, res) => {
    res.json({message: "Hola node"})
})

app.get(`/movies`, (req, res) => {
    res.json(movies)
})

app.get(`/movies/:id`, (req, res) => {
    const {id} = req.params
    const movie = movies.find(movie => movie.id === id)
    if(movie) return res.json(movie)

    res.status(404).json({message: `Movies Not Found`})
})



const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})