"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AppState {
  user: User | null
  theme: "light" | "dark"
  language: "zh-CN" | "en"
  setUser: (user: User | null) => void
  setTheme: (theme: "light" | "dark") => void
  setLanguage: (language: "zh-CN" | "en") => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      theme: "light",
      language: "zh-CN",
      setUser: (user) => set({ user }),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "yanyu-cms-storage",
    },
  ),
)
