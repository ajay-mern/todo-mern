const express = require("express")
const router = express.Router()
const protect = require("../middlewares/authMiddleware.js")
const { getTodos, updateTodo, deleteTodo, createTodo } = require("../controllers/todoController")
router.get('/', protect, getTodos)

router.post("/", protect, createTodo)

router.put('/:id', protect, updateTodo)

router.delete("/:id", protect, deleteTodo)

module.exports = router