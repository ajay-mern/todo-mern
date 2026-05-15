const Todo = require("../models/Todo.js")
const User = require("../models/User.js")
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id })
        res.json({ count: todos.length, todos })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createTodo = async (req, res) => {
    try {
        const todo = await Todo.create({
            title: req.body.title,
            user: req.user.id
        })
        await todo.populate("user")
        res.status(201).json(todo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateTodo = async (req, res) => {
    try {
        const { title, completed } = req.body
        const todo = await Todo.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            }, {
            title: title,
            completed: completed
        },
            { new: true }
        )

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" })
        }
        res.json({
            message: "Todo updated",
            todo
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        })
        if (!todo) {
            return res.status(404).json({ message: "todo not found" })
        }
        res.json({
            message: "Todo deleted",
            id: todo._id
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo }