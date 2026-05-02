// Use this mock data during development before getting API keys

export const mockLiveFixtures = [
  {
    fixture: { id: 1, status: { short: 'LIVE', elapsed: 67 } },
    league:  { name: 'Premier League', country: 'England', logo: 'https://media.api-sports.io/football/leagues/39.png' },
    teams: {
      home: { name: 'Arsenal',       logo: 'https://media.api-sports.io/football/teams/42.png' },
      away: { name: 'Manchester City', logo: 'https://media.api-sports.io/football/teams/50.png' },
    },
    goals: { home: 2, away: 1 },
  },
  {
    fixture: { id: 2, status: { short: 'LIVE', elapsed: 34 } },
    league:  { name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png' },
    teams: {
      home: { name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png' },
      away: { name: 'Barcelona',   logo: 'https://media.api-sports.io/football/teams/529.png' },
    },
    goals: { home: 1, away: 1 },
  },
  {
    fixture: { id: 3, status: { short: 'FT', elapsed: 90 } },
    league:  { name: 'Serie A', country: 'Italy', logo: 'https://media.api-sports.io/football/leagues/135.png' },
    teams: {
      home: { name: 'Juventus',  logo: 'https://media.api-sports.io/football/teams/496.png' },
      away: { name: 'AC Milan',  logo: 'https://media.api-sports.io/football/teams/489.png' },
    },
    goals: { home: 3, away: 2 },
  },
]

export const mockTopScorers = [
  { player: { name: 'Erling Haaland',    nationality: 'Norway',    photo: 'https://media.api-sports.io/football/players/1100.png' }, statistics: [{ goals: { total: 27 }, assists: 5, games: { appearences: 30 } }] },
  { player: { name: 'Mohamed Salah',     nationality: 'Egypt',     photo: 'https://media.api-sports.io/football/players/306.png'  }, statistics: [{ goals: { total: 22 }, assists: 10, games: { appearences: 32 } }] },
  { player: { name: 'Son Heung-min',     nationality: 'S. Korea',  photo: 'https://media.api-sports.io/football/players/2291.png' }, statistics: [{ goals: { total: 17 }, assists: 8,  games: { appearences: 31 } }] },
  { player: { name: 'Bukayo Saka',       nationality: 'England',   photo: 'https://media.api-sports.io/football/players/47232.png'}, statistics: [{ goals: { total: 16 }, assists: 13, games: { appearences: 33 } }] },
  { player: { name: 'Cole Palmer',       nationality: 'England',   photo: 'https://media.api-sports.io/football/players/200456.png'},statistics: [{ goals: { total: 22 }, assists: 11, games: { appearences: 34 } }] },
]

export const mockGoalsTrend = [
  { match: 'GW28', home: 2, away: 1 },
  { match: 'GW29', home: 1, away: 0 },
  { match: 'GW30', home: 3, away: 2 },
  { match: 'GW31', home: 0, away: 1 },
  { match: 'GW32', home: 2, away: 2 },
  { match: 'GW33', home: 1, away: 3 },
  { match: 'GW34', home: 2, away: 1 },
]

export const mockStandings = [
  { rank: 1, team: { name: 'Arsenal',          logo: 'https://media.api-sports.io/football/teams/42.png'  }, points: 80, goalsDiff: 42, all: { played: 35, win: 25, draw: 5, lose: 5 } },
  { rank: 2, team: { name: 'Manchester City',   logo: 'https://media.api-sports.io/football/teams/50.png'  }, points: 76, goalsDiff: 38, all: { played: 35, win: 23, draw: 7, lose: 5 } },
  { rank: 3, team: { name: 'Liverpool',         logo: 'https://media.api-sports.io/football/teams/40.png'  }, points: 74, goalsDiff: 35, all: { played: 35, win: 22, draw: 8, lose: 5 } },
  { rank: 4, team: { name: 'Aston Villa',       logo: 'https://media.api-sports.io/football/teams/66.png'  }, points: 69, goalsDiff: 28, all: { played: 35, win: 20, draw: 9, lose: 6 } },
  { rank: 5, team: { name: 'Tottenham',         logo: 'https://media.api-sports.io/football/teams/47.png'  }, points: 60, goalsDiff: 12, all: { played: 35, win: 17, draw: 9, lose: 9 } },
  { rank: 6, team: { name: 'Chelsea',           logo: 'https://media.api-sports.io/football/teams/49.png'  }, points: 57, goalsDiff:  9, all: { played: 35, win: 16, draw: 9, lose: 10 } },
]

export const mockLeagues = [
  { league: { id: 39,  name: 'Premier League', logo: 'https://media.api-sports.io/football/leagues/39.png'  }, country: { name: 'England', flag: 'https://media.api-sports.io/flags/gb.svg' } },
  { league: { id: 140, name: 'La Liga',        logo: 'https://media.api-sports.io/football/leagues/140.png' }, country: { name: 'Spain',   flag: 'https://media.api-sports.io/flags/es.svg' } },
  { league: { id: 135, name: 'Serie A',        logo: 'https://media.api-sports.io/football/leagues/135.png' }, country: { name: 'Italy',   flag: 'https://media.api-sports.io/flags/it.svg' } },
  { league: { id: 78,  name: 'Bundesliga',     logo: 'https://media.api-sports.io/football/leagues/78.png'  }, country: { name: 'Germany', flag: 'https://media.api-sports.io/flags/de.svg' } },
  { league: { id: 61,  name: 'Ligue 1',        logo: 'https://media.api-sports.io/football/leagues/61.png'  }, country: { name: 'France',  flag: 'https://media.api-sports.io/flags/fr.svg' } },
  { league: { id: 2,   name: 'Champions League',logo:'https://media.api-sports.io/football/leagues/2.png'   }, country: { name: 'Europe',  flag: 'https://media.api-sports.io/flags/eu.svg' } },
]
