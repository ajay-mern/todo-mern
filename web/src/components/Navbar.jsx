import { Link } from "react-router-dom"
import "./Navbar.css"
import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
const Navbar = () => {
    const { token, logout } = useAuth()
    return (
        <nav className="navbar">
            <h2 className="logo">TodoApp</h2>

            <div className="nav-links">
                <Link to="/">Home</Link>
                {!token ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                ) :
                    (<>
                        <Link to="/todos">Todos</Link>
                        <button onClick={logout}>Logout</button>

                    </>)}
            </div>
        </nav>
    )
}

export default Navbar