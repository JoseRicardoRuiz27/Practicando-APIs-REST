import movies from `./movies.json` with {type : `json`}
import { Router } from "express";
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from './schema.js'

export const router = Router()
router.get(`/`, (req, res) => {
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

router.get(`/:id`,(req, res) => {
        const {id} = req.params
        const movie = movies.find(movie => movie.id === id)
        if(movie) return res.json(movie)
    
        res.status(404).json({message: `Movies Not Found`})
})

router.post(`/:id`,(req, res) => {
    const resultado = validateMovie(req.body)
    if(resultado.error){
        return res.status(400).json({error: JSON.parse
            ( resultado.error.message)})
    }

    const newMovie = {
        id: randomUUID(),
        ...resultado.date
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})

router.delete(`/:id`,(req, res) => {
    const {id} = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if(movieIndex === -1){
        return res.status(400).json({message: `Not foun`})
    }

    movies.splice(movieIndex, 1)
    res.json({message: `Movie Delete`})    
})

router.patch(`/:id` ,(req, res) => {

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