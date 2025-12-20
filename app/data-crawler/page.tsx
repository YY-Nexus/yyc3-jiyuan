"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"
import { DataCrawlerForm } from "@/components/data-crawler-form"

interface DataCrawler {
  id: number
  name: string
  path: string
  status: boolean
  creator: string
  createTime: string
  applyTimeRange: string
  applyPeriod: string
}

export default function DataCrawlerManagement() {
  const [searchName, setSearchName] = useState("")
  const [serviceStatus, setServiceStatus] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null)

  // 模拟数据
  const dataCrawlers: DataCrawler[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: "数据抓取名称数据抓取名称",
    path: "https://www.baidu.com",
    status: i % 2 === 0,
    creator: "超级管理员",
    createTime: "2017-10-31 23:12:00",
    applyTimeRange: "2017-10-31 23:12:00—2018-03-31 23:12:00",
    applyPeriod: i % 3 === 0 ? "每自然月1号24点" : i % 3 === 1 ? "每日24点" : "立即生效",
  }))

  const handleDeleteClick = (id: number) => {
    setDeletingItemId(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    // 这里添加删除逻辑
    console.log(`删除项目 ID: ${deletingItemId}`)
    // 实际应用中会调用API删除数据
    setIsDeleteDialogOpen(false)
    setDeletingItemId(null)
  }

  const handleFormSubmit = (data: any) => {
    // 这里添加表单提交逻辑
    console.log("表单数据:", data)
    // 实际应用中会调用API保存数据
    setIsFormOpen(false)
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
            <span>数据管理</span>
            <span>/</span>
            <span className="text-gray-800">数据抓取管理</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">数据抓取管理</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm">
            {/* 搜索筛选区 */}
            <div className="p-4 border-b flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">数据抓取名称:</span>
                <Input
                  placeholder="请输入"
                  className="w-56"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">服务状态:</span>
                <Select value={serviceStatus} onValueChange={setServiceStatus}>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="active">启用</SelectItem>
                    <SelectItem value="inactive">停用</SelectItem>
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
                    <TableHead>数据抓取名称</TableHead>
                    <TableHead>数据路径</TableHead>
                    <TableHead>服务状态</TableHead>
                    <TableHead>创建人</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>应用时间</TableHead>
                    <TableHead>应用周期</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataCrawlers.map((crawler) => (
                    <TableRow key={crawler.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{crawler.id}</TableCell>
                      <TableCell>{crawler.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-green-600 mr-1">•</span>
                          <span>{crawler.path}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch checked={crawler.status} />
                      </TableCell>
                      <TableCell>{crawler.creator}</TableCell>
                      <TableCell>{crawler.createTime}</TableCell>
                      <TableCell>{crawler.applyTimeRange}</TableCell>
                      <TableCell>{crawler.applyPeriod}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="link"
                          className="text-blue-600 h-auto p-0"
                          onClick={() => handleDeleteClick(crawler.id)}
                        >
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
      </div>
      {/* 删除确认对话框 */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* 新建数据配置表单 */}
      <DataCrawlerForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />
    </div>
  )
}
