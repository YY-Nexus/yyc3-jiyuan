"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, AlertCircle, Plus } from "lucide-react"

export function DashboardTasks() {
  const tasks = [
    {
      id: "1",
      title: "发送营销邮件",
      status: "pending",
      priority: "high",
      dueDate: "2024-01-15",
      assignee: "张三",
    },
    {
      id: "2",
      title: "客户回访电话",
      status: "in-progress",
      priority: "medium",
      dueDate: "2024-01-16",
      assignee: "李四",
    },
    {
      id: "3",
      title: "数据报表生成",
      status: "completed",
      priority: "low",
      dueDate: "2024-01-14",
      assignee: "王五",
    },
    {
      id: "4",
      title: "系统维护检查",
      status: "pending",
      priority: "high",
      dueDate: "2024-01-17",
      assignee: "赵六",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      completed: "已完成",
      "in-progress": "进行中",
      pending: "待处理",
    }
    return statusMap[status] || status
  }

  const getPriorityVariant = (priority: string) => {
    const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      high: "destructive",
      medium: "default",
      low: "secondary",
    }
    return variantMap[priority] || "outline"
  }

  const getPriorityText = (priority: string) => {
    const priorityMap: Record<string, string> = {
      high: "高优先级",
      medium: "中优先级",
      low: "低优先级",
    }
    return priorityMap[priority] || priority
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>待办任务</CardTitle>
        <Button size="sm" className="h-8">
          <Plus className="h-4 w-4 mr-1" />
          新建任务
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(task.status)}
              <div>
                <h4 className="font-medium text-sm">{task.title}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">负责人: {task.assignee}</span>
                  <span className="text-xs text-gray-500">截止: {task.dueDate}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={getPriorityVariant(task.priority)} className="text-xs">
                {getPriorityText(task.priority)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {getStatusText(task.status)}
              </Badge>
            </div>
          </div>
        ))}

        <div className="pt-2 border-t">
          <Button variant="outline" className="w-full text-sm bg-transparent">
            查看所有任务
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
