import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLiveMatches, selectLiveMatches, selectMatchStatus } from '../features/matches/matchesSlice'
import { loadTopScorers, selectTopScorers, selectPlayerStatus } from '../features/players/playersSlice'
import { useLiveRefresh } from '../hooks'
import { SectionHeader, StatCard, Spinner, EmptyState } from '../components/ui'
import MatchCard from '../components/ui/MatchCard'
import PlayerCard from '../components/ui/PlayerCard'
import { Activity, Users, Globe } from 'lucide-react'

export default function Home() {
  const dispatch    = useDispatch()
  const liveMatches = useSelector(selectLiveMatches)
  const topScorers  = useSelector(selectTopScorers)
  const matchStatus  = useSelector(selectMatchStatus)
  const playerStatus = useSelector(selectPlayerStatus)

  useLiveRefresh(() => dispatch(loadLiveMatches()), 30000)

  useEffect(() => {
    if (topScorers.length === 0) dispatch(loadTopScorers({ leagueId: 39, season: 2023 }))
  }, [dispatch])

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="relative pt-8 pb-4">
        <p className="text-brand-400 font-mono text-sm tracking-widest uppercase mb-2">Live · Analytics · Stats</p>
        <h1 className="font-display text-6xl md:text-8xl tracking-wider text-white leading-none">
          SPORT<br /><span className="text-brand-400">SCOPE</span>
        </h1>
        <p className="text-white/40 mt-4 max-w-md">Real-time football analytics. Track matches, compare players, and explore league standings.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Live Matches"   value={liveMatches.length} accent="text-green-400"  />
        <StatCard label="Top Scorer Goals" value={topScorers[0]?.statistics[0]?.goals?.total ?? '–'} accent="text-brand-400" />
        <StatCard label="League"         value="Premier" sub="2023/24 Season" />
        <StatCard label="Data Source"    value="Live"    sub="API-Sports v3"  />
      </div>

      {/* Live matches */}
      <section>
        <SectionHeader title="LIVE NOW" subtitle="Auto-refreshes every 30 seconds" />
        {matchStatus === 'loading' && liveMatches.length === 0 ? (
          <div className="flex justify-center py-12"><Spinner /></div>
        ) : liveMatches.length === 0 ? (
          <EmptyState icon={Activity} title="NO LIVE MATCHES" desc="Check back when matches are in progress" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveMatches.map((f, i) => (
              <MatchCard key={f.fixture?.id ?? i} fixture={f} />
            ))}
          </div>
        )}
      </section>

      {/* Top scorers */}
      <section>
        <SectionHeader title="TOP SCORERS" subtitle="Premier League 2023/24" />
        {playerStatus === 'loading' && topScorers.length === 0 ? (
          <div className="flex justify-center py-12"><Spinner /></div>
        ) : (
          <div className="space-y-3">
            {topScorers.slice(0, 5).map((p, i) => (
              <PlayerCard key={p.player?.id ?? i} playerData={p} rank={i + 1} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
