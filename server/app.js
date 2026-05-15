const express = require("express")
const app = express()
const todoRoutes = require("./routes/todoRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const connectDB = require("./config/db.js")

const dotenv = require("dotenv")
const port = 8080
dotenv.config()
connectDB()

app.get("/", (req, res) => {
    res.send("todo app is running success fully")
})
app.use(express.json())
app.use("/api/todos", todoRoutes)
app.use("/api/users", userRoutes)

app.listen(port, () => {
    console.log("server running at port ", process.env.PORT)
})