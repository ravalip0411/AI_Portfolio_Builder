export interface User {
  id: string
  email: string
  password: string
  name: string
  avatar?: string
  createdAt: Date
}

// 5 preset demo users
export const PRESET_USERS: User[] = [
  {
    id: "1",
    email: "alexa@demo.com",
    password: "Demo@1234",
    name: "Alexa Chen",
    avatar: "/professional-woman-avatar.png",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "bruno@demo.com",
    password: "Demo@1234",
    name: "Bruno Silva",
    avatar: "/professional-man-avatar.png",
    createdAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    email: "chen@demo.com",
    password: "Demo@1234",
    name: "Chen Wei",
    avatar: "/professional-avatar.png",
    createdAt: new Date("2024-01-03"),
  },
  {
    id: "4",
    email: "diya@demo.com",
    password: "Demo@1234",
    name: "Diya Patel",
    avatar: "/professional-woman-avatar.png",
    createdAt: new Date("2024-01-04"),
  },
  {
    id: "5",
    email: "eman@demo.com",
    password: "Demo@1234",
    name: "Eman Al-Rashid",
    avatar: "/professional-avatar.png",
    createdAt: new Date("2024-01-05"),
  },
]

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// LocalStorage helpers
const STORAGE_KEYS = {
  USERS: "pb.users",
  CURRENT_USER: "pb.currentUser",
} as const

export function getStoredUsers(): User[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USERS)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function storeUsers(users: User[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  } catch (error) {
    console.error("Failed to store users:", error)
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === "undefined") return

  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
    }
  } catch (error) {
    console.error("Failed to set current user:", error)
  }
}

export function getAllUsers(): User[] {
  const storedUsers = getStoredUsers()
  return [...PRESET_USERS, ...storedUsers]
}

export async function signIn(email: string, password: string): Promise<{ user?: User; error?: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const allUsers = getAllUsers()
  const user = allUsers.find((u) => u.email === email && u.password === password)

  if (!user) {
    return { error: "Invalid email or password" }
  }

  setCurrentUser(user)
  return { user }
}

export async function signUp(userData: {
  email: string
  password: string
  name: string
}): Promise<{ user?: User; error?: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const allUsers = getAllUsers()

  // Check if user already exists
  if (allUsers.some((u) => u.email === userData.email)) {
    return { error: "User with this email already exists" }
  }

  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    email: userData.email,
    password: userData.password,
    name: userData.name,
    avatar: `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(userData.name)} avatar`,
    createdAt: new Date(),
  }

  // Store in localStorage (only custom users, not presets)
  const storedUsers = getStoredUsers()
  storeUsers([...storedUsers, newUser])

  setCurrentUser(newUser)
  return { user: newUser }
}

export function signOut(): void {
  setCurrentUser(null)
}

// Email validation helper
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password validation helper
export function isValidPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}
