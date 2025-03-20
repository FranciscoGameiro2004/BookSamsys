import { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import  secureLocalStorage  from  "react-secure-storage";
import Dashboard from '../views/Dashboard.tsx'

export default function DashboardRoute() {
  const [jwtToken, setJWTToken] = useState(secureLocalStorage.getItem("jwt"));

  useEffect(() => {
    setJWTToken(secureLocalStorage.getItem("jwt"));
  }, [jwtToken])

  return (
    jwtToken !== "" && jwtToken !== undefined && jwtToken !== null ? <Dashboard /> : <Navigate to="/login" replace />
  )
}