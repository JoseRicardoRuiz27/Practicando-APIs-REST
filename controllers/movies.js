import { validateMovie, validatePartialMovie } from './schema.js'
import { MovieModel } from "../modelos/movie.js";

export class MovieController {
    static async getAll (req, res){    
        const {genre} = req.query
        const movies = await MovieModel.getAll({genre})
        res.json(movies)
    }
    static async getById(req, res) {
        const {id} = req.params
        const movie = await MovieModel.getById({id})
        if(movie) return res.json(movie)
    
        res.status(404).json({message: `Movies Not Found`})
    }
    static async create(req, res){
        const resultado = validateMovie(req.body)
        if(resultado.error){
            return res.status(400).json({error: JSON.parse
                ( resultado.error.message)})
        }
            
        const newMovie = await MovieModel.create({input: result.data})
        res.status(201).json(newMovie)
    }
    static async delete(req, res) {
        const {id} = req.params
    
        const result = await MovieModel.delete({id})
    
        if(result = false){
            return res.status(400).json({message: `Not foun`})
        }
    
        return res.json({message: `Movie Delete`})    
    }
    static async patch (req, res) {

        const result = validatePartialMovie(req.body)
    
        if (!result.success) {
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
        const {id} = req.params
        const updateMovie = await MovieModel.update({id,input: result.data})
        return res.json(updateMovie)
    }
}