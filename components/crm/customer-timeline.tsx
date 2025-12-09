"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MessageSquare, FileText, ShoppingCart, Calendar, ThumbsUp, AlertTriangle } from "lucide-react"

interface CustomerTimelineProps {
  customerId: number
}

export function CustomerTimeline({ customerId }: CustomerTimelineProps) {
  // 模拟客户互动数据
  const interactions = [
    {
      id: 1,
      type: "email",
      title: "发送了营销邮件",
      description: "发送了新产品介绍邮件",
      date: "2023-05-25 14:30",
      user: {
        name: "李明",
        avatar: "/placeholder.svg?key=g57ay",
      },
      metadata: {
        subject: "新产品发布通知",
        status: "已读",
      },
    },
    {
      id: 2,
      type: "call",
      title: "电话沟通",
      description: "讨论了产品需求和价格",
      date: "2023-05-23 10:15",
      user: {
        name: "王芳",
        avatar: "/placeholder.svg?key=g57ay",
      },
      metadata: {
        duration: "15分钟",
        outcome: "积极",
      },
    },
    {
      id: 3,
      type: "meeting",
      title: "线上会议",
      description: "演示了产品功能和使用方法",
      date: "2023-05-20 15:00",
      user: {
        name: "张伟",
        avatar: "/placeholder.svg?key=g57ay",
      },
      metadata: {
        duration: "45分钟",
        attendees: 4,
      },
    },
    {
      id: 4,
      type: "note",
      title: "添加了备注",
      description: "客户对价格有顾虑，需要提供更多折扣",
      date: "2023-05-18 09:45",
      user: {
        name: "李明",
        avatar: "/placeholder.svg?key=g57ay",
      },
      metadata: {
        category: "价格谈判",
      },
    },
    {
      id: 5,
      type: "purchase",
      title: "完成购买",
      description: "购买了企业版套餐",
      date: "2023-05-15 16:20",
      user: {
        name: "系统",
        avatar: "/placeholder.svg?key=g57ay",
      },
      metadata: {
        amount: "¥25,000",
        plan: "企业版年付",
      },
    },
    {
      id: 6,
      type: "feedback",
      title: "提交反馈",
      description: "对产品使用体验提供了反馈",
      date: "2023-05-10 11:30",
      user: {
        name: "客户",
        avatar: "/placeholder.svg?key=g57ay",
      },
      metadata: {
        rating: 4,
        category: "用户界面",
      },
    },
    {
      id: 7,
      type: "issue",
      title: "报告问题",
      description: "报告了数据导出功能异常",
      date: "2023-05-05 13:15",
      user: {
        name: "客户",
        avatar: "/placeholder.svg?key=g57ay",
      },
      metadata: {
        status: "已解决",
        priority: "中",
      },
    },
  ]

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "call":
        return <Phone className="h-4 w-4" />
      case "meeting":
        return <Calendar className="h-4 w-4" />
      case "note":
        return <FileText className="h-4 w-4" />
      case "purchase":
        return <ShoppingCart className="h-4 w-4" />
      case "feedback":
        return <ThumbsUp className="h-4 w-4" />
      case "issue":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getInteractionColor = (type: string) => {
    switch (type) {
      case "email":
        return "bg-blue-100 text-blue-700"
      case "call":
        return "bg-green-100 text-green-700"
      case "meeting":
        return "bg-purple-100 text-purple-700"
      case "note":
        return "bg-yellow-100 text-yellow-700"
      case "purchase":
        return "bg-emerald-100 text-emerald-700"
      case "feedback":
        return "bg-indigo-100 text-indigo-700"
      case "issue":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>客户互动时间线</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 border-l border-border">
          {interactions.map((interaction, index) => (
            <div key={interaction.id} className={`mb-8 ${index === interactions.length - 1 ? "" : ""}`}>
              <div className="absolute -left-2">
                <div className={`p-1 rounded-full ${getInteractionColor(interaction.type)}`}>
                  {getInteractionIcon(interaction.type)}
                </div>
              </div>
              <div className="ml-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{interaction.title}</h4>
                    <Badge variant="outline" className={getInteractionColor(interaction.type)}>
                      {interaction.type}
                    </Badge>
                  </div>
                  <time className="text-sm text-muted-foreground">{interaction.date}</time>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{interaction.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={interaction.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{interaction.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{interaction.user.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    {Object.entries(interaction.metadata).map(([key, value]) => (
                      <Badge key={key} variant="secondary" className="text-xs">
                        {key}: {value}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
