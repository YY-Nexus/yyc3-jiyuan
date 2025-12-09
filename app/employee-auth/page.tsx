"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { EmployeeAuthEditDialog } from "@/components/employee-auth-edit-dialog"

interface EmployeeAuth {
  id: number
  name: string
  position: string
  certifyType: string
  creator: string
  createTime: string
}

export default function EmployeeAuthManagement() {
  const [searchName, setSearchName] = useState("")
  const [position, setPosition] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentAuthId, setCurrentAuthId] = useState<number | null>(null)

  // 模拟数据
  const employeeAuths: EmployeeAuth[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: "陈陈陈",
    position: "销售主管",
    certifyType: "高级销售经理",
    creator: "超级管理员",
    createTime: "2017-10-31 23:12:00",
  }))

  const handleEditClick = (id: number) => {
    setCurrentAuthId(id)
    setIsEditDialogOpen(true)
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
            <span>员工认证管理</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">员工认证管理</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm">
            {/* 搜索筛选区 */}
            <div className="p-4 border-b flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">员工姓名:</span>
                <Input
                  placeholder="请输入"
                  className="w-56"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">职位:</span>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="sales">销售主管</SelectItem>
                    <SelectItem value="manager">部门经理</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1"></div>
              <Button className="bg-blue-600 hover:bg-blue-700">查询</Button>
              <Button variant="outline">重置</Button>
            </div>

            {/* 操作按钮区 */}
            <div className="p-4 flex space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700">批量认证</Button>
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
                    <TableHead>员工姓名</TableHead>
                    <TableHead>职位</TableHead>
                    <TableHead>审核认证</TableHead>
                    <TableHead>创建人</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeAuths.map((auth) => (
                    <TableRow key={auth.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{auth.id}</TableCell>
                      <TableCell>{auth.name}</TableCell>
                      <TableCell>{auth.position}</TableCell>
                      <TableCell>{auth.certifyType}</TableCell>
                      <TableCell>{auth.creator}</TableCell>
                      <TableCell>{auth.createTime}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="link"
                          className="text-blue-600 h-auto p-0"
                          onClick={() => handleEditClick(auth.id)}
                        >
                          编辑
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
      </div>

      {/* 编辑认证对话框 */}
      <EmployeeAuthEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onConfirm={() => {
          // 处理编辑提交
          setIsEditDialogOpen(false)
        }}
      />
    </div>
  )
}
