import { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectUser, selectIsAuth, selectRole } from '../features/auth/authSlice'

// ── Auth hooks ────────────────────────────────────────────────
export const useAuth    = () => useSelector(selectUser)
export const useIsAuth  = () => useSelector(selectIsAuth)
export const useRole    = () => useSelector(selectRole)

// ── Debounce ─────────────────────────────────────────────────
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

// ── Live refresh ──────────────────────────────────────────────
export function useLiveRefresh(callback, intervalMs = 30000) {
  const savedCb = useRef(callback)
  useEffect(() => { savedCb.current = callback }, [callback])

  useEffect(() => {
    savedCb.current() // immediate
    const id = setInterval(() => savedCb.current(), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
}

// ── Window size ───────────────────────────────────────────────
export function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight })
  useEffect(() => {
    const h = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return size
}
