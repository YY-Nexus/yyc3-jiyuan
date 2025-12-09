"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { MenuFormDialog } from "@/components/menu-form-dialog"

interface Menu {
  id: number
  name: string
  path: string
  parentName: string
  icon: string
  order: number
  creator: string
  createTime: string
}

export default function MenuManagement() {
  const [searchName, setSearchName] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)

  // 模拟数据
  const menus: Menu[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: i % 3 === 0 ? "数据抓取管理" : i % 3 === 1 ? "用户画像" : "营销文章管理",
    path: i % 3 === 0 ? "/data-crawler" : i % 3 === 1 ? "/user-portrait" : "/article-management",
    parentName: i % 3 === 0 ? "数据管理" : i % 3 === 1 ? "用户分析" : "管理工具",
    icon: "icon",
    order: i + 1,
    creator: "超级管理员",
    createTime: "2017-10-31 23:12:00",
  }))

  const handleFormSubmit = (data: any) => {
    console.log("表单数据:", data)
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
            <span>系统管理</span>
            <span>/</span>
            <span className="text-gray-800">菜单管理</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">菜单管理</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm">
            {/* 搜索筛选区 */}
            <div className="p-4 border-b flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">菜单名称:</span>
                <Input
                  placeholder="请输入菜单名称"
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
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsFormOpen(true)}>
                新建
              </Button>
            </div>

            {/* 数据表格 */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">序号</TableHead>
                    <TableHead>菜单名称</TableHead>
                    <TableHead>上级菜单</TableHead>
                    <TableHead>菜单路径</TableHead>
                    <TableHead>菜单图标</TableHead>
                    <TableHead>排序号</TableHead>
                    <TableHead>创建人</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menus.map((menu) => (
                    <TableRow key={menu.id}>
                      <TableCell>{menu.id}</TableCell>
                      <TableCell>{menu.name}</TableCell>
                      <TableCell>{menu.parentName}</TableCell>
                      <TableCell>{menu.path}</TableCell>
                      <TableCell>{menu.icon}</TableCell>
                      <TableCell>{menu.order}</TableCell>
                      <TableCell>{menu.creator}</TableCell>
                      <TableCell>{menu.createTime}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="link" className="text-blue-600 h-auto p-0 mr-2">
                          查看
                        </Button>
                        <Button variant="link" className="text-blue-600 h-auto p-0">
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

      {/* 添加菜单表单 */}
      <MenuFormDialog isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />
    </div>
  )
}
