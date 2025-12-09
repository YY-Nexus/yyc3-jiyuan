"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// 客户端路由上下文
type ClientRouteContextType = {
  currentView: string
  params: Record<string, string>
  navigate: (view: string, params?: Record<string, string>) => void
}

const ClientRouteContext = createContext<ClientRouteContextType | undefined>(undefined)

// 客户端路由提供者属性
type ClientRouteProviderProps = {
  children: ReactNode
  defaultView: string
}

// 客户端路由提供者组件
export function ClientRouteProvider({ children, defaultView }: ClientRouteProviderProps) {
  // 初始化状态
  const [currentView, setCurrentView] = useState(defaultView)
  const [params, setParams] = useState<Record<string, string>>({})

  // 从URL初始化状态
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const viewParam = urlParams.get("view")

        if (viewParam) {
          setCurrentView(viewParam)

          // 收集其他参数
          const newParams: Record<string, string> = {}
          urlParams.forEach((value, key) => {
            if (key !== "view") {
              newParams[key] = value
            }
          })

          setParams(newParams)
        }
      } catch (error) {
        console.error("Error parsing URL params:", error)
      }
    }
  }, [])

  // 导航函数
  const navigate = (view: string, newParams?: Record<string, string>) => {
    setCurrentView(view)

    if (newParams) {
      setParams(newParams)
    }

    // 更新URL
    if (typeof window !== "undefined") {
      try {
        const urlParams = new URLSearchParams()
        urlParams.set("view", view)

        // 添加其他参数
        const paramsToUse = newParams || params
        Object.entries(paramsToUse).forEach(([key, value]) => {
          urlParams.set(key, value)
        })

        const newUrl = `${window.location.pathname}?${urlParams.toString()}`
        window.history.pushState({ view, params: paramsToUse }, "", newUrl)
      } catch (error) {
        console.error("Error updating URL:", error)
      }
    }
  }

  return <ClientRouteContext.Provider value={{ currentView, params, navigate }}>{children}</ClientRouteContext.Provider>
}

// 客户端路由钩子
export function useClientRoute() {
  const context = useContext(ClientRouteContext)

  if (!context) {
    throw new Error("useClientRoute must be used within a ClientRouteProvider")
  }

  return context
}

// 动态视图容器属性
type DynamicViewContainerProps = {
  defaultView: string
  views: Record<string, ReactNode>
}

// 动态视图容器组件
export function DynamicViewContainer({ defaultView, views }: DynamicViewContainerProps) {
  return (
    <ClientRouteProvider defaultView={defaultView}>
      <ViewRenderer views={views} />
    </ClientRouteProvider>
  )
}

// 视图渲染器组件
function ViewRenderer({ views }: { views: Record<string, ReactNode> }) {
  const { currentView } = useClientRoute()

  // 渲染当前视图或404
  const viewToRender = views[currentView] || views.notFound || <div>视图不存在</div>

  return <>{viewToRender}</>
}
