"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Sidebar from "@/components/sidebar"
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard"
import { CustomerLifecycle } from "@/components/crm/customer-lifecycle"
import { CustomerTimeline } from "@/components/crm/customer-timeline"
import { MultiChannelCampaign } from "@/components/marketing/multi-channel-campaign"
import { ABTesting } from "@/components/marketing/ab-testing"

export default function AnalyticsDashboardPage() {
  const [activeTab, setActiveTab] = useState("analytics")

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航路径 */}
        <div className="bg-white p-4 border-b text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>YanYu丨启智丨云³ OS</span>
            <span>/</span>
            <span className="text-gray-800">数据分析中心</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">数据分析中心</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <Tabs defaultValue="analytics" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="analytics">数据分析</TabsTrigger>
              <TabsTrigger value="customers">客户管理</TabsTrigger>
              <TabsTrigger value="campaigns">营销活动</TabsTrigger>
              <TabsTrigger value="testing">A/B测试</TabsTrigger>
            </TabsList>
            <TabsContent value="analytics" className="space-y-4">
              <AnalyticsDashboard />
            </TabsContent>
            <TabsContent value="customers" className="space-y-4">
              <CustomerLifecycle />
              <CustomerTimeline customerId={1} />
            </TabsContent>
            <TabsContent value="campaigns" className="space-y-4">
              <MultiChannelCampaign />
            </TabsContent>
            <TabsContent value="testing" className="space-y-4">
              <ABTesting />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
