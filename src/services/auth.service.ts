import type { LoginCredentials, User } from '@/types/auth'

const SIMULATED_DELAY_MS = 800

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const MOCK_USERS: Array<User & { password: string }> = [
  { id: '1', name: 'Alex Rivera', email: 'alex@cassavacafe.com', password: 'password123' },
]

export async function loginUser(credentials: LoginCredentials): Promise<User> {
  await delay(SIMULATED_DELAY_MS)
  const user = MOCK_USERS.find(
    (u) => u.email === credentials.email && u.password === credentials.password,
  )
  if (!user) {
    throw new Error('Invalid email or password.')
  }
  const { password: _password, ...safeUser } = user
  return safeUser
}

export async function logoutUser(): Promise<void> {
  await delay(200)
}
