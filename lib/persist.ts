// // Generic localStorage persistence utilities
// // lib/persist.ts
// export function getStoredValue<T>(key: string, defaultValue: T): T {
//   if (typeof window === "undefined") return defaultValue

//   try {
//     const stored = localStorage.getItem(key)
//     return stored ? JSON.parse(stored) : defaultValue
//   } catch {
//     return defaultValue
//   }
// }

// export function setStoredValue<T>(key: string, value: T): void {
//   if (typeof window === "undefined") return

//   try {
//     localStorage.setItem(key, JSON.stringify(value))
//   } catch (error) {
//     console.error(`Failed to store ${key}:`, error)
//   }
// }

// export function removeStoredValue(key: string): void {
//   if (typeof window === "undefined") return

//   try {
//     localStorage.removeItem(key)
//   } catch (error) {
//     console.error(`Failed to remove ${key}:`, error)
//   }
// }

// // Portfolio builder specific storage keys
// export const STORAGE_KEYS = {
//   PORTFOLIO_DATA: "pb.portfolioData",
//   SELECTED_TEMPLATE: "pb.selectedTemplate",
//   WIZARD_PROGRESS: "pb.wizardProgress",
//   CHAT_HISTORY: "pb.chatHistory",
//   THEME: "pb.theme",
//   LANGUAGE: "pb.language",
// } as const




// lib/persist.ts
import type { Portfolio } from "./schema";

// ---- generic helpers ----
export function getStoredValue<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setStoredValue<T>(key: string, value: T): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Failed to store ${key}:`, error)
  }
}

export function removeStoredValue(key: string): void {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Failed to remove ${key}:`, error)
  }
}

// ---- keys ----
export const STORAGE_KEYS = {
  PORTFOLIO_DATA: "pb.portfolioData",
  SELECTED_TEMPLATE: "pb.selectedTemplate",
  WIZARD_PROGRESS: "pb.wizardProgress",
  CHAT_HISTORY: "pb.chatHistory",
  THEME: "pb.theme",
  LANGUAGE: "pb.language",
} as const

// ---- portfolio-specific helpers ----

export function savePortfolioData(data: Partial<Portfolio> | Portfolio) {
  setStoredValue(STORAGE_KEYS.PORTFOLIO_DATA, data);
}
export function loadPortfolioData<T = Portfolio>(): T | null {
  return getStoredValue<T | null>(STORAGE_KEYS.PORTFOLIO_DATA, null);
}

export function saveSelectedTemplate(id: string) {
  setStoredValue(STORAGE_KEYS.SELECTED_TEMPLATE, id);
}
export function loadSelectedTemplate(): string | null {
  return getStoredValue<string | null>(STORAGE_KEYS.SELECTED_TEMPLATE, null);
}