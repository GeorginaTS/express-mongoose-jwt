import express from 'express'
import dbConnect from './config/mongo.js'
import router from "./routes/users.js"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3018

app.get('/', (request, response) => {
    response.send(`<h1> Bon dia 😊 Listening on port ${port} </h1>`)
})

app.use("/api/users", router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

dbConnect()