"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { ScriptTemplateFormDialog } from "@/components/script-template-form-dialog"
import { ScriptTemplateViewDialog } from "@/components/script-template-view-dialog"

interface ScriptTemplate {
  id: number
  name: string
  type: string
  content: string
  isRecommended: boolean
  creator: string
  createTime: string
}

export default function ScriptTemplateManagement() {
  const [searchName, setSearchName] = useState("")
  const [templateType, setTemplateType] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<ScriptTemplate | null>(null)

  // 模拟数据
  const scriptTemplates: ScriptTemplate[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `话术模板${i + 1}`,
    type: i % 2 === 0 ? "销售话术" : "客服话术",
    content:
      i % 2 === 0
        ? "您好，我是{公司名称}的销售顾问{姓名}。我们注意到您最近对我们的产品表示了兴趣，想跟您确认一下您是否有任何问题需要解答？我们目前有一个限时优惠活动，如果您现在购买，可以享受8折优惠。"
        : "您好，感谢您联系{公司名称}客服中心。我是您的客服专员{姓名}，很高兴为您服务。请问有什么可以帮助您的吗？",
    isRecommended: i < 3,
    creator: "管理员",
    createTime: "2023-10-22 14:30:00",
  }))

  const handleFormSubmit = (data: any) => {
    console.log("表单数据:", data)
    setIsFormOpen(false)
  }

  const handleView = (template: ScriptTemplate) => {
    setSelectedTemplate(template)
    setIsViewOpen(true)
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
            <span>话术管理</span>
            <span>/</span>
            <span className="text-gray-800">话术模板管理</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">话术模板管理</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm">
            {/* 搜索筛选区 */}
            <div className="p-4 border-b flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">模板名称:</span>
                <Input
                  placeholder="请输入"
                  className="w-56"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">模板类型:</span>
                <Select value={templateType} onValueChange={setTemplateType}>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="sales">销售话术</SelectItem>
                    <SelectItem value="service">客服话术</SelectItem>
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
            </div>

            {/* 数据表格 */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">序号</TableHead>
                    <TableHead>模板名称</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>创建人</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scriptTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>{template.id}</TableCell>
                      <TableCell>{template.name}</TableCell>
                      <TableCell>{template.type}</TableCell>
                      <TableCell>{template.creator}</TableCell>
                      <TableCell>{template.createTime}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="link"
                          className="text-blue-600 h-auto p-0 mr-2"
                          onClick={() => handleView(template)}
                        >
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
      </div>

      {/* 新建模板表单 */}
      <ScriptTemplateFormDialog isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />

      {/* 查看模板详情 */}
      <ScriptTemplateViewDialog isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} template={selectedTemplate} />
    </div>
  )
}
