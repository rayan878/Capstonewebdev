import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchLeagues, fetchLeagueStandings } from '../../services/sportsApi'
import { mockLeagues, mockStandings } from '../../services/mockData'

const USE_MOCK = !import.meta.env.VITE_SPORTS_API_KEY

export const loadLeagues = createAsyncThunk(
  'leagues/loadAll',
  async (params = {}, { rejectWithValue }) => {
    if (USE_MOCK) return mockLeagues
    try {
      const res = await fetchLeagues(params)
      return res.data.response
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

export const loadStandings = createAsyncThunk(
  'leagues/loadStandings',
  async ({ leagueId = 39, season = 2023 }, { rejectWithValue }) => {
    if (USE_MOCK) return mockStandings
    try {
      const res = await fetchLeagueStandings(leagueId, season)
      return res.data.response[0]?.league?.standings[0] ?? []
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

const leaguesSlice = createSlice({
  name: 'leagues',
  initialState: {
    list:        [],
    standings:   [],
    selected:    39, // Premier League default
    filterCountry: '',
    searchQuery: '',
    status:      'idle',
    error:       null,
  },
  reducers: {
    setSelectedLeague:   (s, a) => { s.selected = a.payload },
    setFilterCountry:    (s, a) => { s.filterCountry = a.payload },
    setLeagueSearch:     (s, a) => { s.searchQuery = a.payload },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLeagues.pending,      (s) => { s.status = 'loading' })
      .addCase(loadLeagues.fulfilled,    (s, a) => { s.status = 'succeeded'; s.list = a.payload })
      .addCase(loadLeagues.rejected,     (s, a) => { s.status = 'failed'; s.error = a.payload })
      .addCase(loadStandings.fulfilled,  (s, a) => { s.standings = a.payload })
  },
})

export const { setSelectedLeague, setFilterCountry, setLeagueSearch } = leaguesSlice.actions

export const selectLeagues       = (s) => s.leagues.list
export const selectStandings     = (s) => s.leagues.standings
export const selectSelectedLeague = (s) => s.leagues.selected
export const selectLeagueStatus  = (s) => s.leagues.status
export const selectFilterCountry = (s) => s.leagues.filterCountry
export const selectLeagueSearch  = (s) => s.leagues.searchQuery

export default leaguesSlice.reducer
