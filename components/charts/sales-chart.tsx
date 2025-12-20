"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

// 模拟销售数据
const monthlyData = [
  { month: "1月", sales: 4000, target: 4500, growth: 0 },
  { month: "2月", sales: 4200, target: 4500, growth: 5 },
  { month: "3月", sales: 5800, target: 5000, growth: 38.1 },
  { month: "4月", sales: 5200, target: 5500, growth: -10.3 },
  { month: "5月", sales: 6000, target: 5500, growth: 15.4 },
  { month: "6月", sales: 7800, target: 6000, growth: 30 },
  { month: "7月", sales: 7200, target: 6500, growth: -7.7 },
  { month: "8月", sales: 8000, target: 7000, growth: 11.1 },
  { month: "9月", sales: 9500, target: 7500, growth: 18.8 },
  { month: "10月", sales: 9000, target: 8000, growth: -5.3 },
  { month: "11月", sales: 10500, target: 8500, growth: 16.7 },
  { month: "12月", sales: 12000, target: 9000, growth: 14.3 },
]

const quarterlyData = [
  { quarter: "Q1", sales: 14000, target: 14000, growth: 12.5 },
  { quarter: "Q2", sales: 19000, target: 17000, growth: 35.7 },
  { quarter: "Q3", sales: 24700, target: 20500, growth: 30 },
  { quarter: "Q4", sales: 31500, target: 25500, growth: 27.5 },
]

const yearlyData = [
  { year: "2020", sales: 65000, target: 60000, growth: 0 },
  { year: "2021", sales: 78000, target: 72000, growth: 20 },
  { year: "2022", sales: 89200, target: 85000, growth: 14.4 },
  { year: "2023", sales: 102000, target: 95000, growth: 14.3 },
]

export function SalesChart() {
  const [period, setPeriod] = useState("monthly")

  // 根据选择的时间周期获取数据
  const getData = () => {
    switch (period) {
      case "monthly":
        return monthlyData
      case "quarterly":
        return quarterlyData
      case "yearly":
        return yearlyData
      default:
        return monthlyData
    }
  }

  // 获取X轴的数据键
  const getXAxisKey = () => {
    switch (period) {
      case "monthly":
        return "month"
      case "quarterly":
        return "quarter"
      case "yearly":
        return "year"
      default:
        return "month"
    }
  }

  const data = getData()
  const xAxisKey = getXAxisKey()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>销售业绩分析</CardTitle>
        <CardDescription>销售额、目标和增长率分析</CardDescription>
        <Tabs defaultValue="monthly" value={period} onValueChange={setPeriod} className="mt-2">
          <TabsList>
            <TabsTrigger value="monthly">月度</TabsTrigger>
            <TabsTrigger value="quarterly">季度</TabsTrigger>
            <TabsTrigger value="yearly">年度</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">销售额与目标</h3>
            <ChartContainer
              config={{
                sales: {
                  label: "销售额",
                  color: "hsl(var(--chart-1))",
                },
                target: {
                  label: "目标",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xAxisKey} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} name="销售额" />
                  <Line type="monotone" dataKey="target" stroke="var(--color-target)" strokeWidth={2} name="目标" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">销售增长率</h3>
            <ChartContainer
              config={{
                growth: {
                  label: "增长率",
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
                  <Bar dataKey="growth" fill="var(--color-growth)" name="增长率" unit="%" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SalesChart
