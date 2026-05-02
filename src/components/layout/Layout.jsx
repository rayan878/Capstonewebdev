import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <Outlet />
      </main>
      <footer className="border-t border-white/5 py-6 text-center text-white/30 text-sm font-mono">
        SportScope © 2024 — Built with React + Vite + Redux
      </footer>
    </div>
  )
}
