require("dotenv").config()
const express = require("express")
const app = express()
const todoRoutes = require("./routes/todoRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const connectDB = require("./config/db.js")
const cors = require("cors")

const dotenv = require("dotenv")
const port = 8080
connectDB()

app.get("/", (req, res) => {
    res.send("todo app is running success fully")
})
app.use(cors({ origin: ["http://localhost:5173", "https://todo-mern-tau-gold.vercel.app/"], credentials: true }))
app.use(express.json())
app.use("/api/todos", todoRoutes)
app.use("/api/users", userRoutes)

app.listen(port, () => {
    console.log("server running at port ", process.env.PORT)
})