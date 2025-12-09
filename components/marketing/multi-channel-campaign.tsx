"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Mail, MessageSquare, Share2, Globe, Phone, Plus, BarChart, Copy, Trash, Edit, Play } from "lucide-react"

export function MultiChannelCampaign() {
  const [activeTab, setActiveTab] = useState("all")

  // 模拟营销活动数据
  const campaigns = [
    {
      id: 1,
      name: "夏季促销活动",
      status: "active",
      statusLabel: "进行中",
      channels: ["email", "sms", "social"],
      startDate: "2023-06-01",
      endDate: "2023-06-30",
      audience: "全部客户",
      reach: 5280,
      engagement: 1245,
      conversion: 320,
      revenue: 128000,
    },
    {
      id: 2,
      name: "新产品发布",
      status: "scheduled",
      statusLabel: "已计划",
      channels: ["email", "social", "web"],
      startDate: "2023-07-15",
      endDate: "2023-07-30",
      audience: "现有客户",
      reach: 0,
      engagement: 0,
      conversion: 0,
      revenue: 0,
    },
    {
      id: 3,
      name: "客户回馈计划",
      status: "draft",
      statusLabel: "草稿",
      channels: ["email", "call"],
      startDate: "",
      endDate: "",
      audience: "忠诚客户",
      reach: 0,
      engagement: 0,
      conversion: 0,
      revenue: 0,
    },
    {
      id: 4,
      name: "年终促销活动",
      status: "completed",
      statusLabel: "已完成",
      channels: ["email", "sms", "social", "web"],
      startDate: "2023-01-01",
      endDate: "2023-01-15",
      audience: "全部客户",
      reach: 8560,
      engagement: 2340,
      conversion: 560,
      revenue: 224000,
    },
    {
      id: 5,
      name: "会员专享优惠",
      status: "active",
      statusLabel: "进行中",
      channels: ["email", "sms", "web"],
      startDate: "2023-05-20",
      endDate: "2023-06-20",
      audience: "会员客户",
      reach: 3200,
      engagement: 980,
      conversion: 210,
      revenue: 84000,
    },
  ]

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      case "social":
        return <Share2 className="h-4 w-4" />
      case "web":
        return <Globe className="h-4 w-4" />
      case "call":
        return <Phone className="h-4 w-4" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "scheduled":
        return "bg-blue-100 text-blue-700"
      case "draft":
        return "bg-gray-100 text-gray-700"
      case "completed":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getConversionRate = (campaign: any) => {
    if (campaign.reach === 0) return 0
    return ((campaign.conversion / campaign.reach) * 100).toFixed(1)
  }

  const getROI = (campaign: any) => {
    // 假设每个活动成本为10000
    const cost = 10000
    if (cost === 0) return 0
    return (((campaign.revenue - cost) / cost) * 100).toFixed(1)
  }

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (activeTab === "all") return true
    return campaign.status === activeTab
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">多渠道营销活动</h2>
          <p className="text-muted-foreground">创建和管理跨渠道的营销活动</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          创建活动
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">活动总数</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">进行中活动</CardTitle>
            <Play className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.filter((c) => c.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">总转化数</CardTitle>
            <Share2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.reduce((sum, c) => sum + c.conversion, 0)}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">总收入</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ¥{campaigns.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="active">进行中</TabsTrigger>
          <TabsTrigger value="scheduled">已计划</TabsTrigger>
          <TabsTrigger value="draft">草稿</TabsTrigger>
          <TabsTrigger value="completed">已完成</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground bg-muted/50">
              <div className="col-span-3">活动名称</div>
              <div className="col-span-2">渠道</div>
              <div className="col-span-2">时间</div>
              <div className="col-span-2">转化率</div>
              <div className="col-span-2">ROI</div>
              <div className="col-span-1">操作</div>
            </div>
            <div className="divide-y">
              {filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="grid grid-cols-12 p-4 items-center">
                  <div className="col-span-3">
                    <div className="flex flex-col">
                      <div className="font-medium">{campaign.name}</div>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className={getStatusColor(campaign.status)}>
                          {campaign.statusLabel}
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-2">{campaign.audience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex space-x-1">
                      {campaign.channels.map((channel) => (
                        <div key={channel} className="p-1 rounded-full bg-muted">
                          {getChannelIcon(channel)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    {campaign.startDate ? (
                      <div className="text-sm">
                        <div>{campaign.startDate}</div>
                        <div className="text-muted-foreground">至 {campaign.endDate}</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">未设置</span>
                    )}
                  </div>
                  <div className="col-span-2">
                    {campaign.status === "draft" || campaign.status === "scheduled" ? (
                      <span className="text-muted-foreground">未开始</span>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Progress value={Number.parseFloat(getConversionRate(campaign))} className="h-2" />
                        <span>{getConversionRate(campaign)}%</span>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2">
                    {campaign.status === "draft" || campaign.status === "scheduled" ? (
                      <span className="text-muted-foreground">未开始</span>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className={Number.parseFloat(getROI(campaign)) > 0 ? "text-green-600" : "text-red-600"}>
                          {getROI(campaign)}%
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="col-span-1 flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash className="h-4 w-4" />
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
