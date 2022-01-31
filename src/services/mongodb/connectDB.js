import mongoose from 'mongoose';


const connectDB = async () => {

    const connectionString = process.env.DB_URL

    try {
        await mongoose.connect(connectionString)
        console.log("Connected to DB")
    } catch (error) {
        console.log(`Couldn't connect to DB: ${error.message}`)
        console.log(error.message)
    }
}


export default connectDB;