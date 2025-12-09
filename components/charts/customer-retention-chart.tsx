"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// 模拟客户留存数据
const monthlyRetentionData = [
  { month: "1月", newCustomers: 120, retained: 0, churnRate: 0 },
  { month: "2月", newCustomers: 132, retained: 108, churnRate: 10 },
  { month: "3月", newCustomers: 141, retained: 227, churnRate: 5 },
  { month: "4月", newCustomers: 154, retained: 355, churnRate: 4 },
  { month: "5月", newCustomers: 162, retained: 490, churnRate: 4.5 },
  { month: "6月", newCustomers: 175, retained: 632, churnRate: 3.8 },
  { month: "7月", newCustomers: 184, retained: 780, churnRate: 5.2 },
  { month: "8月", newCustomers: 192, retained: 925, churnRate: 4.9 },
  { month: "9月", newCustomers: 201, retained: 1070, churnRate: 5.5 },
  { month: "10月", newCustomers: 210, retained: 1220, churnRate: 4.2 },
  { month: "11月", newCustomers: 218, retained: 1380, churnRate: 3.8 },
  { month: "12月", newCustomers: 225, retained: 1550, churnRate: 3.5 },
]

const quarterlyRetentionData = [
  { quarter: "Q1", newCustomers: 393, retained: 335, churnRate: 7.5 },
  { quarter: "Q2", newCustomers: 491, retained: 1477, churnRate: 4.1 },
  { quarter: "Q3", newCustomers: 577, retained: 2775, churnRate: 5.2 },
  { quarter: "Q4", newCustomers: 653, retained: 4150, churnRate: 3.8 },
]

const cohortData = [
  { name: "1个月", retention: 100 },
  { name: "2个月", retention: 86 },
  { name: "3个月", retention: 76 },
  { name: "4个月", retention: 68 },
  { name: "5个月", retention: 62 },
  { name: "6个月", retention: 58 },
  { name: "7个月", retention: 55 },
  { name: "8个月", retention: 52 },
  { name: "9个月", retention: 50 },
  { name: "10个月", retention: 48 },
  { name: "11个月", retention: 47 },
  { name: "12个月", retention: 45 },
]

const customerSegmentData = [
  { name: "核心客户", value: 45, color: "#4CAF50" },
  { name: "活跃客户", value: 30, color: "#2196F3" },
  { name: "不活跃客户", value: 15, color: "#FFC107" },
  { name: "流失风险", value: 10, color: "#F44336" },
]

const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#F44336"]

export function CustomerRetentionChart() {
  const [period, setPeriod] = useState("monthly")
  const [view, setView] = useState("overview")

  // 根据选择的时间周期获取数据
  const getRetentionData = () => {
    switch (period) {
      case "monthly":
        return monthlyRetentionData
      case "quarterly":
        return quarterlyRetentionData
      default:
        return monthlyRetentionData
    }
  }

  // 获取X轴的数据键
  const getXAxisKey = () => {
    switch (period) {
      case "monthly":
        return "month"
      case "quarterly":
        return "quarter"
      default:
        return "month"
    }
  }

  const data = getRetentionData()
  const xAxisKey = getXAxisKey()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>客户留存分析</CardTitle>
        <CardDescription>客户获取、留存和流失率分析</CardDescription>
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <Tabs defaultValue="monthly" value={period} onValueChange={setPeriod} className="mt-2">
            <TabsList>
              <TabsTrigger value="monthly">月度</TabsTrigger>
              <TabsTrigger value="quarterly">季度</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue="overview" value={view} onValueChange={setView} className="mt-2">
            <TabsList>
              <TabsTrigger value="overview">概览</TabsTrigger>
              <TabsTrigger value="cohort">同期群分析</TabsTrigger>
              <TabsTrigger value="segments">客户分层</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">客户获取与留存</h3>
              <ChartContainer
                config={{
                  newCustomers: {
                    label: "新客户",
                    color: "hsl(var(--chart-1))",
                  },
                  retained: {
                    label: "留存客户",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisKey} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="newCustomers"
                      stackId="1"
                      stroke="var(--color-newCustomers)"
                      fill="var(--color-newCustomers)"
                      name="新客户"
                    />
                    <Area
                      type="monotone"
                      dataKey="retained"
                      stackId="1"
                      stroke="var(--color-retained)"
                      fill="var(--color-retained)"
                      name="留存客户"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">客户流失率</h3>
              <ChartContainer
                config={{
                  churnRate: {
                    label: "流失率",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisKey} />
                    <YAxis unit="%" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="churnRate" fill="var(--color-churnRate)" name="流失率" unit="%" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="cohort" className="mt-0">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">客户同期群留存率</h3>
            <ChartContainer
              config={{
                retention: {
                  label: "留存率",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cohortData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit="%" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="retention" fill="var(--color-retention)" name="留存率" unit="%" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </TabsContent>
        <TabsContent value="segments" className="mt-0">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">客户分层分布</h3>
            <div className="flex flex-col items-center justify-center">
              <div className="h-[400px] w-full max-w-md">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerSegmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {customerSegmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value}%`, name]}
                      contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {customerSegmentData.map((segment, index) => (
                  <div key={segment.name} className="flex items-center">
                    <div className="mr-2 h-3 w-3" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span>
                      {segment.name}: {segment.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  )
}

export default CustomerRetentionChart
