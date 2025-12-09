"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Sidebar from "@/components/sidebar"

interface MessageTemplate {
  id: number
  name: string
  type: string
  content: string
  selected: boolean
}

export default function MessageTemplateSelect() {
  const [searchName, setSearchName] = useState("")
  const [templateType, setTemplateType] = useState("")
  const [templates, setTemplates] = useState<MessageTemplate[]>(
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `消息模板${i + 1}`,
      type: i % 3 === 0 ? "普通消息" : i % 3 === 1 ? "营销消息" : "通知消息",
      content:
        i % 3 === 0
          ? "尊敬的用户，感谢您对我们产品的支持，我们将持续为您提供优质服务。"
          : i % 3 === 1
            ? "限时优惠！我们的新产品已上线，前100名购买用户可享受8折优惠，欢迎选购！"
            : "您的订单已发货，预计3-5天送达，请保持手机畅通，感谢您的惠顾。",
      selected: false,
    })),
  )

  const handleTemplateSelect = (id: number) => {
    setTemplates(
      templates.map((template) => ({
        ...template,
        selected: template.id === id ? !template.selected : template.selected,
      })),
    )
  }

  const handleSelectAll = (checked: boolean) => {
    setTemplates(
      templates.map((template) => ({
        ...template,
        selected: checked,
      })),
    )
  }

  const selectedCount = templates.filter((template) => template.selected).length

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
            <span>消息推送任务管理</span>
            <span>/</span>
            <span className="text-gray-800">选择模板</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">消息模板管理</h1>
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
                <span className="mr-2 whitespace-nowrap">消息类型:</span>
                <Select value={templateType} onValueChange={setTemplateType}>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="normal">普通消息</SelectItem>
                    <SelectItem value="marketing">营销消息</SelectItem>
                    <SelectItem value="notification">通知消息</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1"></div>
              <Button className="bg-blue-600 hover:bg-blue-700">查询</Button>
              <Button variant="outline">重置</Button>
            </div>

            {/* 操作按钮区 */}
            <div className="p-4 flex space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700">确认选择 ({selectedCount})</Button>
              <Button variant="outline">取消</Button>
            </div>

            {/* 数据表格 */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={templates.every((t) => t.selected) && templates.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>序号</TableHead>
                    <TableHead>模板名称</TableHead>
                    <TableHead>内容</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id} className={template.selected ? "bg-blue-50" : ""}>
                      <TableCell>
                        <Checkbox
                          checked={template.selected}
                          onCheckedChange={() => handleTemplateSelect(template.id)}
                        />
                      </TableCell>
                      <TableCell>{template.id}</TableCell>
                      <TableCell>{template.name}</TableCell>
                      <TableCell className="max-w-md truncate">{template.content}</TableCell>
                      <TableCell>
                        <Button
                          variant={template.selected ? "default" : "outline"}
                          size="sm"
                          className={template.selected ? "bg-blue-600" : ""}
                          onClick={() => handleTemplateSelect(template.id)}
                        >
                          {template.selected ? (
                            <>
                              <Check className="mr-1 h-4 w-4" /> 已选择
                            </>
                          ) : (
                            "选择"
                          )}
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
    </div>
  )
}
