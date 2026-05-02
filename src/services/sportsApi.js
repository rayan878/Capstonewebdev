import axios from 'axios'

const sportsAPI = axios.create({
  baseURL: import.meta.env.VITE_SPORTS_API_BASE || 'https://v3.football.api-sports.io',
  headers: {
    'x-apisports-key': import.meta.env.VITE_SPORTS_API_KEY,
  },
})

// ── Fixtures / Matches ──────────────────────────────────────
export const fetchLiveFixtures = () =>
  sportsAPI.get('/fixtures', { params: { live: 'all' } })

export const fetchFixturesByDate = (date) =>
  sportsAPI.get('/fixtures', { params: { date } })

export const fetchFixturesByLeague = (leagueId, season) =>
  sportsAPI.get('/fixtures', { params: { league: leagueId, season } })

export const fetchFixtureStats = (fixtureId) =>
  sportsAPI.get('/fixtures/statistics', { params: { fixture: fixtureId } })

// ── Leagues ─────────────────────────────────────────────────
export const fetchLeagues = (params = {}) =>
  sportsAPI.get('/leagues', { params })

export const fetchLeagueStandings = (leagueId, season) =>
  sportsAPI.get('/standings', { params: { league: leagueId, season } })

// ── Players ─────────────────────────────────────────────────
export const fetchTopScorers = (leagueId, season) =>
  sportsAPI.get('/players/topscorers', { params: { league: leagueId, season } })

export const fetchPlayerById = (playerId, season) =>
  sportsAPI.get('/players', { params: { id: playerId, season } })

export const searchPlayers = (name, leagueId) =>
  sportsAPI.get('/players', { params: { search: name, league: leagueId } })

export default sportsAPI
