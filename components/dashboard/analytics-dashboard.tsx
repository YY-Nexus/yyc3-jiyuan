"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DateRangePicker } from "@/components/date-range-picker"
import { SalesChart } from "@/components/charts/sales-chart"
import { CustomerRetentionChart } from "@/components/charts/customer-retention-chart"
import { MarketingFunnelChart } from "@/components/charts/marketing-funnel-chart"
import { HeatMapChart } from "@/components/charts/heat-map-chart"
import { PredictiveAnalysisChart } from "@/components/charts/predictive-analysis-chart"
import { DataDrilldownPanel } from "@/components/dashboard/data-drilldown-panel"
import { Download, RefreshCw, Settings } from "lucide-react"

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "3m" | "6m" | "1y" | "custom">("30d")
  const [isLoading, setIsLoading] = useState(false)
  const [showDrilldown, setShowDrilldown] = useState(false)
  const [drilldownData, setDrilldownData] = useState<any>(null)

  // 模拟数据加载
  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  useEffect(() => {
    refreshData()
  }, [dateRange])

  const handleDrilldown = (data: any) => {
    setDrilldownData(data)
    setShowDrilldown(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">数据分析仪表盘</h2>
          <p className="text-muted-foreground">实时监控业务关键指标和趋势分析</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker />
          <Button variant="outline" size="icon" onClick={refreshData}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">总览</TabsTrigger>
          <TabsTrigger value="sales">销售分析</TabsTrigger>
          <TabsTrigger value="customers">客户分析</TabsTrigger>
          <TabsTrigger value="marketing">营销分析</TabsTrigger>
          <TabsTrigger value="predictive">预测分析</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">总销售额</CardTitle>
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
                <div className="text-2xl font-bold">¥458,623.89</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+12.5%</span> 较上期
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">新增客户</CardTitle>
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,853</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+8.2%</span> 较上期
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">转化率</CardTitle>
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
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.3%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500">-1.5%</span> 较上期
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">客户满意度</CardTitle>
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
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5.0</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+0.3</span> 较上期
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>销售趋势</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <SalesChart onDrilldown={handleDrilldown} />
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>客户留存率</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <CustomerRetentionChart onDrilldown={handleDrilldown} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>销售热力图分析</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <HeatMapChart onDrilldown={handleDrilldown} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          {/* 客户分析内容 */}
        </TabsContent>

        <TabsContent value="marketing" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>营销漏斗分析</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <MarketingFunnelChart onDrilldown={handleDrilldown} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>销售预测分析</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <PredictiveAnalysisChart onDrilldown={handleDrilldown} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showDrilldown && <DataDrilldownPanel data={drilldownData} onClose={() => setShowDrilldown(false)} />}
    </div>
  )
}
