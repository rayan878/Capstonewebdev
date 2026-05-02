import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadTopScorers, selectTopScorers } from '../features/players/playersSlice'
import { loadStandings, selectStandings } from '../features/leagues/leaguesSlice'
import { SectionHeader, StatCard } from '../components/ui'
import { GoalsTrendChart } from '../components/charts/GoalsChart'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, RadarChart,
  PolarGrid, PolarAngleAxis, Radar
} from 'recharts'
import { mockGoalsTrend } from '../services/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card px-3 py-2 text-sm">
      <p className="text-white/50 font-mono text-xs mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const dispatch    = useDispatch()
  const topScorers  = useSelector(selectTopScorers)
  const standings   = useSelector(selectStandings)

  useEffect(() => {
    dispatch(loadTopScorers({ leagueId: 39, season: 2023 }))
    dispatch(loadStandings({ leagueId: 39, season: 2023 }))
  }, [dispatch])

  const barData = topScorers.slice(0, 8).map(p => ({
    name:    p.player.name.split(' ').pop(),
    Goals:   p.statistics[0].goals.total,
    Assists: p.statistics[0].assists ?? 0,
  }))

  const standingsData = standings.slice(0, 6).map(s => ({
    name: s.team.name.split(' ')[0],
    pts:  s.points,
    gd:   s.goalsDiff,
    w:    s.all.win,
  }))

  return (
    <div className="space-y-10">
      <SectionHeader title="DASHBOARD" subtitle="Premier League 2023/24 — Analytics Overview" />

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Top Goals"   value={topScorers[0]?.statistics[0]?.goals?.total ?? '–'} accent="text-brand-400" sub={topScorers[0]?.player?.name} />
        <StatCard label="Top Assists" value={topScorers.reduce((m, p) => Math.max(m, p.statistics[0].assists ?? 0), 0)} accent="text-cyan-400" />
        <StatCard label="Avg Goals/Match" value={(mockGoalsTrend.reduce((s, g) => s + g.home + g.away, 0) / mockGoalsTrend.length).toFixed(1)} />
        <StatCard label="Teams"       value={standings.length || 20} />
      </div>

      {/* Goals trend */}
      <div className="glass-card p-6">
        <h3 className="font-display tracking-wider text-xl mb-5">GOALS TREND — LAST 7 GAMEWEEKS</h3>
        <GoalsTrendChart data={mockGoalsTrend} />
      </div>

      {/* Top scorers bar */}
      <div className="glass-card p-6">
        <h3 className="font-display tracking-wider text-xl mb-5">TOP SCORERS vs ASSISTS</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
            <Bar dataKey="Goals"   fill="#6366f1" radius={[4,4,0,0]} />
            <Bar dataKey="Assists" fill="#22d3ee" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Standings table */}
      {standings.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="font-display tracking-wider text-xl mb-5">LEAGUE TABLE</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/30 font-mono text-xs border-b border-white/5">
                  <th className="pb-2 text-left w-8">#</th>
                  <th className="pb-2 text-left">Team</th>
                  <th className="pb-2 text-right">P</th>
                  <th className="pb-2 text-right">W</th>
                  <th className="pb-2 text-right">D</th>
                  <th className="pb-2 text-right">L</th>
                  <th className="pb-2 text-right">GD</th>
                  <th className="pb-2 text-right font-medium text-white/50">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.slice(0, 10).map((s) => (
                  <tr key={s.rank} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="py-2.5 text-white/30 font-mono text-xs">{s.rank}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <img src={s.team.logo} alt={s.team.name} className="w-5 h-5 object-contain" />
                        <span className="text-white/80 font-medium">{s.team.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right text-white/40 font-mono">{s.all.played}</td>
                    <td className="py-2.5 text-right text-white/40 font-mono">{s.all.win}</td>
                    <td className="py-2.5 text-right text-white/40 font-mono">{s.all.draw}</td>
                    <td className="py-2.5 text-right text-white/40 font-mono">{s.all.lose}</td>
                    <td className={`py-2.5 text-right font-mono ${s.goalsDiff > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {s.goalsDiff > 0 ? '+' : ''}{s.goalsDiff}
                    </td>
                    <td className="py-2.5 text-right font-display text-lg text-brand-400">{s.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
