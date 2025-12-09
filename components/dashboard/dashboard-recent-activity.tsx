"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"

export function DashboardRecentActivity() {
  const activities = [
    {
      id: "1",
      user: { name: "张三", avatar: "/abstract-geometric-shapes.png" },
      action: "创建了新的业务卡片",
      target: "科技公司销售经理",
      time: new Date(Date.now() - 5 * 60 * 1000), // 5分钟前
      type: "create",
    },
    {
      id: "2",
      user: { name: "李四", avatar: "/abstract-geometric-shapes.png" },
      action: "完成了消息任务",
      target: "春节营销活动推广",
      time: new Date(Date.now() - 15 * 60 * 1000), // 15分钟前
      type: "complete",
    },
    {
      id: "3",
      user: { name: "王五", avatar: "/diverse-group-collaborating.png" },
      action: "更新了用户权限",
      target: "部门经理角色",
      time: new Date(Date.now() - 30 * 60 * 1000), // 30分钟前
      type: "update",
    },
    {
      id: "4",
      user: { name: "赵六", avatar: "/abstract-geometric-shapes.png" },
      action: "发起了电话任务",
      target: "客户满意度调研",
      time: new Date(Date.now() - 45 * 60 * 1000), // 45分钟前
      type: "create",
    },
    {
      id: "5",
      user: { name: "钱七", avatar: "/abstract-geometric-shapes.png" },
      action: "登录了系统",
      target: "",
      time: new Date(Date.now() - 60 * 60 * 1000), // 1小时前
      type: "login",
    },
  ]

  const getActionBadge = (type: string) => {
    const typeMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; text: string }> = {
      create: { variant: "default", text: "创建" },
      update: { variant: "secondary", text: "更新" },
      complete: { variant: "outline", text: "完成" },
      login: { variant: "outline", text: "登录" },
    }
    return typeMap[type] || { variant: "outline", text: "其他" }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>最近活动</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const badge = getActionBadge(activity.type)

            return (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{activity.user.name}</span>
                    <Badge variant={badge.variant} className="text-xs">
                      {badge.text}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.action}
                    {activity.target && <span className="font-medium text-gray-900"> "{activity.target}"</span>}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(activity.time, {
                      addSuffix: true,
                      locale: zhCN,
                    })}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="pt-4 border-t mt-4">
          <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium">查看所有活动记录</button>
        </div>
      </CardContent>
    </Card>
  )
}
