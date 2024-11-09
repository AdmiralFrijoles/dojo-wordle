import {DiscordAccessToken} from './discord/DiscordLoginTypes'
import { encrypt, decrypt } from './encryption'

const gameStateKey = 'gameState'
const archiveGameStateKey = 'archiveGameState'
const highContrastKey = 'highContrast'
const discordTokenKey = 'discordToken'

export type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveDiscordAccessTokenToLocalStorage = (
  token: DiscordAccessToken
) => {
  localStorage.setItem(discordTokenKey, encrypt(JSON.stringify(token)))
}

export const removeDiscordAccessTokenFromLocalStorage = () => {
  localStorage.removeItem(discordTokenKey)
}

export const loadDiscordAccessTokenFromLocalStorage = () => {
  let token = localStorage.getItem(discordTokenKey)

  if (token) {
    token = decrypt(token)
    return token ? (JSON.parse(token) as DiscordAccessToken) : null
  }

  return null  
}

export const saveGameStateToLocalStorage = (
  isLatestGame: boolean,
  gameState: StoredGameState
) => {
  const key = isLatestGame ? gameStateKey : archiveGameStateKey
  localStorage.setItem(key, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = (isLatestGame: boolean) => {
  const key = isLatestGame ? gameStateKey : archiveGameStateKey
  const state = localStorage.getItem(key)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

const gameStatKey = 'gameStats'

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  if (isHighContrast) {
    localStorage.setItem(highContrastKey, '1')
  } else {
    localStorage.removeItem(highContrastKey)
  }
}

export const getStoredIsHighContrastMode = () => {
  const highContrast = localStorage.getItem(highContrastKey)
  return highContrast === '1'
}
