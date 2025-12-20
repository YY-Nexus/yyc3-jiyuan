"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/sidebar"
import { Search, Bell, Settings, User, Menu, X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

interface OptimizedLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  showBreadcrumb?: boolean
}

export default function OptimizedLayout({
  children,
  title = "YanYu Cloud³",
  description,
  showBreadcrumb = true,
}: OptimizedLayoutProps) {
  const pathname = usePathname()
  const { toast } = useToast()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState([
    { id: 1, title: "系统更新", content: "系统已更新到最新版本", time: "10分钟前", read: false },
    { id: 2, title: "任务提醒", content: "您有3个任务即将到期", time: "30分钟前", read: false },
    { id: 3, title: "消息通知", content: "客户张三发来新消息", time: "1小时前", read: true },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  // 检测设备类型
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // 生成面包屑
  const generateBreadcrumb = () => {
    if (!showBreadcrumb) return null

    const paths = pathname.split("/").filter(Boolean)
    if (paths.length === 0) return null

    return (
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">
          引擎中心
        </Link>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join("/")}`
          const isLast = index === paths.length - 1
          const formattedPath = path
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
            .replace(/([A-Z])/g, " $1")
            .trim()

          return (
            <div key={path} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="font-medium text-gray-700">{formattedPath}</span>
              ) : (
                <Link href={href} className="hover:text-blue-600">
                  {formattedPath}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // 其余代码保持不变...
  // 处理搜索
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast({
        title: "搜索功能",
        description: `正在搜索: ${searchQuery}`,
      })
    }
  }

  // 标记所有通知为已读
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "通知已读",
      description: "所有通知已标记为已读",
    })
  }

  // 未读通知数量
  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 顶部导航栏 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between px-4 h-16">
          {/* 左侧 Logo 和菜单按钮 */}
          <div className="flex items-center">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mr-2"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%A8%80%E8%AF%AD10-GWwSrOVMQVVbqaEw5qQXBdguuxtxkn.png"
                  alt="YanYu Cloud Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-blue-600">YanYu Cloud³</span>
            </Link>
          </div>

          {/* 中间搜索栏 */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="搜索..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* 右侧工具栏 */}
          <div className="flex items-center space-x-2">
            {/* 通知按钮 */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>

              {/* 通知下拉菜单 */}
              {showNotifications && (
                <Card className="absolute right-0 mt-2 w-80 overflow-hidden z-50 shadow-lg">
                  <div className="p-3 border-b flex justify-between items-center">
                    <h3 className="font-medium">通知</h3>
                    {unreadCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-7">
                        全部标为已读
                      </Button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">暂无通知</div>
                    )}
                  </div>
                  <div className="p-2 border-t text-center">
                    <Link href="/notifications" className="text-sm text-blue-600 hover:text-blue-800">
                      查看全部通知
                    </Link>
                  </div>
                </Card>
              )}
            </div>

            {/* 设置按钮 */}
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>

            {/* 用户菜单 */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-1"
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                {!isMobile && (
                  <>
                    <span className="ml-2 text-sm font-medium">管理员</span>
                    {isUserMenuOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </>
                )}
              </Button>

              {/* 用户下拉菜单 */}
              {isUserMenuOpen && (
                <Card className="absolute right-0 mt-2 w-48 overflow-hidden z-50 shadow-lg">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      个人资料
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      系统设置
                    </Link>
                    <Link
                      href="/help"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      帮助中心
                    </Link>
                    <hr className="my-1" />
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        toast({
                          title: "退出登录",
                          description: "您已成功退出系统",
                        })
                        setIsUserMenuOpen(false)
                      }}
                    >
                      退出登录
                    </button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* 移动端搜索栏 */}
        {isMobile && (
          <form onSubmit={handleSearch} className="px-4 pb-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="搜索..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        )}
      </header>

      {/* 主体内容 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 侧边栏 */}
        <div
          className={`
          ${
            isMobile
              ? `fixed inset-0 z-20 transition-transform duration-300 transform ${
                  isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : "relative"
          }
        `}
        >
          <Sidebar />

          {/* 移动端侧边栏背景遮罩 */}
          {isMobile && isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsMobileMenuOpen(false)} />
          )}
        </div>

        {/* 内容区域 */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* 页面标题 */}
          <div className="mb-6">
            {generateBreadcrumb()}
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && <p className="mt-1 text-gray-500">{description}</p>}
          </div>

          {/* 页面内容 */}
          <div className="space-y-6">{children}</div>
        </main>
      </div>

      {/* 底部版权信息 */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} YanYu Cloud³. 保留所有权利。</p>
      </footer>
    </div>
  )
}
