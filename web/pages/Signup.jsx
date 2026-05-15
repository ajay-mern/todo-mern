import axios from "axios";
import "./Login.css"

import { BASE_URL } from "../constants/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleSignup = async () => {
        try {
            await axios.post(`${BASE_URL}/users/register`, { name, email, password })
            navigate('/login')
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }


    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Signup</h2>

                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

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

                <button onClick={handleSignup}>Signup</button>
            </div>
        </div>
    )
}