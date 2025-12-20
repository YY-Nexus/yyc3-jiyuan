"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Sidebar from "@/components/sidebar"
import { OccupationChart } from "@/components/charts/occupation-chart"
import { AgeDistributionChart } from "@/components/charts/age-distribution-chart"
import { RegionDistributionChart } from "@/components/charts/region-distribution-chart"
import { GenderRatioChart } from "@/components/charts/gender-ratio-chart"
import { InterestDistributionChart } from "@/components/charts/interest-distribution-chart"
import { DateRangePicker } from "@/components/date-range-picker"

export default function UserPortraitPage() {
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "3m" | "6m" | "1y">("7d")

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航路径 */}
        <div className="bg-white p-4 border-b text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>用户分析</span>
            <span>/</span>
            <span className="text-gray-800">用户画像</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">用户画像</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm p-4">
            {/* 时间筛选 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-2">
                <Button
                  variant={dateRange === "7d" ? "default" : "outline"}
                  className={dateRange === "7d" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  onClick={() => setDateRange("7d")}
                >
                  最近7天
                </Button>
                <Button
                  variant={dateRange === "30d" ? "default" : "outline"}
                  className={dateRange === "30d" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  onClick={() => setDateRange("30d")}
                >
                  最近30天
                </Button>
                <Button
                  variant={dateRange === "3m" ? "default" : "outline"}
                  className={dateRange === "3m" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  onClick={() => setDateRange("3m")}
                >
                  最近3个月
                </Button>
                <Button
                  variant={dateRange === "6m" ? "default" : "outline"}
                  className={dateRange === "6m" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  onClick={() => setDateRange("6m")}
                >
                  最近半年
                </Button>
                <Button
                  variant={dateRange === "1y" ? "default" : "outline"}
                  className={dateRange === "1y" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  onClick={() => setDateRange("1y")}
                >
                  最近1年
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <span>开始时间</span>
                <DateRangePicker />
                <span>结束时间</span>
                <DateRangePicker />
                <Button variant="outline" className="ml-2">
                  全部筛选 ▼
                </Button>
              </div>
            </div>

            {/* 图表区域 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 所属职业 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">所属职业</CardTitle>
                </CardHeader>
                <CardContent>
                  <OccupationChart />
                </CardContent>
              </Card>

              {/* 年龄分布 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">年龄分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <AgeDistributionChart />
                </CardContent>
              </Card>

              {/* 地域分布 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">地域分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <RegionDistributionChart />
                </CardContent>
              </Card>

              {/* 性别比例 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">性别比例</CardTitle>
                </CardHeader>
                <CardContent>
                  <GenderRatioChart />
                </CardContent>
              </Card>

              {/* 兴趣分布 */}
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">兴趣分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <InterestDistributionChart />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
