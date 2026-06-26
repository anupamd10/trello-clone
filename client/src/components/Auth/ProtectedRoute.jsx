import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Spinner from '../UI/Spinner'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  if (loading) return <Spinner />
  return user ? <Outlet /> : <Navigate to="/login" replace />
}
