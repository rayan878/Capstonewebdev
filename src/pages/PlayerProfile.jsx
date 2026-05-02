import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadPlayerById, selectSelectedPlayer } from '../features/players/playersSlice'
import { Spinner, StatCard } from '../components/ui'
import { mockTopScorers } from '../services/mockData'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'

export default function PlayerProfile() {
  const { id }     = useParams()
  const dispatch   = useDispatch()
  const player     = useSelector(selectSelectedPlayer)

  useEffect(() => {
    dispatch(loadPlayerById({ playerId: id, season: 2023 }))
  }, [id, dispatch])

  // Use mock fallback
  const data = player ?? mockTopScorers.find(p => String(p.player.id) === id) ?? mockTopScorers[0]
  if (!data) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  const { player: p, statistics } = data
  const stats = statistics[0]

  const radarData = [
    { stat: 'Goals',   value: Math.min(stats.goals.total, 30) },
    { stat: 'Assists', value: Math.min(stats.assists ?? 0, 20) },
    { stat: 'Apps',    value: Math.min(stats.games.appearences, 38) },
    { stat: 'Rating',  value: Math.min(parseFloat(stats.games?.rating ?? 7) * 3, 30) },
    { stat: 'Shots',   value: Math.min(stats.shots?.total ?? 60, 80) / 3 },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero */}
      <div className="glass-card p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={p.photo}
            alt={p.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-brand-500/30"
            onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${p.name}&background=4f46e5&color=fff&size=112` }}
          />
          <div className="flex-1 text-center md:text-left">
            <p className="text-white/40 font-mono text-sm mb-1">{p.nationality}</p>
            <h1 className="font-display text-5xl tracking-wider text-white">{p.name.toUpperCase()}</h1>
            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              <span className="stat-badge bg-brand-500/10 text-brand-400 border border-brand-500/20">{p.nationality}</span>
              {stats.team?.name && <span className="stat-badge bg-white/5 text-white/50 border border-white/10">{stats.team.name}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Goals"        value={stats.goals.total}         accent="text-brand-400" />
        <StatCard label="Assists"      value={stats.assists ?? 0}         accent="text-cyan-400" />
        <StatCard label="Appearances"  value={stats.games.appearences}    />
        <StatCard label="Avg Rating"   value={parseFloat(stats.games?.rating ?? 7).toFixed(1)} />
      </div>

      {/* Radar chart */}
      <div className="glass-card p-6">
        <h3 className="font-display tracking-wider text-xl mb-5">PERFORMANCE RADAR</h3>
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis dataKey="stat" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
            <Radar name={p.name} dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Extended stats */}
      <div className="glass-card p-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        {[
          ['Shots Total',     stats.shots?.total ?? 'N/A'],
          ['Shots On Target', stats.shots?.on    ?? 'N/A'],
          ['Key Passes',      stats.passes?.key  ?? 'N/A'],
          ['Pass Accuracy',   stats.passes?.accuracy ? stats.passes.accuracy + '%' : 'N/A'],
          ['Dribbles',        stats.dribbles?.success ?? 'N/A'],
          ['Fouls Drawn',     stats.fouls?.drawn ?? 'N/A'],
        ].map(([label, val]) => (
          <div key={label} className="border-b border-white/5 pb-3">
            <p className="text-white/30 text-xs font-mono mb-1">{label}</p>
            <p className="text-white font-medium font-display text-2xl tracking-wide">{val}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
