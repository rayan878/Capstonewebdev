import { Navigate, Outlet } from 'react-router-dom'
import { useRole, useIsAuth } from '../hooks'

const ROLE_LEVEL = { guest: 0, fan: 1, admin: 2 }

export default function RoleRoute({ minRole = 'fan' }) {
  const isAuth = useIsAuth()
  const role   = useRole()

  if (!isAuth) return <Navigate to="/login" replace />

  if ((ROLE_LEVEL[role] ?? 0) < (ROLE_LEVEL[minRole] ?? 1)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
