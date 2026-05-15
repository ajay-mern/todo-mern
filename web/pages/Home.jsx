import { Link } from "react-router-dom"
import "./Home.css"

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-box">
                <h1>Welcome to Todo App 🚀</h1>
                <p>Manage your tasks easily and stay productive.</p>

                <div className="home-buttons">
                    <Link to="/login">
                        <button>Login</button>
                    </Link>

                    <Link to="/signup">
                        <button className="signup">Signup</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home