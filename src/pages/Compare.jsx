import { useDispatch, useSelector } from 'react-redux'
import { selectCompareList, clearCompare, removeFromCompare } from '../features/players/playersSlice'
import { SectionHeader, EmptyState } from '../components/ui'
import { GitCompare, X } from 'lucide-react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from 'recharts'

export default function Compare() {
  const dispatch     = useDispatch()
  const compareList  = useSelector(selectCompareList)

  const getStats = (pd) => pd.statistics[0]

  const radarData = () => {
    const keys = ['goals', 'assists', 'apps']
    const labels = ['Goals', 'Assists', 'Apps']
    return labels.map((label, i) => {
      const entry = { stat: label }
      compareList.forEach((pd, pi) => {
        const s = getStats(pd)
        entry[`p${pi}`] =
          label === 'Goals'   ? s.goals.total :
          label === 'Assists' ? (s.assists ?? 0) :
          s.games.appearences
      })
      return entry
    })
  }

  const colors = ['#6366f1', '#22d3ee']

  return (
    <div className="space-y-8">
      <SectionHeader
        title="COMPARE"
        subtitle="Select up to 2 players from Top Scorers list"
        action={compareList.length > 0 && (
          <button onClick={() => dispatch(clearCompare())} className="btn-ghost text-sm flex items-center gap-1.5">
            <X size={14} /> Clear all
          </button>
        )}
      />

      {compareList.length === 0 ? (
        <EmptyState
          icon={GitCompare}
          title="NO PLAYERS SELECTED"
          desc='Go to Home page and click the compare icon on any player card'
        />
      ) : (
        <div className="space-y-8">
          {/* Player header cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {compareList.map((pd, i) => (
              <div key={pd.player.id} className="glass-card p-5 flex items-center gap-4" style={{ borderColor: colors[i] + '40' }}>
                <div className="w-1 self-stretch rounded-full" style={{ background: colors[i] }} />
                <img
                  src={pd.player.photo}
                  alt={pd.player.name}
                  className="w-14 h-14 rounded-full object-cover border-2"
                  style={{ borderColor: colors[i] + '60' }}
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${pd.player.name}&background=4f46e5&color=fff` }}
                />
                <div className="flex-1">
                  <p className="text-white font-display text-2xl tracking-wide">{pd.player.name}</p>
                  <p className="text-white/30 text-xs mt-0.5">{pd.player.nationality}</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCompare(pd.player.id))}
                  className="text-white/20 hover:text-white/60 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            {compareList.length === 1 && (
              <div className="glass-card p-5 flex items-center justify-center border-dashed">
                <p className="text-white/20 text-sm">Add a second player to compare</p>
              </div>
            )}
          </div>

          {/* Stat comparison table */}
          {compareList.length === 2 && (
            <>
              <div className="glass-card p-6">
                <h3 className="font-display tracking-wider text-xl mb-5">STAT COMPARISON</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-white/30 font-mono text-xs border-b border-white/5">
                      <th className="pb-2 text-left">Stat</th>
                      {compareList.map((pd, i) => (
                        <th key={pd.player.id} className="pb-2 text-right" style={{ color: colors[i] }}>
                          {pd.player.name.split(' ').pop()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Goals',       pd => getStats(pd).goals.total],
                      ['Assists',     pd => getStats(pd).assists ?? 0],
                      ['Appearances', pd => getStats(pd).games.appearences],
                      ['Rating',      pd => parseFloat(getStats(pd).games?.rating ?? 7).toFixed(1)],
                      ['Shots',       pd => getStats(pd).shots?.total ?? 'N/A'],
                      ['Key Passes',  pd => getStats(pd).passes?.key ?? 'N/A'],
                    ].map(([label, fn]) => {
                      const vals = compareList.map(fn)
                      const max  = typeof vals[0] === 'number' ? Math.max(...vals) : null
                      return (
                        <tr key={label} className="border-b border-white/5">
                          <td className="py-3 text-white/40">{label}</td>
                          {compareList.map((pd, i) => {
                            const v = fn(pd)
                            const isBest = max !== null && v === max
                            return (
                              <td key={pd.player.id} className="py-3 text-right font-display text-lg"
                                style={{ color: isBest ? colors[i] : 'rgba(255,255,255,0.4)' }}>
                                {v} {isBest && '↑'}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Radar chart */}
              <div className="glass-card p-6">
                <h3 className="font-display tracking-wider text-xl mb-5">RADAR COMPARISON</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData()}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="stat" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                    {compareList.map((pd, i) => (
                      <Radar
                        key={pd.player.id}
                        name={pd.player.name.split(' ').pop()}
                        dataKey={`p${i}`}
                        stroke={colors[i]}
                        fill={colors[i]}
                        fillOpacity={0.15}
                        strokeWidth={2}
                      />
                    ))}
                    <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
