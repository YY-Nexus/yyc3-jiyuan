import { Suspense } from "react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import OperationGuideClient from "./client"

interface MessageTask {
  id: number
  name: string
  type: string
  targetCount: string
  creator: string
  createTime: string
  sendTime: string
}

export default function MessageTaskOperationGuide() {
  // 模拟数据
  const messageTasks: MessageTask[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `消息推送任务${i + 1}`,
    type: i % 3 === 0 ? "普通消息" : i % 3 === 1 ? "营销消息" : "通知消息",
    targetCount: i % 2 === 0 ? "全部用户" : `${1000 + i * 100}人`,
    creator: "超级管理员",
    createTime: "2017-10-31 23:12:00",
    sendTime: "2017-10-31 23:12:00",
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
            <span>消息管理</span>
            <span>/</span>
            <span className="text-gray-800">消息推送任务管理</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">消息推送任务管理</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm">
            {/* 搜索筛选区 */}
            <div className="p-4 border-b flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">任务名称:</span>
                <Input placeholder="请输入" className="w-56" />
              </div>
              <div className="flex-1"></div>
              <Button className="bg-blue-600 hover:bg-blue-700">查询</Button>
              <Button variant="outline">重置</Button>
            </div>

            {/* 操作按钮区 */}
            <div className="p-4 flex space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700">新建</Button>
              <Button variant="outline">操作指南</Button>
            </div>

            {/* 数据表格 */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">序号</TableHead>
                    <TableHead>任务名称</TableHead>
                    <TableHead>消息类型</TableHead>
                    <TableHead>发送对象</TableHead>
                    <TableHead>创建人</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>发送时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messageTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.id}</TableCell>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>{task.type}</TableCell>
                      <TableCell>{task.targetCount}</TableCell>
                      <TableCell>{task.creator}</TableCell>
                      <TableCell>{task.createTime}</TableCell>
                      <TableCell>{task.sendTime}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="link" className="text-blue-600 h-auto p-0 mr-2">
                          查看
                        </Button>
                        <Button variant="link" className="text-blue-600 h-auto p-0 mr-2">
                          编辑
                        </Button>
                        <Button variant="link" className="text-blue-600 h-auto p-0">
                          删除
                        </Button>
                      </TableCell>
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

        {/* 操作指南部分 */}
        <div className="container mx-auto py-6">
          <h2 className="text-2xl font-bold mb-4">操作指南</h2>
          <p className="text-gray-500 mb-6">了解如何使用消息任务功能</p>

          <Suspense fallback={<OperationGuideSkeleton />}>
            <OperationGuideClient />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function OperationGuideSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-full max-w-md" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-8 w-full max-w-md" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-8 w-full max-w-md" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}
