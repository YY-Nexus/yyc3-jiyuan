"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { VoiceConfigFormDialog } from "@/components/voice-config-form-dialog"

interface VoiceConfig {
  id: number
  name: string
  type: string
  content: string
  voice: string
  creator: string
  createTime: string
}

export default function VoiceConfigManagement() {
  const [searchName, setSearchName] = useState("")
  const [configType, setConfigType] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)

  // 模拟数据
  const voiceConfigs: VoiceConfig[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `语音配置${i + 1}`,
    type: i % 4 === 0 ? "问候语" : i % 4 === 1 ? "结束语" : i % 4 === 2 ? "转接提示" : "等待提示",
    content: "您好，欢迎致电客服中心，我们将为您提供专业的服务...",
    voice: i % 2 === 0 ? "女声" : "男声",
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
            <span>语音管理</span>
            <span>/</span>
            <span className="text-gray-800">语音配置</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">语音配置</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm">
            {/* 搜索筛选区 */}
            <div className="p-4 border-b flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">配置名称:</span>
                <Input
                  placeholder="请输入"
                  className="w-56"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">语音类型:</span>
                <Select value={configType} onValueChange={setConfigType}>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="greeting">问候语</SelectItem>
                    <SelectItem value="ending">结束语</SelectItem>
                    <SelectItem value="transfer">转接提示</SelectItem>
                    <SelectItem value="waiting">等待提示</SelectItem>
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
                    <TableHead>配置名称</TableHead>
                    <TableHead>语音类型</TableHead>
                    <TableHead>语音内容</TableHead>
                    <TableHead>语音声音</TableHead>
                    <TableHead>创建人</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {voiceConfigs.map((config) => (
                    <TableRow key={config.id}>
                      <TableCell>{config.id}</TableCell>
                      <TableCell>{config.name}</TableCell>
                      <TableCell>{config.type}</TableCell>
                      <TableCell className="max-w-xs truncate">{config.content}</TableCell>
                      <TableCell>{config.voice}</TableCell>
                      <TableCell>{config.creator}</TableCell>
                      <TableCell>{config.createTime}</TableCell>
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
      </div>

      {/* 新建语音配置表单 */}
      <VoiceConfigFormDialog isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />
    </div>
  )
}
