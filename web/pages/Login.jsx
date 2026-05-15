import axios from "axios"
import { BASE_URL } from "../constants/api.js"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { useAuth } from '../context/AuthContext'
export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { login, token } = useAuth()
    useEffect(() => {
        if (token) {
            navigate("/todos", { replace: true })
        }
    }, [token])
    const handleclick = async () => {
        // console.log("clicked")
        try {
            const res = await axios.post(`${BASE_URL}/users/login`, { email, password })
            login(res.data.token)
            navigate("/todos", { replace: true })
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleclick}>Login</button>
            </div>
        </div>
    )
}