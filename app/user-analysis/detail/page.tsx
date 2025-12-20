"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import Sidebar from "@/components/sidebar"

interface AnalysisData {
  id: number
  functionPage: string
  pageViews: number
  infoDisplayCount: number
  friendsDisplayCount: number
  exitPageCount: number
  avgStayTime: string
}

export default function UserAnalysisDetailPage() {
  const [dateRange, setDateRange] = useState<"today" | "7d" | "30d" | "3m" | "6m" | "1y">("today")

  // 模拟数据
  const analysisData: AnalysisData[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    functionPage: "抖音-落地页",
    pageViews: 88888,
    infoDisplayCount: 66666,
    friendsDisplayCount: 66666,
    exitPageCount: 66666,
    avgStayTime: "00:02:23",
  }))

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
            <span className="text-gray-800">用户分析</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">用户分析</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm">
            {/* 时间筛选 */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex space-x-2">
                <Button
                  variant={dateRange === "today" ? "default" : "outline"}
                  className={dateRange === "today" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  onClick={() => setDateRange("today")}
                >
                  今日
                </Button>
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
              <Button variant="outline">全部筛选 ▼</Button>
            </div>

            {/* 数据表格 */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>功能页</TableHead>
                    <TableHead>浏览量 (PV)</TableHead>
                    <TableHead>信息展示次数</TableHead>
                    <TableHead>友链展示次数</TableHead>
                    <TableHead>退出页面次数</TableHead>
                    <TableHead>平均停留时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analysisData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell>{item.functionPage}</TableCell>
                      <TableCell>{item.pageViews}</TableCell>
                      <TableCell>{item.infoDisplayCount}</TableCell>
                      <TableCell>{item.friendsDisplayCount}</TableCell>
                      <TableCell>{item.exitPageCount}</TableCell>
                      <TableCell>{item.avgStayTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* 分页控件 */}
            <div className="p-4 flex items-center justify-between text-sm">
              <div>共 215 条</div>
              <div className="flex items-center space-x-1">
                <div className="flex items-center mr-2">
                  <span>10条/页</span>
                  <ChevronLeft className="w-4 h-4" />
                </div>
                <Button variant="outline" size="icon" className="w-8 h-8 bg-blue-600 text-white">
                  1
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  2
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  3
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  4
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  5
                </Button>
                <span>...</span>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  23
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <div className="flex items-center ml-2">
                  <span>前往</span>
                  <Input className="w-12 h-8 mx-1" />
                  <span>页</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
