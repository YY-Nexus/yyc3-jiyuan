"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu, User, Settings, LogOut, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface HeaderProps {
  user: {
    id: string
    name: string
    email: string
    role: string
    avatarUrl?: string
  }
  onToggleSidebar: () => void
}

export function Header({ user, onToggleSidebar }: HeaderProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // 处理注销
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "注销失败")
      }

      toast({
        title: "注销成功",
        description: "您已成功退出系统",
      })

      // 重定向到登录页
      router.push("/auth/login")
      router.refresh()
    } catch (error) {
      toast({
        title: "注销失败",
        description: (error as Error).message,
        variant: "destructive",
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center px-4">
      <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="mr-4">
        <Menu size={20} />
        <span className="sr-only">切换侧边栏</span>
      </Button>

      {/* Logo */}
      <div className="flex items-center space-x-3 mr-6">
        <Image src="/logo.png" alt="YanYu Cloud Logo" width={32} height={32} className="rounded-lg" />
        <div className="hidden sm:block">
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            言语云³
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">YanYu Cloud</p>
        </div>
      </div>

      <div className="flex-1"></div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="sr-only">通知</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl || "/logo.png"} alt={user.name} />
                <AvatarFallback>
                  <Shield className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                <p className="text-xs leading-none text-blue-600 font-medium">
                  {user.role === "admin" ? "系统管理员" : user.role === "manager" ? "业务经理" : "普通用户"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>个人资料</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>系统设置</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={isLoggingOut} onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{isLoggingOut ? "注销中..." : "安全退出"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
