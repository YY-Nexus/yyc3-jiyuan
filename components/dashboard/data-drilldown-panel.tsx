"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsivePie } from "@nivo/pie"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DataDrilldownPanelProps {
  data: any
  onClose: () => void
}

export function DataDrilldownPanel({ data, onClose }: DataDrilldownPanelProps) {
  const [activeTab, setActiveTab] = useState("breakdown")

  // 模拟生成详细数据
  const generateDetailData = () => {
    // 根据传入的data生成详细数据
    if (data.region && data.month) {
      return {
        barData: [
          { category: "产品A", value: Math.floor(Math.random() * 100) + 50 },
          { category: "产品B", value: Math.floor(Math.random() * 100) + 50 },
          { category: "产品C", value: Math.floor(Math.random() * 100) + 50 },
          { category: "产品D", value: Math.floor(Math.random() * 100) + 50 },
          { category: "产品E", value: Math.floor(Math.random() * 100) + 50 },
        ],
        pieData: [
          { id: "线上", value: Math.floor(Math.random() * 60) + 20 },
          { id: "线下", value: Math.floor(Math.random() * 40) + 10 },
          { id: "代理商", value: Math.floor(Math.random() * 30) + 10 },
        ],
      }
    }

    return {
      barData: [],
      pieData: [],
    }
  }

  const { barData, pieData } = generateDetailData()

  return (
    <Card className="w-full mt-4 border-blue-200 shadow-lg animate-in fade-in-0 zoom-in-95 duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <CardTitle className="text-lg font-medium">{data.title || "数据详情"}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">总值</div>
              <div className="text-2xl font-bold">{data.value?.toLocaleString() || "N/A"}</div>
            </div>
            {data.region && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">地区</div>
                <div className="text-2xl font-bold">{data.region}</div>
              </div>
            )}
            {data.month && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">时间</div>
                <div className="text-2xl font-bold">{data.month}</div>
              </div>
            )}
          </div>
        </div>

        <Tabs defaultValue="breakdown" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList>
            <TabsTrigger value="breakdown">数据明细</TabsTrigger>
            <TabsTrigger value="distribution">分布分析</TabsTrigger>
            <TabsTrigger value="trend">趋势分析</TabsTrigger>
          </TabsList>
          <TabsContent value="breakdown" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsiveBar
                data={barData}
                keys={["value"]}
                indexBy="category"
                margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={{ scheme: "blues" }}
                borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "产品",
                  legendPosition: "middle",
                  legendOffset: 32,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "销售额",
                  legendPosition: "middle",
                  legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
              />
            </div>
          </TabsContent>
          <TabsContent value="distribution" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsivePie
                data={pieData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: "blues" }}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextColor="#333333"
                radialLabelsLinkColor={{ from: "color" }}
                sliceLabelsSkipAngle={10}
                sliceLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                  {
                    anchor: "bottom",
                    direction: "row",
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: "#999",
                    symbolSize: 18,
                    symbolShape: "circle",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemTextColor: "#000",
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
          </TabsContent>
          <TabsContent value="trend" className="space-y-4">
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-muted-foreground">趋势数据正在加载中...</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
