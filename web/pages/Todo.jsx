import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/api";
import { useAuth } from "../context/AuthContext";
import "./Todo.css"
export const Todos = () => {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState(null)
    const [editTitle, setEditTitle] = useState("")
    const [title, setTitle] = useState("")
    const { token } = useAuth()


    const fetchTodos = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/todos`, { headers: { Authorization: `Bearer ${token}` } })
            setTodos(res.data.todos)
            setLoading(false)
            // console.log(res.data.todos)
        } catch (error) {
            console.log(error.response?.data?.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    const addTodo = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/todos`, { title }, { headers: { Authorization: `Bearer ${token}` } })
            setTodos([...todos, res.data])
            console.log(res)
            setTitle('')
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            setTodos(todos.filter((todo) => todo._id !== id))
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    const updateTodo = async (id) => {
        try {
            const res = await axios.put(`${BASE_URL}/todos/${id}`, { title: editTitle }, { headers: { Authorization: `Bearer ${token}` } })
            setTodos(todos.map((todo) => todo._id === id ? res.data.todo : todo))
            setEditingId(null)
            setEditTitle("")
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="todo-container">
            <h2 style={{ margin: "auto" }}>welcome back </h2>
            <h2 className="todo-title">My Todos</h2>
            <div className="todo-input">
                <input type="text" placeholder="enter todo" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: "8px", marginRight: "10px" }} />
                <button onClick={addTodo}>Add Todo</button>
            </div>
            {todos.length === 0 ? (
                <p>No todos found</p>
            ) : (
                todos.map((todo) => (
                    <div key={todo._id} className="todo-card">
                        {editingId === todo._id ? (
                            <>
                                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                                <button className="save-btn" onClick={() => updateTodo(todo._id)}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                {/* VIEW MODE */}
                                <h4>{todo.title}</h4>
                                <p className="todo-status">Status: {todo.completed ? "Done" : "Pending"}</p>

                                <div className="todo-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => {
                                            setEditingId(todo._id)
                                            setEditTitle(todo.title)
                                        }}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </>
                        )}
                        <button className="delete-btn"
                            onClick={() => deleteTodo(todo._id)}
                            style={{ background: "red", color: "white" }}
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    )
}