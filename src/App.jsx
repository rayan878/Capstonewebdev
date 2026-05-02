import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './services/firebase'
import { setUser, clearUser } from './features/auth/authSlice'

import Layout from './components/layout/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import RoleRoute from './routes/RoleRoute'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Leagues from './pages/Leagues'
import PlayerProfile from './pages/PlayerProfile'
import Compare from './pages/Compare'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'fan', // default; extend with Firestore roles
        }))
      } else {
        dispatch(clearUser())
      }
    })
    return () => unsub()
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="leagues" element={<Leagues />} />
          <Route path="player/:id" element={<PlayerProfile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Fan+ protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="compare" element={<Compare />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
