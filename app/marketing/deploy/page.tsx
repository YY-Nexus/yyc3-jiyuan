"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronRight } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { MarketingDeployDialog } from "@/components/marketing-deploy-dialog"

interface Deployment {
  id: number
  name: string
  template: string
  status: string
  creator: string
  createTime: string
}

export default function MarketingDeployManagement() {
  const [searchName, setSearchName] = useState("")
  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false)

  // 模拟数据
  const deployments: Deployment[] = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: `营销活动 ${i + 1}`,
    template: "小程序大能力模板",
    status: i % 2 === 0 ? "已发布" : "未发布",
    creator: "超级管理员",
    createTime: "2023-10-31 23:12:00",
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
            <span>智能营销管理</span>
            <span>/</span>
            <span className="text-gray-800">智能投放</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">智能营销管理-智能投放</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm">
            {/* 搜索筛选区 */}
            <div className="p-4 border-b flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">投放名称:</span>
                <Input
                  placeholder="请输入"
                  className="w-56"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="flex-1"></div>
              <Button className="bg-blue-600 hover:bg-blue-700">查询</Button>
              <Button variant="outline">重置</Button>
            </div>

            {/* 操作按钮区 */}
            <div className="p-4 flex space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsDeployDialogOpen(true)}>
                新建投放
              </Button>
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
                    <TableHead>投放名称</TableHead>
                    <TableHead>使用模板</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>创建人</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deployments.map((deployment) => (
                    <TableRow key={deployment.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{deployment.id}</TableCell>
                      <TableCell>{deployment.name}</TableCell>
                      <TableCell>{deployment.template}</TableCell>
                      <TableCell>{deployment.status}</TableCell>
                      <TableCell>{deployment.creator}</TableCell>
                      <TableCell>{deployment.createTime}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="link"
                          className="text-blue-600 h-auto p-0 mr-2"
                          onClick={() => setIsDeployDialogOpen(true)}
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
              <div>共 5 条</div>
              <div className="flex items-center space-x-1">
                <Button variant="outline" size="icon" className="w-8 h-8 bg-blue-600 text-white">
                  1
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 投放配置表单 */}
      <MarketingDeployDialog isOpen={isDeployDialogOpen} onClose={() => setIsDeployDialogOpen(false)} templateId={1} />
    </div>
  )
}
