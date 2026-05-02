import { Navigate, Outlet } from 'react-router-dom'
import { useIsAuth, useAuth } from '../hooks'
import { useSelector } from 'react-redux'
import { selectLoading } from '../features/auth/authSlice'

export default function ProtectedRoute({ allowedRoles }) {
  const isAuth  = useIsAuth()
  const user    = useAuth()
  const loading = useSelector(selectLoading)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuth) return <Navigate to="/login" replace />

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
