"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart2, TrendingUp, Award, Plus, Play, Pause, Edit, Trash, ArrowRight } from "lucide-react"

export function ABTesting() {
  const [activeTab, setActiveTab] = useState("active")

  // 模拟A/B测试数据
  const tests = [
    {
      id: 1,
      name: "首页标题测试",
      status: "active",
      statusLabel: "进行中",
      startDate: "2023-06-01",
      endDate: "2023-06-15",
      target: "转化率",
      traffic: 50,
      variants: [
        {
          id: "A",
          name: "原始版本",
          description: "立即开始您的数字化转型之旅",
          visitors: 2450,
          conversions: 245,
          conversionRate: 10.0,
        },
        {
          id: "B",
          name: "测试版本",
          description: "专业数字化解决方案，为您的业务赋能",
          visitors: 2480,
          conversions: 322,
          conversionRate: 13.0,
        },
      ],
      confidence: 95,
      winner: "B",
    },
    {
      id: 2,
      name: "注册表单测试",
      status: "active",
      statusLabel: "进行中",
      startDate: "2023-06-05",
      endDate: "2023-06-20",
      target: "注册完成率",
      traffic: 30,
      variants: [
        {
          id: "A",
          name: "三步表单",
          description: "分三步完成注册流程",
          visitors: 1560,
          conversions: 468,
          conversionRate: 30.0,
        },
        {
          id: "B",
          name: "单页表单",
          description: "在单个页面完成所有注册信息",
          visitors: 1540,
          conversions: 385,
          conversionRate: 25.0,
        },
      ],
      confidence: 90,
      winner: "A",
    },
    {
      id: 3,
      name: "产品页面布局",
      status: "scheduled",
      statusLabel: "已计划",
      startDate: "2023-06-20",
      endDate: "2023-07-05",
      target: "产品页面停留时间",
      traffic: 40,
      variants: [
        {
          id: "A",
          name: "当前布局",
          description: "产品信息在上，评价在下",
          visitors: 0,
          conversions: 0,
          conversionRate: 0,
        },
        {
          id: "B",
          name: "新布局",
          description: "产品信息和评价并排显示",
          visitors: 0,
          conversions: 0,
          conversionRate: 0,
        },
      ],
      confidence: 0,
      winner: null,
    },
    {
      id: 4,
      name: "促销弹窗测试",
      status: "completed",
      statusLabel: "已完成",
      startDate: "2023-05-01",
      endDate: "2023-05-15",
      target: "点击率",
      traffic: 100,
      variants: [
        {
          id: "A",
          name: "进入弹窗",
          description: "用户进入网站立即显示",
          visitors: 5240,
          conversions: 524,
          conversionRate: 10.0,
        },
        {
          id: "B",
          name: "退出弹窗",
          description: "用户准备离开网站时显示",
          visitors: 5260,
          conversions: 842,
          conversionRate: 16.0,
        },
      ],
      confidence: 99,
      winner: "B",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "scheduled":
        return "bg-blue-100 text-blue-700"
      case "completed":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getWinnerBadge = (test: any, variantId: string) => {
    if (test.winner === variantId) {
      return (
        <Badge className="bg-green-100 text-green-700 ml-2">
          <Award className="h-3 w-3 mr-1" />
          胜出
        </Badge>
      )
    }
    return null
  }

  const getImprovement = (test: any) => {
    if (!test.winner || test.status !== "completed") return null

    const winnerVariant = test.variants.find((v: any) => v.id === test.winner)
    const otherVariant = test.variants.find((v: any) => v.id !== test.winner)

    if (!winnerVariant || !otherVariant) return null

    const improvement =
      ((winnerVariant.conversionRate - otherVariant.conversionRate) / otherVariant.conversionRate) * 100

    return (
      <Badge className="bg-green-100 text-green-700">
        <TrendingUp className="h-3 w-3 mr-1" />
        提升 {improvement.toFixed(1)}%
      </Badge>
    )
  }

  const filteredTests = tests.filter((test) => {
    if (activeTab === "all") return true
    return test.status === activeTab
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">A/B测试</h2>
          <p className="text-muted-foreground">创建和管理营销内容和策略的A/B测试</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          创建测试
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">测试总数</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tests.length}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">进行中测试</CardTitle>
            <Play className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tests.filter((t) => t.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">已完成测试</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tests.filter((t) => t.status === "completed").length}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">平均提升</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+14.5%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="active">进行中</TabsTrigger>
          <TabsTrigger value="scheduled">已计划</TabsTrigger>
          <TabsTrigger value="completed">已完成</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredTests.map((test) => (
            <Card key={test.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CardTitle>{test.name}</CardTitle>
                    <Badge variant="outline" className={getStatusColor(test.status)}>
                      {test.statusLabel}
                    </Badge>
                    {getImprovement(test)}
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      {test.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <span>目标: {test.target}</span>
                  <span className="mx-2">•</span>
                  <span>流量分配: {test.traffic}%</span>
                  <span className="mx-2">•</span>
                  <span>
                    {test.startDate} 至 {test.endDate}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {test.variants.map((variant) => (
                    <div key={variant.id} className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            变体 {variant.id}
                          </Badge>
                          <span className="font-medium">{variant.name}</span>
                          {getWinnerBadge(test, variant.id)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{variant.description}</p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">访问量</div>
                          <div className="font-medium">{variant.visitors.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">转化量</div>
                          <div className="font-medium">{variant.conversions.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">转化率</div>
                          <div className="font-medium">{variant.conversionRate.toFixed(1)}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {test.confidence > 0 && (
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">置信度:</span>
                    <Progress value={test.confidence} className="h-2 flex-1" />
                    <span className="text-sm ml-2">{test.confidence}%</span>
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    查看详细报告
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
