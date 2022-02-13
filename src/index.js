import express from 'express';
import dotenv from 'dotenv';
import connectDB from './services/mongodb/connectDB';
dotenv.config()

const app = express()
const port = process.env.PORT || 3003

connectDB()


app.get('/', (req, res) => {
    res.send(`Server running at ${port}`)
})

app.listen(port, (req, res) => {
    console.log(`Server listeninig at PORT ${port}`)
})