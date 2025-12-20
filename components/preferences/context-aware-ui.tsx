"use client"

import type React from "react"
import { useState, useEffect, createContext, useContext } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// 用户角色类型
type UserRole = "admin" | "manager" | "employee" | "guest"

// 上下文类型
interface ContextAwareUIContext {
  userRole: UserRole
  setUserRole: (role: UserRole) => void
  currentSection: string
  recentlyVisited: string[]
  frequentlyUsed: { [key: string]: number }
  addVisit: (path: string) => void
}

// 创建上下文
const ContextAwareUIContext = createContext<ContextAwareUIContext | undefined>(undefined)

// 上下文提供者组件
export function ContextAwareUIProvider({
  children,
  initialRole = "employee",
}: {
  children: React.ReactNode
  initialRole?: UserRole
}) {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<UserRole>(initialRole)
  const [currentSection, setCurrentSection] = useState("")
  const [recentlyVisited, setRecentlyVisited] = useState<string[]>([])
  const [frequentlyUsed, setFrequentlyUsed] = useState<{ [key: string]: number }>({})
  const [mounted, setMounted] = useState(false)

  // 加载保存的数据
  useEffect(() => {
    setMounted(true)
    const savedRole = localStorage.getItem("userRole")
    const savedRecent = localStorage.getItem("recentlyVisited")
    const savedFrequent = localStorage.getItem("frequentlyUsed")

    if (savedRole) {
      setUserRole(savedRole as UserRole)
    }

    if (savedRecent) {
      setRecentlyVisited(JSON.parse(savedRecent))
    }

    if (savedFrequent) {
      setFrequentlyUsed(JSON.parse(savedFrequent))
    }
  }, [])

  // 更新当前部分
  useEffect(() => {
    if (pathname) {
      const section = pathname.split("/")[1] || "home"
      setCurrentSection(section)
      addVisit(section)
    }
  }, [pathname])

  // 添加访问记录
  const addVisit = (path: string) => {
    // 更新最近访问
    setRecentlyVisited((prev) => {
      const newRecent = [path, ...prev.filter((p) => p !== path)].slice(0, 10)
      localStorage.setItem("recentlyVisited", JSON.stringify(newRecent))
      return newRecent
    })

    // 更新常用功能
    setFrequentlyUsed((prev) => {
      const newFrequent = { ...prev, [path]: (prev[path] || 0) + 1 }
      localStorage.setItem("frequentlyUsed", JSON.stringify(newFrequent))
      return newFrequent
    })
  }

  // 保存角色变更
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("userRole", userRole)
    }
  }, [userRole, mounted])

  const contextValue = {
    userRole,
    setUserRole,
    currentSection,
    recentlyVisited,
    frequentlyUsed,
    addVisit,
  }

  return <ContextAwareUIContext.Provider value={contextValue}>{children}</ContextAwareUIContext.Provider>
}

// 使用上下文的钩子
export function useContextAwareUI() {
  const context = useContext(ContextAwareUIContext)
  if (context === undefined) {
    throw new Error("useContextAwareUI must be used within a ContextAwareUIProvider")
  }
  return context
}

// 角色感知组件
export function RoleAwareComponent({
  children,
  allowedRoles,
  fallback,
}: {
  children: React.ReactNode
  allowedRoles: UserRole[]
  fallback?: React.ReactNode
}) {
  const { userRole } = useContextAwareUI()

  if (allowedRoles.includes(userRole)) {
    return <>{children}</>
  }

  return fallback ? <>{fallback}</> : null
}

// 上下文感知导航
export function ContextAwareNavigation({ className }: { className?: string }) {
  const { currentSection, recentlyVisited, frequentlyUsed } = useContextAwareUI()

  // 获取常用功能（按使用频率排序）
  const getFrequentItems = () => {
    return Object.entries(frequentlyUsed)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([path]) => path)
  }

  // 格式化路径名称
  const formatPathName = (path: string) => {
    if (path === "home" || path === "") return "首页"
    return path
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-sm font-medium mb-2">当前位置</h3>
        <div className="bg-primary/10 text-primary font-medium px-3 py-2 rounded-md">
          {formatPathName(currentSection)}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">最近访问</h3>
        <div className="space-y-1">
          {recentlyVisited.slice(0, 5).map((path) => (
            <a
              key={path}
              href={`/${path === "home" ? "" : path}`}
              className="block px-3 py-2 hover:bg-secondary rounded-md text-sm"
            >
              {formatPathName(path)}
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">常用功能</h3>
        <div className="space-y-1">
          {getFrequentItems().map((path) => (
            <a
              key={path}
              href={`/${path === "home" ? "" : path}`}
              className="block px-3 py-2 hover:bg-secondary rounded-md text-sm"
            >
              {formatPathName(path)}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// 上下文感知操作按钮
export function ContextAwareActions({
  section,
  className,
}: {
  section: string
  className?: string
}) {
  const { userRole } = useContextAwareUI()

  // 根据部分和角色获取操作
  const getActions = () => {
    const commonActions = [{ label: "查看", href: `/${section}` }]

    if (userRole === "admin" || userRole === "manager") {
      return [
        ...commonActions,
        { label: "编辑", href: `/${section}/edit` },
        { label: "删除", href: `/${section}/delete` },
      ]
    }

    if (userRole === "employee") {
      return [...commonActions, { label: "编辑", href: `/${section}/edit` }]
    }

    return commonActions
  }

  return (
    <div className={cn("flex space-x-2", className)}>
      {getActions().map((action) => (
        <a
          key={action.label}
          href={action.href}
          className="px-3 py-1 text-sm bg-secondary hover:bg-secondary/80 rounded-md"
        >
          {action.label}
        </a>
      ))}
    </div>
  )
}
