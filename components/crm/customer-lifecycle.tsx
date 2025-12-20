"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { BarChart, Users, UserPlus, ShoppingCart, Heart, AlertTriangle, Search, Filter } from "lucide-react"

export function CustomerLifecycle() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // 模拟客户数据
  const customers = [
    {
      id: 1,
      name: "张三",
      company: "北京科技有限公司",
      email: "zhangsan@example.com",
      phone: "13800138000",
      stage: "lead",
      stageLabel: "潜在客户",
      value: 0,
      lastContact: "2023-05-15",
      avatar: "/placeholder.svg?key=g57ay",
      tags: ["技术", "初创"],
      healthScore: 85,
    },
    {
      id: 2,
      name: "李四",
      company: "上海贸易有限公司",
      email: "lisi@example.com",
      phone: "13900139000",
      stage: "prospect",
      stageLabel: "意向客户",
      value: 5000,
      lastContact: "2023-05-20",
      avatar: "/placeholder.svg?key=g57ay",
      tags: ["零售", "中型"],
      healthScore: 65,
    },
    {
      id: 3,
      name: "王五",
      company: "广州服务有限公司",
      email: "wangwu@example.com",
      phone: "13700137000",
      stage: "customer",
      stageLabel: "付费客户",
      value: 25000,
      lastContact: "2023-05-22",
      avatar: "/placeholder.svg?key=g57ay",
      tags: ["服务", "大型"],
      healthScore: 92,
    },
    {
      id: 4,
      name: "赵六",
      company: "深圳科技有限公司",
      email: "zhaoliu@example.com",
      phone: "13600136000",
      stage: "loyal",
      stageLabel: "忠诚客户",
      value: 120000,
      lastContact: "2023-05-25",
      avatar: "/placeholder.svg?key=g57ay",
      tags: ["技术", "大型"],
      healthScore: 95,
    },
    {
      id: 5,
      name: "钱七",
      company: "成都餐饮有限公司",
      email: "qianqi@example.com",
      phone: "13500135000",
      stage: "at_risk",
      stageLabel: "流失风险",
      value: 15000,
      lastContact: "2023-04-10",
      avatar: "/placeholder.svg?key=g57ay",
      tags: ["餐饮", "小型"],
      healthScore: 45,
    },
  ]

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case "lead":
        return <UserPlus className="h-4 w-4 text-blue-500" />
      case "prospect":
        return <Users className="h-4 w-4 text-indigo-500" />
      case "customer":
        return <ShoppingCart className="h-4 w-4 text-green-500" />
      case "loyal":
        return <Heart className="h-4 w-4 text-purple-500" />
      case "at_risk":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getHealthColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const filteredCustomers = customers.filter((customer) => {
    if (activeTab !== "all" && customer.stage !== activeTab) return false

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        customer.name.toLowerCase().includes(query) ||
        customer.company.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query)
      )
    }

    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">客户生命周期管理</h2>
          <p className="text-muted-foreground">跟踪和管理客户从获取到维护的全生命周期</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索客户..."
              className="pl-8 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            筛选
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            添加客户
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">全部客户</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">潜在客户</CardTitle>
            <UserPlus className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter((c) => c.stage === "lead").length}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">付费客户</CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter((c) => c.stage === "customer").length}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">忠诚客户</CardTitle>
            <Heart className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter((c) => c.stage === "loyal").length}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">流失风险</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter((c) => c.stage === "at_risk").length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="lead">潜在客户</TabsTrigger>
          <TabsTrigger value="prospect">意向客户</TabsTrigger>
          <TabsTrigger value="customer">付费客户</TabsTrigger>
          <TabsTrigger value="loyal">忠诚客户</TabsTrigger>
          <TabsTrigger value="at_risk">流失风险</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground bg-muted/50">
              <div className="col-span-3">客户信息</div>
              <div className="col-span-2">阶段</div>
              <div className="col-span-2">客户价值</div>
              <div className="col-span-2">最近联系</div>
              <div className="col-span-2">健康度</div>
              <div className="col-span-1">操作</div>
            </div>
            <div className="divide-y">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="grid grid-cols-12 p-4 items-center">
                  <div className="col-span-3 flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.company}</div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      {getStageIcon(customer.stage)}
                      <span>{customer.stageLabel}</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    {customer.value > 0 ? `¥${customer.value.toLocaleString()}` : "未转化"}
                  </div>
                  <div className="col-span-2">{customer.lastContact}</div>
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      <Progress value={customer.healthScore} className={getHealthColor(customer.healthScore)} />
                      <span>{customer.healthScore}%</span>
                    </div>
                  </div>
                  <div className="col-span-1 flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <BarChart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
