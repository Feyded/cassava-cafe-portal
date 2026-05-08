import { useState } from 'react'
import { loginUser, logoutUser } from '@/services/auth.service'
import type { LoginCredentials, User } from '@/types/auth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function login(credentials: LoginCredentials) {
    setIsLoading(true)
    setError(null)
    try {
      const loggedInUser = await loginUser(credentials)
      setUser(loggedInUser)
      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
      return { success: false }
    } finally {
      setIsLoading(false)
    }
  }

  async function logout() {
    setIsLoading(true)
    try {
      await logoutUser()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  return { user, isAuthenticated: user !== null, isLoading, error, login, logout }
}
