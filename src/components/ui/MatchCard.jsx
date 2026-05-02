import { LiveBadge } from '../ui'

export default function MatchCard({ fixture }) {
  const { fixture: fix, league, teams, goals } = fixture
  const isLive = fix.status.short === 'LIVE' || fix.status.short === '1H' || fix.status.short === '2H'
  const isFinished = fix.status.short === 'FT'

  return (
    <div className="glass-card p-4 hover:border-brand-500/30 transition-all duration-200 group">
      {/* League row */}
      <div className="flex items-center gap-2 mb-3">
        <img src={league.logo} alt={league.name} className="w-4 h-4 object-contain opacity-60" />
        <span className="text-white/30 text-xs font-mono">{league.name}</span>
        <div className="ml-auto">
          {isLive    && <LiveBadge />}
          {isFinished && <span className="text-white/25 text-xs font-mono">FT</span>}
        </div>
      </div>

      {/* Score row */}
      <div className="flex items-center justify-between">
        <TeamSide team={teams.home} align="left" />
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 font-display text-3xl tracking-wider">
            <span className={goals.home > goals.away ? 'text-white' : 'text-white/40'}>{goals.home ?? '–'}</span>
            <span className="text-white/20 text-lg">:</span>
            <span className={goals.away > goals.home ? 'text-white' : 'text-white/40'}>{goals.away ?? '–'}</span>
          </div>
          {isLive && (
            <span className="text-green-400 text-xs font-mono mt-0.5">{fix.status.elapsed}'</span>
          )}
        </div>
        <TeamSide team={teams.away} align="right" />
      </div>
    </div>
  )
}

function TeamSide({ team, align }) {
  return (
    <div className={`flex flex-col items-${align === 'left' ? 'start' : 'end'} gap-1.5 w-28`}>
      <img src={team.logo} alt={team.name} className="w-8 h-8 object-contain" />
      <span className="text-white/70 text-xs font-medium leading-tight">{team.name}</span>
    </div>
  )
}
