"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CreditCard, MessageSquare, Phone, TrendingUp, TrendingDown } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "总用户数",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "业务卡片",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: CreditCard,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "消息任务",
      value: "856",
      change: "-2.1%",
      trend: "down",
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "电话任务",
      value: "432",
      change: "+15.3%",
      trend: "up",
      icon: Phone,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="flex items-center text-sm">
                <TrendIcon className={`h-3 w-3 mr-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`} />
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                <span className="text-gray-500 ml-1">较上月</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
