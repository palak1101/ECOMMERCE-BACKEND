import express from 'express';
import dotenv from 'dotenv';
import connectDB from './services/mongodb/connectDB';
dotenv.config()
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';


const app = express()
const port = process.env.PORT || 3003

connectDB()


app.use(cors())
app.use(express.json())


//route to handle auth requests
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/order", orderRoutes)


app.get('/', (req, res) => {
    res.send(`Server running at PORT ${port} (Deployed via workflow with secret)`)
})

app.listen(port, (req, res) => {
    console.log(`Server listeninig at PORT ${port}`)
})