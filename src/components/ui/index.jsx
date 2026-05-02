// ── Spinner ───────────────────────────────────────────────────
export function Spinner({ size = 'md' }) {
  const sz = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }[size]
  return (
    <div className={`${sz} border-2 border-brand-500 border-t-transparent rounded-full animate-spin`} />
  )
}

// ── Live Badge ────────────────────────────────────────────────
export function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium font-mono">
      <span className="live-dot" />
      LIVE
    </span>
  )
}

// ── Stat Card ─────────────────────────────────────────────────
export function StatCard({ label, value, sub, accent }) {
  return (
    <div className="glass-card p-4">
      <p className="text-white/40 text-xs font-mono uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-3xl font-display tracking-wide ${accent ?? 'text-white'}`}>{value}</p>
      {sub && <p className="text-white/40 text-xs mt-1">{sub}</p>}
    </div>
  )
}

// ── Section Header ────────────────────────────────────────────
export function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="page-title">{title}</h2>
        {subtitle && <p className="text-white/40 text-sm mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

// ── Empty State ───────────────────────────────────────────────
export function EmptyState({ icon: Icon, title, desc }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {Icon && <Icon className="text-white/10 mb-4" size={48} />}
      <p className="text-white/40 font-display tracking-wider text-xl mb-1">{title}</p>
      {desc && <p className="text-white/25 text-sm">{desc}</p>}
    </div>
  )
}

// ── Role Badge ────────────────────────────────────────────────
export function RoleBadge({ role }) {
  const styles = {
    admin: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    fan:   'bg-brand-500/10 text-brand-400 border-brand-500/20',
    guest: 'bg-white/5 text-white/40 border-white/10',
  }
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-mono border capitalize ${styles[role] ?? styles.guest}`}>
      {role}
    </span>
  )
}
