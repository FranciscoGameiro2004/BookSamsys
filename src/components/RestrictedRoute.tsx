import { useEffect, useState, ReactNode } from 'react'
import { Navigate } from 'react-router'
import  secureLocalStorage  from  "react-secure-storage";
import Dashboard from '../views/Dashboard.tsx'

interface RestrictedRouteProps {
  children: ReactNode
}

export default function RestrictedRoute({children}: RestrictedRouteProps) {
  const [jwtToken, setJWTToken] = useState(secureLocalStorage.getItem("jwt"));

  useEffect(() => {
    setJWTToken(secureLocalStorage.getItem("jwt"));
  }, [jwtToken])

  return (
    jwtToken !== "" && jwtToken !== undefined && jwtToken !== null ? children : <Navigate to="/login" replace />
  )
}