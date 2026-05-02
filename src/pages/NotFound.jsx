import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <p className="font-display text-[8rem] text-white/5 leading-none select-none">404</p>
      <h2 className="font-display text-3xl tracking-wider text-white -mt-4">PAGE NOT FOUND</h2>
      <p className="text-white/30 mt-2 mb-8">This one went wide of the post.</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  )
}
