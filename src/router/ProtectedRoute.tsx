import React, { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

interface ProtectedRouteProps {
    children: ReactNode; // Specifies that `children` can be any valid React node
  }
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) =>{
    const isAuth= localStorage.getItem('isLoggedIn')
    const location=useLocation()
    return isAuth?children:<Navigate to="/auth/login" state={{from: location}}/>
}
export default ProtectedRoute