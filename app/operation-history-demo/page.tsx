"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Plus, Trash, FileDown, FileUp, Search, SortAsc } from "lucide-react"
import { HistoryProvider, useHistory, type Operation } from "@/components/efficiency/operation-history"
import { OperationHistoryPanel } from "@/components/efficiency/operation-history-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageLayout } from "@/components/page-layout"

// 模拟数据类型
interface Task {
  id: string
  title: string
  status: "pending" | "completed" | "canceled"
  createdAt: Date
}

// 演示组件包装器
function OperationHistoryDemo() {
  return (
    <HistoryProvider>
      <OperationHistoryDemoContent />
    </HistoryProvider>
  )
}

// 演示组件内容
function OperationHistoryDemoContent() {
  const { addOperation } = useHistory()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "完成产品设计",
      status: "completed",
      createdAt: new Date(2023, 4, 15),
    },
    {
      id: "2",
      title: "开发用户界面",
      status: "pending",
      createdAt: new Date(2023, 4, 20),
    },
    {
      id: "3",
      title: "测试应用功能",
      status: "pending",
      createdAt: new Date(2023, 4, 25),
    },
  ])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // 添加任务
  const addTask = () => {
    if (!newTaskTitle.trim()) return

    const newTask: Task = {
      id: uuidv4(),
      title: newTaskTitle,
      status: "pending",
      createdAt: new Date(),
    }

    const oldTasks = [...tasks]
    const newTasks = [...tasks, newTask]

    // 创建操作记录
    const operation: Operation = {
      id: uuidv4(),
      type: "create",
      description: `创建任务 "${newTaskTitle}"`,
      timestamp: Date.now(),
      data: { task: newTask },
      undoAction: () => setTasks(oldTasks),
      redoAction: () => setTasks(newTasks),
    }

    // 执行操作
    setTasks(newTasks)
    setNewTaskTitle("")

    // 添加到历史记录
    addOperation(operation)
  }

  // 删除任务
  const deleteTask = (taskId: string) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId)
    if (taskIndex === -1) return

    const oldTasks = [...tasks]
    const taskToDelete = tasks[taskIndex]
    const newTasks = tasks.filter((task) => task.id !== taskId)

    // 创建操作记录
    const operation: Operation = {
      id: uuidv4(),
      type: "delete",
      description: `删除任务 "${taskToDelete.title}"`,
      timestamp: Date.now(),
      data: { task: taskToDelete, index: taskIndex },
      undoAction: () => setTasks(oldTasks),
      redoAction: () => setTasks(newTasks),
    }

    // 执行操作
    setTasks(newTasks)

    // 添加到历史记录
    addOperation(operation)
  }

  // 更新任务状态
  const updateTaskStatus = (taskId: string, newStatus: "pending" | "completed" | "canceled") => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId)
    if (taskIndex === -1) return

    const oldTasks = [...tasks]
    const updatedTasks = [...tasks]
    const oldStatus = updatedTasks[taskIndex].status
    updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], status: newStatus }

    // 创建操作记录
    const operation: Operation = {
      id: uuidv4(),
      type: "update",
      description: `将任务 "${updatedTasks[taskIndex].title}" 状态从 ${getStatusText(oldStatus)} 更改为 ${getStatusText(newStatus)}`,
      timestamp: Date.now(),
      data: { taskId, oldStatus, newStatus },
      undoAction: () => setTasks(oldTasks),
      redoAction: () => setTasks(updatedTasks),
    }

    // 执行操作
    setTasks(updatedTasks)

    // 添加到历史记录
    addOperation(operation)
  }

  // 搜索任务
  const handleSearch = () => {
    // 创建操作记录
    const operation: Operation = {
      id: uuidv4(),
      type: "search",
      description: `搜索任务 "${searchTerm}"`,
      timestamp: Date.now(),
      data: { searchTerm },
      undoAction: () => {}, // 搜索不需要撤销
      redoAction: () => {}, // 搜索不需要重做
    }

    // 添加到历史记录
    addOperation(operation)
  }

  // 排序任务
  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc"

    // 创建操作记录
    const operation: Operation = {
      id: uuidv4(),
      type: "sort",
      description: `将任务排序从 ${sortOrder === "asc" ? "升序" : "降序"} 更改为 ${newOrder === "asc" ? "升序" : "降序"}`,
      timestamp: Date.now(),
      data: { oldOrder: sortOrder, newOrder },
      undoAction: () => setSortOrder(sortOrder),
      redoAction: () => setSortOrder(newOrder),
    }

    // 执行操作
    setSortOrder(newOrder)

    // 添加到历史记录
    addOperation(operation)
  }

  // 导出任务
  const handleExport = () => {
    // 创建操作记录
    const operation: Operation = {
      id: uuidv4(),
      type: "export",
      description: "导出任务列表",
      timestamp: Date.now(),
      data: { tasks },
      undoAction: () => {}, // 导出不需要撤销
      redoAction: () => {}, // 导出不需要重做
    }

    // 添加到历史记录
    addOperation(operation)
  }

  // 导入任务
  const handleImport = () => {
    const importedTasks: Task[] = [
      {
        id: uuidv4(),
        title: "导入的任务1",
        status: "pending",
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        title: "导入的任务2",
        status: "pending",
        createdAt: new Date(),
      },
    ]

    const oldTasks = [...tasks]
    const newTasks = [...tasks, ...importedTasks]

    // 创建操作记录
    const operation: Operation = {
      id: uuidv4(),
      type: "import",
      description: `导入 ${importedTasks.length} 个任务`,
      timestamp: Date.now(),
      data: { importedTasks },
      undoAction: () => setTasks(oldTasks),
      redoAction: () => setTasks(newTasks),
    }

    // 执行操作
    setTasks(newTasks)

    // 添加到历史记录
    addOperation(operation)
  }

  // 获取状态文本
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "待处理"
      case "completed":
        return "已完成"
      case "canceled":
        return "已取消"
      default:
        return status
    }
  }

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "canceled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 过滤和排序任务
  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.createdAt.getTime() - b.createdAt.getTime()
      } else {
        return b.createdAt.getTime() - a.createdAt.getTime()
      }
    })

  return (
    <PageLayout>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">操作历史与撤销功能演示</h1>
          <p className="text-muted-foreground">
            本页面演示了如何使用操作历史记录和撤销/重做功能。尝试添加、删除或更新任务，然后使用操作历史面板来撤销或重做这些操作。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Tabs defaultValue="tasks">
              <TabsList className="mb-4">
                <TabsTrigger value="tasks">任务列表</TabsTrigger>
                <TabsTrigger value="add">添加任务</TabsTrigger>
              </TabsList>

              <TabsContent value="tasks">
                <Card>
                  <CardHeader>
                    <CardTitle>任务管理</CardTitle>
                    <CardDescription>管理您的任务并跟踪操作历史</CardDescription>

                    <div className="mt-4 flex items-center gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="搜索任务..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <Button variant="outline" size="icon" onClick={handleSearch}>
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={handleSort}>
                        <SortAsc className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={handleExport}>
                        <FileDown className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={handleImport}>
                        <FileUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {filteredTasks.length > 0 ? (
                      <ul className="space-y-2">
                        {filteredTasks.map((task) => (
                          <li
                            key={task.id}
                            className="flex items-center justify-between rounded-md border p-3 transition-colors hover:bg-muted/50"
                          >
                            <div>
                              <div className="font-medium">{task.title}</div>
                              <div className="flex items-center gap-2">
                                <span className={`rounded-full px-2 py-0.5 text-xs ${getStatusColor(task.status)}`}>
                                  {getStatusText(task.status)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {task.createdAt.toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateTaskStatus(task.id, "pending")}
                                  disabled={task.status === "pending"}
                                >
                                  待处理
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateTaskStatus(task.id, "completed")}
                                  disabled={task.status === "completed"}
                                >
                                  完成
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateTaskStatus(task.id, "canceled")}
                                  disabled={task.status === "canceled"}
                                >
                                  取消
                                </Button>
                              </div>
                              <Button variant="destructive" size="icon" onClick={() => deleteTask(task.id)}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex h-40 items-center justify-center text-muted-foreground">没有找到任务</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="add">
                <Card>
                  <CardHeader>
                    <CardTitle>添加新任务</CardTitle>
                    <CardDescription>创建一个新任务并添加到列表中</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">任务标题</Label>
                        <Input
                          id="title"
                          placeholder="输入任务标题"
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                        />
                      </div>
                      <Button onClick={addTask} disabled={!newTaskTitle.trim()}>
                        <Plus className="mr-2 h-4 w-4" />
                        添加任务
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <OperationHistoryPanel maxHeight="600px" />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default OperationHistoryDemo
