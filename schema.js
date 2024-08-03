const zod = require(`zod`)
const movieSchema = zod.object({
    title: zod.string({
        required_error: `Movie title is required`
    }),
    year: zod.number().int().min(1900).max(2025),
    director: zod.string(),
    duration: zod.number().int().positive(),
    rate: zod.number().min(0).max(10),
    poster: zod.string().url(),
    genre: zod.array(
        zod.enum([`Action`, `Adventure`, `Comedy`, `Drama`, `Fantasy`, `Horror`, `Thriller`, `Sci-Fi`])
    )
})

function validateMovie (object){
    return movieSchema.safeParse(object)
}

module.exports = {validateMovie}