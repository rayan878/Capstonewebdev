import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchTopScorers, fetchPlayerById, searchPlayers } from '../../services/sportsApi'
import { mockTopScorers } from '../../services/mockData'

const USE_MOCK = !import.meta.env.VITE_SPORTS_API_KEY

export const loadTopScorers = createAsyncThunk(
  'players/loadTopScorers',
  async ({ leagueId = 39, season = 2023 }, { rejectWithValue }) => {
    if (USE_MOCK) return mockTopScorers
    try {
      const res = await fetchTopScorers(leagueId, season)
      return res.data.response
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

export const loadPlayerById = createAsyncThunk(
  'players/loadById',
  async ({ playerId, season = 2023 }, { rejectWithValue }) => {
    if (USE_MOCK) return mockTopScorers[0]
    try {
      const res = await fetchPlayerById(playerId, season)
      return res.data.response[0]
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

export const searchForPlayers = createAsyncThunk(
  'players/search',
  async ({ name, leagueId }, { rejectWithValue }) => {
    if (USE_MOCK) return mockTopScorers.filter(p =>
      p.player.name.toLowerCase().includes(name.toLowerCase())
    )
    try {
      const res = await searchPlayers(name, leagueId)
      return res.data.response
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    topScorers:  [],
    searchResults: [],
    selectedPlayer: null,
    compareList: [],
    status: 'idle',
    error: null,
    // filter / sort
    sortBy: 'goals',
    filterNationality: '',
    searchQuery: '',
  },
  reducers: {
    setSortBy:            (s, a) => { s.sortBy = a.payload },
    setFilterNationality: (s, a) => { s.filterNationality = a.payload },
    setSearchQuery:       (s, a) => { s.searchQuery = a.payload },
    addToCompare: (s, a) => {
      if (s.compareList.length < 2 && !s.compareList.find(p => p.player.id === a.payload.player.id)) {
        s.compareList.push(a.payload)
      }
    },
    removeFromCompare: (s, a) => {
      s.compareList = s.compareList.filter(p => p.player.id !== a.payload)
    },
    clearCompare: (s) => { s.compareList = [] },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTopScorers.pending,   (s) => { s.status = 'loading' })
      .addCase(loadTopScorers.fulfilled, (s, a) => { s.status = 'succeeded'; s.topScorers = a.payload })
      .addCase(loadTopScorers.rejected,  (s, a) => { s.status = 'failed'; s.error = a.payload })
      .addCase(loadPlayerById.fulfilled, (s, a) => { s.selectedPlayer = a.payload })
      .addCase(searchForPlayers.fulfilled, (s, a) => { s.searchResults = a.payload })
  },
})

export const {
  setSortBy, setFilterNationality, setSearchQuery,
  addToCompare, removeFromCompare, clearCompare,
} = playersSlice.actions

export const selectTopScorers     = (s) => s.players.topScorers
export const selectPlayerStatus   = (s) => s.players.status
export const selectSelectedPlayer = (s) => s.players.selectedPlayer
export const selectCompareList    = (s) => s.players.compareList
export const selectSortBy         = (s) => s.players.sortBy
export const selectSearchQuery    = (s) => s.players.searchQuery

export default playersSlice.reducer
