import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"


const PrivateRoute = ({ element }) => {
    const { token } = useAuth()
    return token ? element : <Navigate to="/login" replace
    />
}

export default PrivateRoute