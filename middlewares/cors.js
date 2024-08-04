import cors from `cors`

export const corsMiddlewares = ()=> cors({
    origin:(origin, callback) => {
        const ACCEPTED_ORIGINS = [
            `http://localhost:3001`,
            `http://localhost:3000`,
            `http://movies.com`
        ]
        if(ACCEPTED_ORIGINS.includes(origin)){
            return callback(null, true)
        }
        if(!origin){
            return callback(null, true)
        }
        return callback(new Error(`Not allowed by CORS`))
    }
})