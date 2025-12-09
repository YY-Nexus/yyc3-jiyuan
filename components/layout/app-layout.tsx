"use client"

import type React from "react"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import { Header } from "@/components/layout/header"

interface AppLayoutProps {
  children: React.ReactNode
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export function AppLayout({ children, user }: AppLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} md:block`}>
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header user={user} onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  )
}
