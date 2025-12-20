"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { GripVertical, Plus, X, Save } from "lucide-react"

// 工作区项目类型
interface WorkspaceItem {
  id: string
  title: string
  type: "card" | "chart" | "table" | "list"
  visible: boolean
  size: "small" | "medium" | "large"
}

// 快捷方式类型
interface Shortcut {
  id: string
  title: string
  icon: string
  path: string
}

// 默认工作区项目
const defaultWorkspaceItems: WorkspaceItem[] = [
  { id: "sales-overview", title: "销售概览", type: "card", visible: true, size: "medium" },
  { id: "recent-customers", title: "最近客户", type: "list", visible: true, size: "medium" },
  { id: "revenue-chart", title: "收入图表", type: "chart", visible: true, size: "large" },
  { id: "tasks", title: "待办任务", type: "list", visible: true, size: "small" },
  { id: "activity-feed", title: "活动日志", type: "list", visible: true, size: "medium" },
  { id: "top-products", title: "热门产品", type: "table", visible: true, size: "medium" },
]

// 默认快捷方式
const defaultShortcuts: Shortcut[] = [
  { id: "new-customer", title: "新建客户", icon: "user-plus", path: "/customers/new" },
  { id: "new-order", title: "新建订单", icon: "shopping-cart", path: "/orders/new" },
  { id: "reports", title: "查看报表", icon: "bar-chart", path: "/reports" },
  { id: "settings", title: "系统设置", icon: "settings", path: "/settings" },
]

export function WorkspaceCustomizer() {
  const [workspaceItems, setWorkspaceItems] = useState<WorkspaceItem[]>(defaultWorkspaceItems)
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(defaultShortcuts)
  const [newShortcut, setNewShortcut] = useState({ title: "", path: "" })
  const [mounted, setMounted] = useState(false)

  // 加载保存的工作区设置
  useEffect(() => {
    setMounted(true)
    const savedWorkspace = localStorage.getItem("workspaceItems")
    const savedShortcuts = localStorage.getItem("workspaceShortcuts")

    if (savedWorkspace) {
      setWorkspaceItems(JSON.parse(savedWorkspace))
    }

    if (savedShortcuts) {
      setShortcuts(JSON.parse(savedShortcuts))
    }
  }, [])

  // 保存工作区设置
  const saveWorkspace = () => {
    localStorage.setItem("workspaceItems", JSON.stringify(workspaceItems))
    localStorage.setItem("workspaceShortcuts", JSON.stringify(shortcuts))
  }

  // 处理拖放结束
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(workspaceItems)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setWorkspaceItems(items)
  }

  // 切换项目可见性
  const toggleItemVisibility = (id: string) => {
    setWorkspaceItems(workspaceItems.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item)))
  }

  // 更改项目大小
  const changeItemSize = (id: string, size: "small" | "medium" | "large") => {
    setWorkspaceItems(workspaceItems.map((item) => (item.id === id ? { ...item, size } : item)))
  }

  // 添加快捷方式
  const addShortcut = () => {
    if (newShortcut.title && newShortcut.path) {
      const newId = `shortcut-${Date.now()}`
      setShortcuts([
        ...shortcuts,
        {
          id: newId,
          title: newShortcut.title,
          icon: "link",
          path: newShortcut.path,
        },
      ])
      setNewShortcut({ title: "", path: "" })
    }
  }

  // 删除快捷方式
  const removeShortcut = (id: string) => {
    setShortcuts(shortcuts.filter((shortcut) => shortcut.id !== id))
  }

  if (!mounted) {
    return null
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>工作区自定义</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="layout">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="layout">布局设置</TabsTrigger>
            <TabsTrigger value="shortcuts">快捷方式</TabsTrigger>
          </TabsList>

          <TabsContent value="layout" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">工作区组件</h3>
              <p className="text-sm text-muted-foreground">拖动项目以重新排序，或切换可见性以显示/隐藏组件</p>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="workspace-items">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {workspaceItems.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center justify-between p-3 bg-background border rounded-md"
                            >
                              <div className="flex items-center">
                                <div {...provided.dragHandleProps} className="mr-3">
                                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                  <p className="font-medium">{item.title}</p>
                                  <p className="text-xs text-muted-foreground">
                                    类型: {item.type} | 大小: {item.size}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className={item.size === "small" ? "bg-primary text-primary-foreground" : ""}
                                    onClick={() => changeItemSize(item.id, "small")}
                                  >
                                    小
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className={item.size === "medium" ? "bg-primary text-primary-foreground" : ""}
                                    onClick={() => changeItemSize(item.id, "medium")}
                                  >
                                    中
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className={item.size === "large" ? "bg-primary text-primary-foreground" : ""}
                                    onClick={() => changeItemSize(item.id, "large")}
                                  >
                                    大
                                  </Button>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    id={`visibility-${item.id}`}
                                    checked={item.visible}
                                    onCheckedChange={() => toggleItemVisibility(item.id)}
                                  />
                                  <Label htmlFor={`visibility-${item.id}`}>{item.visible ? "显示" : "隐藏"}</Label>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </TabsContent>

          <TabsContent value="shortcuts" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">快捷方式</h3>
              <p className="text-sm text-muted-foreground">添加常用功能的快捷方式，以便快速访问</p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {shortcuts.map((shortcut) => (
                    <div
                      key={shortcut.id}
                      className="flex items-center justify-between p-3 bg-background border rounded-md"
                    >
                      <div>
                        <p className="font-medium">{shortcut.title}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{shortcut.path}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeShortcut(shortcut.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <Input
                      placeholder="快捷方式名称"
                      value={newShortcut.title}
                      onChange={(e) => setNewShortcut({ ...newShortcut, title: e.target.value })}
                    />
                    <Input
                      placeholder="路径 (例如: /customers)"
                      value={newShortcut.path}
                      onChange={(e) => setNewShortcut({ ...newShortcut, path: e.target.value })}
                    />
                  </div>
                  <Button onClick={addShortcut}>
                    <Plus className="h-4 w-4 mr-2" />
                    添加
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={saveWorkspace}>
            <Save className="h-4 w-4 mr-2" />
            保存工作区设置
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
