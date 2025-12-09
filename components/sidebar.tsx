"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  Send,
  Phone,
  Mic,
  Settings,
  Menu,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { RippleButton } from "@/components/ui/micro-interactions"

interface MenuItem {
  title: string
  path?: string
  icon: React.ReactNode
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    title: "仪表盘",
    path: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "用户管理",
    icon: <Users className="h-5 w-5" />,
    children: [
      {
        title: "用户列表",
        path: "/users",
        icon: <Users className="h-4 w-4" />,
      },
      {
        title: "角色管理",
        path: "/role-management",
        icon: <Users className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "业务管理",
    icon: <CreditCard className="h-5 w-5" />,
    children: [
      {
        title: "名片管理",
        path: "/business-card",
        icon: <CreditCard className="h-4 w-4" />,
      },
      {
        title: "话术模板",
        path: "/script-template",
        icon: <FileText className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "消息管理",
    icon: <Send className="h-5 w-5" />,
    children: [
      {
        title: "消息任务",
        path: "/message-task",
        icon: <Send className="h-4 w-4" />,
      },
      {
        title: "电话任务",
        path: "/phone-task",
        icon: <Phone className="h-4 w-4" />,
      },
      {
        title: "语音配置",
        path: "/voice-config",
        icon: <Mic className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "系统设置",
    icon: <Settings className="h-5 w-5" />,
    children: [
      {
        title: "菜单管理",
        path: "/menu-management",
        icon: <Menu className="h-4 w-4" />,
      },
      {
        title: "系统配置",
        path: "/system-config",
        icon: <Settings className="h-4 w-4" />,
      },
    ],
  },
]

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  // 初始化展开当前路径所在的菜单项
  useEffect(() => {
    const currentPath = pathname
    const parentMenus: string[] = []

    const findParent = (items: MenuItem[], path: string, parents: string[] = []) => {
      for (const item of items) {
        if (item.path === path) {
          return [...parents]
        }
        if (item.children) {
          const found = findParent(item.children, path, [...parents, item.title])
          if (found.length) {
            return found
          }
        }
      }
      return []
    }

    const parents = findParent(menuItems, currentPath)
    setExpandedItems(parents)
  }, [pathname])

  const toggleMenuItem = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isActive = (path: string) => pathname === path

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const isExpanded = expandedItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.title} className={cn("nav-item", depth > 0 && "ml-4")}>
        {item.path ? (
          <Link
            href={item.path}
            className={cn(
              "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
              isActive(item.path) ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            )}
          >
            <span className="mr-2">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ) : (
          <button
            onClick={() => toggleMenuItem(item.title)}
            className="w-full flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <div className="flex items-center">
              <span className="mr-2">{item.icon}</span>
              <span>{item.title}</span>
            </div>
            {hasChildren && (
              <span className="text-gray-400">
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </span>
            )}
          </button>
        )}
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">{item.children?.map((child) => renderMenuItem(child, depth + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* 移动端菜单按钮 */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <RippleButton
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white"
        >
          <Menu className="h-5 w-5" />
        </RippleButton>
      </div>

      {/* 移动端遮罩 */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/20 z-40" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* 侧边栏 */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform lg:translate-x-0 lg:static lg:z-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="YanYu Cloud Logo" width={40} height={40} />
            <div className="ml-2">
              <h1 className="text-lg font-bold text-blue-700">YanYu丨Cloud³</h1>
              <p className="text-xs text-gray-500">企业级云管理系统</p>
            </div>
          </Link>
        </div>

        {/* 菜单项 */}
        <div className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {menuItems.map((item) => renderMenuItem(item))}
        </div>
      </div>
    </>
  )
}
