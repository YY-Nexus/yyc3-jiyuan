"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// 路由上下文类型
type ClientRouteContextType = {
  currentView: string
  params: Record<string, string>
  navigate: (view: string, newParams?: Record<string, string>) => void
}

// 创建路由上下文
const ClientRouteContext = createContext<ClientRouteContextType | undefined>(undefined)

// 客户端路由提供者属性
interface ClientRouterProviderProps {
  children: ReactNode
  defaultView: string
}

// 客户端路由提供者组件
export function ClientRouterProvider({ children, defaultView }: ClientRouterProviderProps) {
  const [currentView, setCurrentView] = useState(defaultView)
  const [params, setParams] = useState<Record<string, string>>({})

  // 从URL解析路由状态
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const view = urlParams.get("view")

      if (view) {
        setCurrentView(view)

        // 解析其他参数
        const newParams: Record<string, string> = {}
        for (const [key, value] of urlParams.entries()) {
          if (key !== "view") {
            newParams[key] = value
          }
        }
        setParams(newParams)
      }
    } catch (error) {
      console.error("Error parsing URL params:", error)
    }
  }, [])

  // 导航到新视图
  const navigate = (view: string, newParams?: Record<string, string>) => {
    setCurrentView(view)

    if (newParams) {
      setParams(newParams)
    }

    // 更新URL
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("view", view)

      // 添加其他参数
      Object.entries(newParams || params).forEach(([key, value]) => {
        if (value) {
          searchParams.set(key, value)
        }
      })

      const newURL = `${window.location.pathname}?${searchParams.toString()}`
      window.history.pushState({ path: newURL }, "", newURL)
    } catch (error) {
      console.error("Error updating URL:", error)
    }
  }

  return <ClientRouteContext.Provider value={{ currentView, params, navigate }}>{children}</ClientRouteContext.Provider>
}

// 使用客户端路由的钩子
export function useClientRoute() {
  const context = useContext(ClientRouteContext)
  if (!context) {
    throw new Error("useClientRoute must be used within a ClientRouterProvider")
  }
  return context
}
