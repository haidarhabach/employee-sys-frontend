import { useContext } from "react"
import { Navigate, Outlet } from "react-router"
import { AuthContext } from "../context/auth-provider"
import { validateToken } from "../lib/utils"

const ProtectedRoute = () => {
    const context = useContext(AuthContext)
    const {valid, payload} = validateToken(context?.token || "")
    if(!valid){
        return <Navigate to="/login" replace />
    }
    if(valid && payload?.role !== "admin"){
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute