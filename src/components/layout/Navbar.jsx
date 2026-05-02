import { Link, NavLink, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { useAuth, useIsAuth, useRole } from '../../hooks'
import { BarChart2, Home, List, Users, GitCompare, LogOut, LogIn, User } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/',         label: 'Home',      icon: Home,      roles: ['guest','fan','admin'] },
  { to: '/leagues',  label: 'Leagues',   icon: List,      roles: ['guest','fan','admin'] },
  { to: '/dashboard',label: 'Dashboard', icon: BarChart2, roles: ['fan','admin'] },
  { to: '/compare',  label: 'Compare',   icon: GitCompare,roles: ['fan','admin'] },
]

export default function Navbar() {
  const isAuth   = useIsAuth()
  const user     = useAuth()
  const role     = useRole()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const activeClass    = 'text-brand-400 bg-brand-500/10'
  const inactiveClass  = 'text-white/50 hover:text-white hover:bg-white/5'
  const baseLinkClass  = 'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150'

  return (
    <nav className="border-b border-white/5 bg-pitch/80 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-2xl tracking-widest text-brand-400">SPORT</span>
          <span className="font-display text-2xl tracking-widest text-white">SCOPE</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems
            .filter(n => n.roles.includes(role))
            .map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))
          }
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {isAuth ? (
            <>
              <div className="hidden md:flex items-center gap-2 text-sm text-white/60">
                <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center text-xs font-medium text-white">
                  {user?.displayName?.[0] ?? user?.email?.[0] ?? 'U'}
                </div>
                <span className="capitalize text-brand-400">{role}</span>
              </div>
              <button onClick={handleLogout} className="btn-ghost text-sm flex items-center gap-1.5">
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    className="btn-ghost text-sm flex items-center gap-1.5"><LogIn  size={14} /> Login</Link>
              <Link to="/register" className="btn-primary text-sm flex items-center gap-1.5"><User   size={14} /> Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
