"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// 模拟营销漏斗数据
const funnelData = [
  { value: 5200, name: "访问量", fill: "#4CAF50" },
  { value: 3800, name: "线索", fill: "#2196F3" },
  { value: 2200, name: "商机", fill: "#FFC107" },
  { value: 1100, name: "提案", fill: "#FF9800" },
  { value: 680, name: "成交", fill: "#F44336" },
]

const conversionRateData = [
  { stage: "访问→线索", rate: 73.1 },
  { stage: "线索→商机", rate: 57.9 },
  { stage: "商机→提案", rate: 50.0 },
  { stage: "提案→成交", rate: 61.8 },
  { stage: "整体转化", rate: 13.1 },
]

const channelData = [
  { name: "搜索引擎", value: 35, color: "#4CAF50" },
  { name: "社交媒体", value: 25, color: "#2196F3" },
  { name: "邮件营销", value: 20, color: "#FFC107" },
  { name: "内容营销", value: 15, color: "#FF9800" },
  { name: "直接访问", value: 5, color: "#F44336" },
]

const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#FF9800", "#F44336"]

export function MarketingFunnelChart() {
  const [view, setView] = useState("funnel")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>营销漏斗分析</CardTitle>
        <CardDescription>营销转化漏斗、转化率和渠道分析</CardDescription>
        <Tabs defaultValue="funnel" value={view} onValueChange={setView} className="mt-2">
          <TabsList>
            <TabsTrigger value="funnel">漏斗图</TabsTrigger>
            <TabsTrigger value="conversion">转化率</TabsTrigger>
            <TabsTrigger value="channel">渠道分析</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <TabsContent value="funnel" className="mt-0">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">营销转化漏斗</h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip
                    formatter={(value) => [`${value}`, "数量"]}
                    contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
                  />
                  <Funnel dataKey="value" data={funnelData} isAnimationActive labelLine>
                    <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                    <LabelList position="right" fill="#000" stroke="none" dataKey="value" offset={40} />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="conversion" className="mt-0">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">转化率分析</h3>
            <ChartContainer
              config={{
                rate: {
                  label: "转化率",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionRateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis unit="%" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="rate" fill="var(--color-rate)" name="转化率" unit="%" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </TabsContent>
        <TabsContent value="channel" className="mt-0">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">营销渠道分布</h3>
            <div className="flex flex-col items-center justify-center">
              <div className="h-[400px] w-full max-w-md">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {channelData.map((entry, index) => (
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
                {channelData.map((channel, index) => (
                  <div key={channel.name} className="flex items-center">
                    <div className="mr-2 h-3 w-3" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span>
                      {channel.name}: {channel.value}%
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

export default MarketingFunnelChart
