import express, { json } from 'express'
import { router } from './Routes/movies'
import { corsMiddlewares } from './middlewares/cors'
const app = express()
app.use(app.use(json()))
app.get(`/`, (req, res) => {
    res.json({message: "Hola node"})
})
app.use(corsMiddlewares())
app.use(`/movies`, router)

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})