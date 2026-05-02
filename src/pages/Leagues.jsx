import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadLeagues, setFilterCountry, setLeagueSearch,
  selectLeagues, selectLeagueStatus, selectFilterCountry, selectLeagueSearch
} from '../features/leagues/leaguesSlice'
import { useDebounce } from '../hooks'
import { SectionHeader, Spinner, EmptyState } from '../components/ui'
import { Search, Globe } from 'lucide-react'

export default function Leagues() {
  const dispatch       = useDispatch()
  const leagues        = useSelector(selectLeagues)
  const status         = useSelector(selectLeagueStatus)
  const filterCountry  = useSelector(selectFilterCountry)
  const searchQuery    = useSelector(selectLeagueSearch)
  const [localSearch, setLocalSearch] = useState(searchQuery)
  const [sortBy, setSortBy]           = useState('name')

  const debounced = useDebounce(localSearch, 400)

  useEffect(() => {
    dispatch(loadLeagues())
  }, [dispatch])

  useEffect(() => {
    dispatch(setLeagueSearch(debounced))
  }, [debounced, dispatch])

  // Unique countries for filter
  const countries = [...new Set(leagues.map(l => l.country?.name).filter(Boolean))].sort()

  // Filter + search + sort
  const filtered = leagues
    .filter(l => !filterCountry || l.country?.name === filterCountry)
    .filter(l =>
      !searchQuery ||
      l.league.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.country?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name')    return a.league.name.localeCompare(b.league.name)
      if (sortBy === 'country') return (a.country?.name ?? '').localeCompare(b.country?.name ?? '')
      return 0
    })

  return (
    <div className="space-y-8">
      <SectionHeader title="LEAGUES" subtitle={`${filtered.length} competitions found`} />

      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
          <input
            type="text"
            placeholder="Search leagues or countries…"
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>
        <select
          value={filterCountry}
          onChange={e => dispatch(setFilterCountry(e.target.value))}
          className="input-field sm:w-44"
        >
          <option value="">All Countries</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="input-field sm:w-36"
        >
          <option value="name">Sort: Name</option>
          <option value="country">Sort: Country</option>
        </select>
      </div>

      {/* Results */}
      {status === 'loading' && leagues.length === 0 ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Globe} title="NO LEAGUES FOUND" desc="Try adjusting your search or filter" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <LeagueCard key={item.league.id ?? i} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

function LeagueCard({ item }) {
  const { league, country } = item
  return (
    <div className="glass-card p-4 flex items-center gap-4 hover:border-brand-500/30 transition-all duration-200 cursor-pointer group">
      <img
        src={league.logo}
        alt={league.name}
        className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
        onError={e => { e.target.style.display = 'none' }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{league.name}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          {country?.flag && (
            <img src={country.flag} alt={country.name} className="w-4 h-3 object-cover rounded-sm opacity-60" />
          )}
          <p className="text-white/30 text-xs">{country?.name ?? 'International'}</p>
        </div>
      </div>
      <span className="text-brand-400 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">→</span>
    </div>
  )
}
