import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import matchesReducer from '../features/matches/matchesSlice'
import playersReducer from '../features/players/playersSlice'
import leaguesReducer from '../features/leagues/leaguesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    matches: matchesReducer,
    players: playersReducer,
    leagues: leaguesReducer,
  },
})
