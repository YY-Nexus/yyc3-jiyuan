"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

interface DashboardHeaderProps {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const currentTime = new Date().toLocaleString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
  })

  const getRoleDisplayName = (role: string) => {
    const roleMap: Record<string, string> = {
      admin: "系统管理员",
      manager: "部门经理",
      user: "普通用户",
      guest: "访客",
    }
    return roleMap[role] || role
  }

  const getRoleBadgeVariant = (role: string) => {
    const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      admin: "destructive",
      manager: "default",
      user: "secondary",
      guest: "outline",
    }
    return variantMap[role] || "outline"
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/abstract-user-avatar.png" alt={user.name} />
              <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">欢迎回来，{user.name}！</h1>
              <p className="text-gray-600 mt-1">{user.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant={getRoleBadgeVariant(user.role)}>{getRoleDisplayName(user.role)}</Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-gray-600 mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">{currentTime}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">上次登录: 刚刚</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
