import zod from  `zod`
const movieSchema = zod.object({
    title: zod.string({
        required_error: `Movie title is required`
    }),
    year: zod.number().int().min(1900).max(2025),
    director: zod.string(),
    duration: zod.number().int().positive(),
    rate: zod.number().min(0).max(10).default(0),
    poster: zod.string().url(),
    genre: zod.array(
        zod.enum([`Action`, `Adventure`, `Comedy`, `Drama`, `Fantasy`, `Crime`, `Horror`, `Thriller`, `Sci-Fi`])
    )
})

export function validateMovie (object){
    return movieSchema.safeParse(object)
}
export function validatePartialMovie (object){
    return movieSchema.partial().safeParse(object)
}
