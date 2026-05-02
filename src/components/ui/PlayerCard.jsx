import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCompare, selectCompareList } from '../../features/players/playersSlice'
import { useIsAuth } from '../../hooks'
import { GitCompare, TrendingUp } from 'lucide-react'

export default function PlayerCard({ playerData, rank }) {
  const { player, statistics } = playerData
  const stats    = statistics[0]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth   = useIsAuth()
  const compareList = useSelector(selectCompareList)
  const inCompare   = compareList.some(p => p.player.id === player.id)

  return (
    <div className="glass-card p-4 hover:border-brand-500/20 transition-all duration-200 group">
      <div className="flex items-center gap-3">
        {/* Rank */}
        <span className="font-display text-4xl text-white/10 w-8 flex-shrink-0">{rank}</span>

        {/* Avatar */}
        <img
          src={player.photo}
          alt={player.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white/10 group-hover:border-brand-500/40 transition-colors"
          onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${player.name}&background=4f46e5&color=fff` }}
        />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p
            className="text-white font-medium text-sm truncate cursor-pointer hover:text-brand-400 transition-colors"
            onClick={() => navigate(`/player/${player.id}`)}
          >
            {player.name}
          </p>
          <p className="text-white/30 text-xs">{player.nationality}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-right">
          <div>
            <p className="font-display text-xl text-brand-400">{stats.goals.total}</p>
            <p className="text-white/30 text-xs">Goals</p>
          </div>
          <div>
            <p className="font-display text-xl text-white/60">{stats.assists ?? 0}</p>
            <p className="text-white/30 text-xs">Assists</p>
          </div>
          <div>
            <p className="font-display text-xl text-white/40">{stats.games.appearences}</p>
            <p className="text-white/30 text-xs">Apps</p>
          </div>
        </div>

        {/* Compare btn */}
        {isAuth && (
          <button
            onClick={() => dispatch(addToCompare(playerData))}
            disabled={inCompare || compareList.length >= 2}
            className={`p-2 rounded-lg transition-all ${
              inCompare
                ? 'bg-brand-500/20 text-brand-400'
                : 'bg-white/5 text-white/30 hover:bg-brand-500/10 hover:text-brand-400'
            } disabled:opacity-30 disabled:cursor-not-allowed`}
            title="Add to compare"
          >
            <GitCompare size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
