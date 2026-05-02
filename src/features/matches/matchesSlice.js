import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchLiveFixtures, fetchFixturesByDate } from '../../services/sportsApi'
import { mockLiveFixtures } from '../../services/mockData'

const USE_MOCK = !import.meta.env.VITE_SPORTS_API_KEY

// ── Thunks ────────────────────────────────────────────────────
export const loadLiveMatches = createAsyncThunk(
  'matches/loadLive',
  async (_, { rejectWithValue }) => {
    if (USE_MOCK) return mockLiveFixtures
    try {
      const res = await fetchLiveFixtures()
      return res.data.response
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

export const loadMatchesByDate = createAsyncThunk(
  'matches/loadByDate',
  async (date, { rejectWithValue }) => {
    if (USE_MOCK) return mockLiveFixtures
    try {
      const res = await fetchFixturesByDate(date)
      return res.data.response
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

// ── Slice ─────────────────────────────────────────────────────
const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    live:      [],
    byDate:    [],
    status:    'idle',
    error:     null,
    lastFetch: null,
  },
  reducers: {
    clearError: (state) => { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      // live
      .addCase(loadLiveMatches.pending,   (s) => { s.status = 'loading' })
      .addCase(loadLiveMatches.fulfilled, (s, a) => { s.status = 'succeeded'; s.live = a.payload; s.lastFetch = Date.now() })
      .addCase(loadLiveMatches.rejected,  (s, a) => { s.status = 'failed'; s.error = a.payload })
      // by date
      .addCase(loadMatchesByDate.pending,   (s) => { s.status = 'loading' })
      .addCase(loadMatchesByDate.fulfilled, (s, a) => { s.status = 'succeeded'; s.byDate = a.payload })
      .addCase(loadMatchesByDate.rejected,  (s, a) => { s.status = 'failed'; s.error = a.payload })
  },
})

export const { clearError } = matchesSlice.actions

export const selectLiveMatches = (s) => s.matches.live
export const selectMatchStatus  = (s) => s.matches.status
export const selectLastFetch    = (s) => s.matches.lastFetch

export default matchesSlice.reducer
