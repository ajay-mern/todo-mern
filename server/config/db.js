const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
        console.log(`mongoDB is connected successfully ${process.env.DB_NAME}`)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB