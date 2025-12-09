"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Trash2, Send, Copy, Download } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { MessageTaskFormDialog } from "@/components/message-task-form-dialog"
import { BatchOperations } from "@/components/efficiency/batch-operations"
import { SmartSearch, type FilterOption } from "@/components/efficiency/smart-search"
import { RippleButton, NotificationToast } from "@/components/ui/micro-interactions"
import { useToast } from "@/hooks/use-toast"

interface MessageTask {
  id: number
  name: string
  type: string
  targetCount: string
  creator: string
  createTime: string
  sendTime: string
}

// 过滤器选项
const filterOptions: FilterOption[] = [
  {
    id: "name",
    type: "text",
    field: "name",
    label: "任务名称",
  },
  {
    id: "type",
    type: "select",
    field: "type",
    label: "消息类型",
    options: [
      { value: "普通消息", label: "普通消息" },
      { value: "营销消息", label: "营销消息" },
      { value: "通知消息", label: "通知消息" },
    ],
  },
  {
    id: "creator",
    type: "text",
    field: "creator",
    label: "创建人",
  },
  {
    id: "createTime",
    type: "date",
    field: "createTime",
    label: "创建时间",
  },
]

export default function MessageTaskManagement() {
  const [searchName, setSearchName] = useState("")
  const [taskType, setTaskType] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"info" | "success" | "error" | "warning">("info")
  const { toast } = useToast()

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

  const handleFormSubmit = (data: any) => {
    console.log("表单数据:", data)
    setIsFormOpen(false)
    showNotification("创建成功", "success")
  }

  // 显示通知
  const showNotification = (message: string, type: "info" | "success" | "error" | "warning" = "info") => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
  }

  // 处理智能搜索
  const handleSearch = (query: string, filters: any[]) => {
    setSearchName(query)
    // 这里可以根据filters进行更复杂的过滤
    console.log("应用过滤器:", filters)
  }

  // 批量操作
  const handleBatchDelete = () => {
    if (selectedItems.length > 0) {
      toast({
        title: "批量删除成功",
        description: `已成功删除${selectedItems.length}个任务`,
      })
      setSelectedItems([])
    }
  }

  const handleBatchSend = () => {
    if (selectedItems.length > 0) {
      toast({
        title: "批量发送成功",
        description: `已成功发送${selectedItems.length}个任务`,
      })
      setSelectedItems([])
    }
  }

  const handleBatchCopy = () => {
    if (selectedItems.length > 0) {
      toast({
        title: "批量复制成功",
        description: `已成功复制${selectedItems.length}个任务`,
      })
      setSelectedItems([])
    }
  }

  const handleBatchExport = () => {
    if (selectedItems.length > 0) {
      toast({
        title: "批量导出成功",
        description: `已成功导出${selectedItems.length}个任务`,
      })
      setSelectedItems([])
    }
  }

  // 批量操作项
  const batchActions = [
    {
      label: "批量删除",
      icon: <Trash2 className="h-4 w-4 mr-2" />,
      onClick: handleBatchDelete,
    },
    {
      label: "批量发送",
      icon: <Send className="h-4 w-4 mr-2" />,
      onClick: handleBatchSend,
    },
    {
      label: "批量复制",
      icon: <Copy className="h-4 w-4 mr-2" />,
      onClick: handleBatchCopy,
    },
    {
      label: "批量导出",
      icon: <Download className="h-4 w-4 mr-2" />,
      onClick: handleBatchExport,
    },
  ]

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
            <div className="p-4 border-b">
              <SmartSearch placeholder="搜索任务..." filterOptions={filterOptions} onSearch={handleSearch} />
            </div>

            {/* 操作按钮区 */}
            <div className="p-4 flex space-x-2">
              <RippleButton
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center"
                onClick={() => setIsFormOpen(true)}
              >
                新建
              </RippleButton>
            </div>

            {/* 批量操作工具栏 */}
            {selectedItems.length > 0 && (
              <BatchOperations
                selectedCount={selectedItems.length}
                actions={batchActions}
                onClearSelection={() => setSelectedItems([])}
              />
            )}

            {/* 数据表格 */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedItems.length === messageTasks.length && messageTasks.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems(messageTasks.map((task) => task.id))
                          } else {
                            setSelectedItems([])
                          }
                        }}
                      />
                    </TableHead>
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
                    <TableRow key={task.id} className="group">
                      <TableCell>
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={selectedItems.includes(task.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems([...selectedItems, task.id])
                            } else {
                              setSelectedItems(selectedItems.filter((id) => id !== task.id))
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>{task.id}</TableCell>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>{task.type}</TableCell>
                      <TableCell>{task.targetCount}</TableCell>
                      <TableCell>{task.creator}</TableCell>
                      <TableCell>{task.createTime}</TableCell>
                      <TableCell>{task.sendTime}</TableCell>
                      <TableCell className="text-right">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="link" className="text-blue-600 h-auto p-0 mr-2">
                            查看
                          </Button>
                          <Button variant="link" className="text-blue-600 h-auto p-0 mr-2">
                            编辑
                          </Button>
                          <Button variant="link" className="text-blue-600 h-auto p-0">
                            删除
                          </Button>
                        </div>
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

      {/* 新建任务表单 */}
      <MessageTaskFormDialog isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />

      {/* 通知提示 */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <NotificationToast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
        </div>
      )}
    </div>
  )
}
