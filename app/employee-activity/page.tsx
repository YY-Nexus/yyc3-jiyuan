"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { ActivityFormDialog } from "@/components/activity-form-dialog"
import { EmployeeRankingDialog } from "@/components/employee-ranking-dialog"
import { StopActivityDialog } from "@/components/stop-activity-dialog"

interface Activity {
  id: number
  name: string
  status: string
  startTime: string
  endTime: string
  creator: string
  createTime: string
}

export default function EmployeeActivityManagement() {
  const [searchName, setSearchName] = useState("")
  const [activityStatus, setActivityStatus] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isRankingOpen, setIsRankingOpen] = useState(false)
  const [isStopDialogOpen, setIsStopDialogOpen] = useState(false)
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null)

  // 模拟数据
  const activities: Activity[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: "双十一促销抽奖/惠约活动",
    status: i % 3 === 0 ? "已结束" : i % 3 === 1 ? "进行中" : "暂停中",
    startTime: "2017-10-31 23:12:00",
    endTime: "2018-03-31 23:12:00",
    creator: "超级管理员",
    createTime: "2017-01-10 12:00:32",
  }))

  const handleFormSubmit = (data: any) => {
    console.log("表单数据:", data)
    setIsFormOpen(false)
  }

  const handleStopActivity = () => {
    console.log("停止活动:", currentActivity?.id)
    setIsStopDialogOpen(false)
    setCurrentActivity(null)
  }

  const openRankingDialog = (activity: Activity) => {
    setCurrentActivity(activity)
    setIsRankingOpen(true)
  }

  const openStopDialog = (activity: Activity) => {
    setCurrentActivity(activity)
    setIsStopDialogOpen(true)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航路径 */}
        <div className="bg-white p-4 border-b text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>员工活动</span>
            <span>/</span>
            <span className="text-gray-800">活动管理</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">活动管理</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm">
            {/* 搜索筛选区 */}
            <div className="p-4 border-b flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">活动名称:</span>
                <Input
                  placeholder="请输入"
                  className="w-56"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">活动状态:</span>
                <Select value={activityStatus} onValueChange={setActivityStatus}>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="active">进行中</SelectItem>
                    <SelectItem value="paused">暂停中</SelectItem>
                    <SelectItem value="ended">已结束</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1"></div>
              <Button className="bg-blue-600 hover:bg-blue-700">查询</Button>
              <Button variant="outline">重置</Button>
            </div>

            {/* 操作按钮区 */}
            <div className="p-4 flex space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsFormOpen(true)}>
                新建
              </Button>
              <Button variant="outline">批量暂停</Button>
              <Button variant="outline">批量停止</Button>
              <Button variant="outline">批量开启</Button>
            </div>

            {/* 数据表格 */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead className="w-16">序号</TableHead>
                    <TableHead>活动名称</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>开始时间</TableHead>
                    <TableHead>结束时间</TableHead>
                    <TableHead>创建人</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{activity.id}</TableCell>
                      <TableCell>{activity.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span
                            className={`w-2 h-2 rounded-full mr-1 ${
                              activity.status === "进行中"
                                ? "bg-green-500"
                                : activity.status === "暂停中"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          ></span>
                          <span>{activity.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>{activity.startTime}</TableCell>
                      <TableCell>{activity.endTime}</TableCell>
                      <TableCell>{activity.creator}</TableCell>
                      <TableCell>{activity.createTime}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="link" className="text-blue-600 h-auto p-0 mr-2">
                          查看
                        </Button>
                        <Button variant="link" className="text-blue-600 h-auto p-0 mr-2">
                          删除
                        </Button>
                        <Button
                          variant="link"
                          className="text-blue-600 h-auto p-0 mr-2"
                          onClick={() => openRankingDialog(activity)}
                        >
                          员工排行
                        </Button>
                        {activity.status === "进行中" && (
                          <Button
                            variant="link"
                            className="text-blue-600 h-auto p-0"
                            onClick={() => openStopDialog(activity)}
                          >
                            停止
                          </Button>
                        )}
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
      </div>

      {/* 新建活动表单 */}
      <ActivityFormDialog isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />

      {/* 员工排行榜对话框 */}
      <EmployeeRankingDialog
        isOpen={isRankingOpen}
        onClose={() => setIsRankingOpen(false)}
        activityName={currentActivity?.name || ""}
      />

      {/* 停止活动确认对话框 */}
      <StopActivityDialog
        isOpen={isStopDialogOpen}
        onClose={() => setIsStopDialogOpen(false)}
        onConfirm={handleStopActivity}
      />
    </div>
  )
}
